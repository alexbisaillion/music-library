import { config } from 'dotenv';
config();

import { Types } from 'mongoose';
import { writeToFile } from '../helpers/writeToFile';
import { ReleaseType } from '../models/release-model';
import { getTracksDetails, SpotifyTrackDetails } from '../spotify-api/spotify-api-methods';
import { getArtist, getOrCreateArtist } from '../storage-api/storage-consumers';
import { createArtist, createRelease, createTrack } from '../storage-api/storage-creators';

type PreviousModelTrack = {
  _id: string;
  trackId: string;
  track: string;
  artist: string;
  album: string;
  albumArtist: string;
  verified: boolean;
  __v: number;
};

type PreviousModelTrackDetails = PreviousModelTrack & { details: SpotifyTrackDetails };

type TrackList = {
  name: string;
  artist: string;
  trackIds: string[];
  details: SpotifyTrackDetails[];
};
type AlbumList = { name: string; releaseIds: string[]; tracks: TrackList[] };
type ArtistList = { name: string; albums: AlbumList[] };

export const getPreviousTracksDetails = async (tracks: PreviousModelTrack[]): Promise<PreviousModelTrackDetails[]> => {
  const details: PreviousModelTrackDetails[] = [];
  for (let i = 0; i < tracks.length; i += 50) {
    try {
      const tracksPartition = tracks.slice(i, i + 50);
      const trackDetails = await getTracksDetails(tracksPartition.map((track) => track.trackId));
      if (!trackDetails) {
        i -= 50;
        continue;
      }
      details.push(...tracksPartition.map((track, index) => ({ ...track, details: trackDetails[index] })));
      console.log(`Logged ${details.length} thus far.`);
    } catch (error) {
      i -= 50;
      console.log(`Failed getting track details. Retrying...`);
    }
  }

  writeToFile(details, 'full-track-details.json');

  return details;
};

export const partitionTracksWithDetails = (tracks: PreviousModelTrackDetails[]): void => {
  const moreAlbumArtistsTracks: PreviousModelTrackDetails[] = [];
  const mismatchingAlbumArtists: PreviousModelTrackDetails[] = [];
  const artistLists: ArtistList[] = [];
  for (const track of tracks) {
    if (track.details.album.artists.length > 1) {
      moreAlbumArtistsTracks.push(track);
      continue;
    }
    if (track.albumArtist !== track.details.album.artists[0].name) {
      mismatchingAlbumArtists.push(track);
      continue;
    }

    const artistList = artistLists.find((artist) => artist.name === track.albumArtist);
    if (artistList) {
      const albumList = artistList.albums.find((album) => album.name === track.album);
      if (albumList) {
        const trackList = albumList.tracks.find((t) => t.name === track.track && t.artist === track.artist);
        if (trackList) {
          trackList.trackIds.push(track.trackId);
          trackList.details.push(track.details);
        } else {
          albumList.tracks.push({
            name: track.track,
            artist: track.artist,
            trackIds: [track.trackId],
            details: [track.details]
          });
        }

        if (!albumList.releaseIds.includes(track.details.album.id)) {
          albumList.releaseIds.push(track.details.album.id);
        }
      } else {
        artistList.albums.push({
          name: track.album,
          tracks: [{ name: track.track, artist: track.artist, trackIds: [track.trackId], details: [track.details] }],
          releaseIds: [track.details.album.id]
        });
      }
    } else {
      artistLists.push({
        name: track.albumArtist,
        albums: [
          {
            name: track.album,
            tracks: [{ name: track.track, artist: track.artist, trackIds: [track.trackId], details: [track.details] }],
            releaseIds: [track.details.album.id]
          }
        ]
      });
    }
  }

  writeToFile(moreAlbumArtistsTracks, 'more-album-artists-tracks.json');
  writeToFile(mismatchingAlbumArtists, 'mismatching-album-artists.json');
  writeToFile(artistLists, 'artist-lists.json');
};

export const createDocumentsFromArtistsList = async (
  artistsList: ArtistList[],
  connectToMongoose: () => Promise<void>
): Promise<void> => {
  await connectToMongoose();
  for (const artistList of artistsList) {
    const artistId = artistList.albums[0].tracks[0].details[0].artists[0].id;
    let albumArtistDocument = await getArtist(artistId);
    if (!albumArtistDocument) {
      albumArtistDocument = await createArtist({ spotifyArtistId: artistId, name: artistList.name });
    }

    for (const release of artistList.albums) {
      const releaseDocument = await createRelease({
        releaseType: ReleaseType.Album,
        artistIds: [albumArtistDocument._id],
        name: release.name,
        spotifyAlbumIds: release.releaseIds
      });
      for (const track of release.tracks) {
        const artistIds: Types.ObjectId[] = [];
        for (let i = 0; i < track.details[0].artists.length; i++) {
          if (i === 0) {
            const existingArtist = await getArtist(track.details[0].artists[i].id);
            if (existingArtist) {
              artistIds.push(existingArtist._id);
            } else {
              artistIds.push(
                (
                  await createArtist({
                    name: track.artist,
                    spotifyArtistId: track.details[0].artists[i].id
                  })
                )._id
              );
            }
          } else {
            artistIds.push((await getOrCreateArtist(track.details[0].artists[i]))._id);
          }
        }
        await createTrack({
          artistIds,
          releaseId: releaseDocument._id,
          name: track.name,
          spotifyTrackIds: track.trackIds
        });
        console.log(`Logged ${track.artist} - ${track.name}`);
      }
    }
  }
};
