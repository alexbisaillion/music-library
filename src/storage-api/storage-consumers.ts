import { scrobblePlay } from '../lastfm-api/lastfm-api-methods';
import { Artist } from '../models/artist-model';
import { Play, PlayModel } from '../models/play-model';
import { Release } from '../models/release-model';
import { Track } from '../models/track-model';
import { getTrackDetails } from '../spotify-api/spotify-api-methods';
import { SpotifyTrackModel, SpotifyAlbumModel, SpotifyArtistModel } from '../models/spotify-models';
import { getScrobblePlayParams, convertAlbumType } from './storage-converters';
import { createArtist, createRelease, createTrack } from './storage-creators';

export const hasPlayBeenRegistered = async (timestamp: number): Promise<boolean> => {
  return PlayModel.exists({ timestamp: timestamp });
};

export const registerPlay = async (track: Track, timestamp: number): Promise<Play> => {
  await track.updateOne({ $push: { plays: timestamp } });
  await scrobblePlay(await getScrobblePlayParams(track, timestamp));
  return PlayModel.create({ track: track._id, timestamp: timestamp });
};

export const getTrack = async (spotifyTrackId: string): Promise<Track | undefined> => {
  const spotifyTrack = await SpotifyTrackModel.findOne({ spotifyId: spotifyTrackId });
  if (spotifyTrack) {
    return (await spotifyTrack.populate('track').execPopulate()).track as Track;
  }
  return undefined;
};

export const getOrCreateTrack = async (spotifyTrackId: string): Promise<Track | undefined> => {
  const spotifyTrack = await getTrack(spotifyTrackId);
  if (spotifyTrack) {
    return spotifyTrack;
  }

  const details = await getTrackDetails(spotifyTrackId);
  if (!details) {
    return undefined;
  }

  const { name, artists, album } = details;

  const artistReferences = await Promise.all(artists.map((artist) => getOrCreateArtist(artist)));
  const release = await getOrCreateRelease(album);

  return createTrack({
    name,
    spotifyTrackId,
    artistIds: artistReferences.map((artistReference) => artistReference._id),
    releaseId: release._id
  });
};

export const getArtist = async (spotifyArtistId: string): Promise<Artist | undefined> => {
  const spotifyArtist = await SpotifyArtistModel.findOne({ spotifyId: spotifyArtistId });
  if (spotifyArtist) {
    return (await spotifyArtist.populate('artist').execPopulate()).artist as Artist;
  }
  return undefined;
};

const getOrCreateArtist = async (artist: SpotifyApi.ArtistObjectSimplified): Promise<Artist> => {
  const spotifyArtist = await getArtist(artist.id);
  if (spotifyArtist) {
    return spotifyArtist;
  }

  return createArtist({ spotifyArtistId: artist.id, name: artist.name });
};

export const getRelease = async (spotifyAlbumId: string): Promise<Release | undefined> => {
  const spotifyAlbum = await SpotifyAlbumModel.findOne({ spotifyId: spotifyAlbumId });
  if (spotifyAlbum) {
    return (await spotifyAlbum.populate('album').execPopulate()).album as Release;
  }
  return undefined;
};
const getOrCreateRelease = async (album: SpotifyApi.AlbumObjectSimplified): Promise<Release> => {
  const spotifyAlbum = await getRelease(album.id);
  if (spotifyAlbum) {
    return spotifyAlbum;
  }

  // Get the artist documents, or create them if they don't exist.
  const artistReferences = await Promise.all(album.artists.map((artist) => getOrCreateArtist(artist)));

  return createRelease({
    name: album.name,
    releaseType: convertAlbumType(album.album_type),
    spotifyAlbumId: album.id,
    artistIds: artistReferences.map((artistReference) => artistReference._id)
  });
};
