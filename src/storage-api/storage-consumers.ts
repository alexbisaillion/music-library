import { Artist, ArtistModel } from '../models/artist-model';
import { Play, PlayModel } from '../models/play-model';
import { Release, ReleaseModel, ReleaseType } from '../models/release-model';
import { Track, TrackModel } from '../models/track-model';
import { getTrackDetails } from '../spotify-api/spotify-api-methods';

export const hasPlayBeenRegistered = async (timestamp: number): Promise<boolean> => {
  return PlayModel.exists({ timestamp: timestamp });
};

export const registerPlay = async (track: Track, timestamp: number): Promise<Play> => {
  await track.updateOne({ $push: { plays: timestamp } });
  return PlayModel.create({ track: track._id, timestamp: timestamp });
};

export const getTrack = async (spotifyTrackId: string): Promise<Track | undefined> => {
  let track: Track | undefined | null = await TrackModel.findOne({ spotifyId: spotifyTrackId });
  if (!track) {
    track = await processNewTrack(spotifyTrackId);
  }
  return track;
};

const processNewTrack = async (spotifyTrackId: string): Promise<Track | undefined> => {
  const details = await getTrackDetails(spotifyTrackId);
  if (!details) {
    return undefined;
  }
  const { artists, album } = details;

  const release = (await ReleaseModel.findOne({ spotifyId: album.id })) || (await processNewRelease(album));

  const artistReferences = await Promise.all(
    artists.map(async (artist) => {
      return (await ArtistModel.findOne({ spotifyId: artist.id })) || (await processNewArtist(artist));
    })
  );

  const track = await TrackModel.create({
    title: details.title,
    spotifyId: details.spotifyTrackId,
    artists: artistReferences.map((artistReference) => artistReference._id),
    primaryRelease: release._id,
    secondaryReleases: [],
    plays: []
  });

  await release.updateOne({ $push: { tracks: track._id } });

  return track;
};

const processNewArtist = async (artist: SpotifyApi.ArtistObjectSimplified): Promise<Artist> => {
  return ArtistModel.create({
    name: artist.name,
    spotifyId: artist.id,
    releases: []
  });
};

const convertAlbumType = (albumType: 'album' | 'single' | 'compilation'): ReleaseType => {
  switch (albumType) {
    case 'album':
      return ReleaseType.Album;
    case 'single':
      return ReleaseType.Single;
    default:
      return ReleaseType.Compilation;
  }
};
const processNewRelease = async (album: SpotifyApi.AlbumObjectSimplified): Promise<Release> => {
  // Get the artist documents, or create them if they don't exist.
  const artistReferences = await Promise.all(
    album.artists.map(async (artist) => {
      return (await ArtistModel.findOne({ spotifyId: artist.id })) || (await processNewArtist(artist));
    })
  );

  // Create the new release document.
  const release = await ReleaseModel.create({
    title: album.name,
    spotifyId: album.id,
    releaseType: convertAlbumType(album.album_type),
    artists: artistReferences.map((artistReference) => artistReference._id),
    tracks: []
  });

  // Add a reference to the release in the artist documents.
  for (const artist of artistReferences) {
    await artist.updateOne({ $push: { releases: release._id } });
  }

  return release;
};
