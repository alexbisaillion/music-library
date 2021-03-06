import { Types } from 'mongoose';
import { Artist, ArtistModel } from '../models/artist-model';
import { Release, ReleaseModel, ReleaseType } from '../models/release-model';
import { SpotifyArtistModel, SpotifyTrackModel } from '../models/spotify-models';
import { Track, TrackModel } from '../models/track-model';

type CreateArtistParams = {
  spotifyArtistId: string;
  name: string;
};
export const createArtist = async (params: CreateArtistParams): Promise<Artist> => {
  const { spotifyArtistId, name } = params;

  const artistDocument = await ArtistModel.create({
    name: name,
    spotifyIds: [spotifyArtistId],
    releases: []
  });

  await SpotifyArtistModel.create({
    spotifyId: spotifyArtistId,
    artist: artistDocument._id
  });

  return artistDocument;
};

type CreateTrackParams = {
  name: string;
  spotifyTrackIds: string[];
  artistIds: Types.ObjectId[];
  releaseId: Types.ObjectId;
};
export const createTrack = async (params: CreateTrackParams): Promise<Track> => {
  const { name, spotifyTrackIds, artistIds, releaseId } = params;
  const trackDocument = await TrackModel.create({
    name: name,
    spotifyIds: spotifyTrackIds,
    artists: artistIds,
    primaryRelease: releaseId,
    secondaryReleases: [],
    plays: []
  });

  for (const spotifyTrackId of spotifyTrackIds) {
    await SpotifyTrackModel.create({
      spotifyId: spotifyTrackId,
      track: trackDocument._id
    });
  }

  const release = await ReleaseModel.findOne({ _id: releaseId });
  if (release) {
    await release.updateOne({ $push: { tracks: trackDocument._id } });
  }

  return trackDocument;
};

type CreateReleaseParams = {
  name: string;
  spotifyAlbumIds: string[];
  releaseType: ReleaseType;
  artistIds: Types.ObjectId[];
};
export const createRelease = async (params: CreateReleaseParams): Promise<Release> => {
  const { name, spotifyAlbumIds, releaseType, artistIds } = params;

  // Create the new release document.
  const releaseDocument = await ReleaseModel.create({
    name: name,
    spotifyIds: spotifyAlbumIds,
    releaseType: releaseType,
    artists: artistIds,
    tracks: []
  });

  // Add a reference to the release in the artist documents.
  for (const artistId of artistIds) {
    const artistReference = await ArtistModel.findOne({ _id: artistId });
    if (artistReference) {
      await artistReference.updateOne({ $push: { releases: releaseDocument._id } });
    }
  }

  return releaseDocument;
};
