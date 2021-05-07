import { config } from 'dotenv';
config();

import { Types } from 'mongoose';
import { ReleaseType } from '../models/release-model';
import { getTrackDetails } from '../spotify-api/spotify-api-methods';
import { getArtist, getRelease } from '../storage-api/storage-consumers';
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

export const processTracks = async (
  tracks: PreviousModelTrack[],
  connectToMongoose: () => Promise<void>
): Promise<void> => {
  await connectToMongoose();

  const failedIds: string[] = [];
  let counter = 0;
  for (const track of tracks) {
    try {
      await processTrack(track);
      counter++;
      console.log(`Created ${counter} of ${tracks.length}: ${track.track} ${track.trackId}`);
    } catch (error) {
      console.log(`Failed creating ${track.track} ${track.trackId}`);
      console.log(error);
      failedIds.push(track.trackId);
    }
  }

  console.log('Failed tracks:');
  console.log(failedIds);
};

const processTrack = async (track: PreviousModelTrack) => {
  const trackDetails = await getTrackDetails(track.trackId);
  if (!trackDetails) {
    throw Error(`Failed creating ${track.track} ${track.trackId}`);
  }

  const albumArtistIds: Types.ObjectId[] = [];
  for (const albumArtist of trackDetails.album.artists) {
    const existingArtist = await getArtist(albumArtist.id);
    if (existingArtist) {
      albumArtistIds.push(existingArtist._id);
      continue;
    }

    // Only use the custom album artist if there is only 1 album artist.
    const artistName = trackDetails.album.artists.length > 1 ? albumArtist.name : track.albumArtist;
    const newArtist = await createArtist({ name: artistName, spotifyArtistId: albumArtist.id });
    albumArtistIds.push(newArtist._id);
  }

  let releaseId: Types.ObjectId;
  const existingRelease = await getRelease(trackDetails.album.id);
  if (existingRelease) {
    releaseId = existingRelease._id;
  } else {
    const newRelease = await createRelease({
      releaseType: ReleaseType.Album,
      spotifyAlbumId: trackDetails.album.id,
      artistIds: albumArtistIds,
      name: track.album
    });
    releaseId = newRelease._id;
  }

  const trackArtistIds: Types.ObjectId[] = [];
  for (const artist of trackDetails.artists) {
    const existingArtist = await getArtist(artist.id);
    if (existingArtist) {
      trackArtistIds.push(existingArtist._id);
      continue;
    }

    // Only use the custom album artist if there is only 1 album artist.
    const artistName = trackDetails.artists.length > 1 ? artist.name : track.artist;
    const newArtist = await createArtist({ name: artistName, spotifyArtistId: artist.id });
    trackArtistIds.push(newArtist._id);
  }

  await createTrack({
    artistIds: trackArtistIds,
    name: track.track,
    releaseId,
    spotifyTrackId: track.trackId
  });
};
