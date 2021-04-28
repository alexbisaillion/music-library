import { getUTCDate } from '../helpers/dates';
import { isNilOrEmpty } from '../helpers/generic-helpers';
import { makeSpotifyRequest, spotifyApiWrapper } from './spotify-api-utilities';

type RawPlay = {
  spotifyTrackId: string;
  timestamp: number;
};
export const getRecentPlays = async (): Promise<RawPlay[] | undefined> => {
  const response = await makeSpotifyRequest(() => spotifyApiWrapper.getMyRecentlyPlayedTracks({ limit: 50 }));

  if (response.statusCode !== 200 || isNilOrEmpty(response.body.items)) {
    return undefined;
  }

  // TODO: Investigate item.track.linked_from property.
  return response.body.items.map((item) => ({
    spotifyTrackId: item.track.id,
    timestamp: getUTCDate(item.played_at)
  }));
};

export type SpotifyTrackDetails = {
  spotifyTrackId: string;
  title: string;
  artists: SpotifyApi.ArtistObjectSimplified[];
  album: SpotifyApi.AlbumObjectSimplified;
};
export const getTrackDetails = async (spotifyTrackId: string): Promise<SpotifyTrackDetails | undefined> => {
  const response = await makeSpotifyRequest(() => spotifyApiWrapper.getTrack(spotifyTrackId));

  if (response.statusCode !== 200) {
    return undefined;
  }

  return {
    spotifyTrackId: response.body.id,
    title: response.body.name,
    artists: response.body.artists,
    album: response.body.album
  };
};

export const getAlbumTrackIds = async (spotifyAlbumId: string): Promise<string[] | undefined> => {
  let offset = 0;
  const trackIds: string[] = [];

  do {
    const response = await makeSpotifyRequest(() => spotifyApiWrapper.getAlbumTracks(spotifyAlbumId));

    if (response.statusCode !== 200 || !response.body.items) {
      return undefined;
    }

    trackIds.push(...response.body.items.map((track) => track.id));

    offset = response.body.next === null ? 0 : offset + 50;
  } while (offset > 0);

  return trackIds;
};

export type SpotifyAlbumDetails = {
  spotifyAlbumId: string;
  name: string;
  tracks: SpotifyApi.TrackObjectSimplified[];
  albumArtists: SpotifyApi.ArtistObjectSimplified[];
  releaseType: 'album' | 'single' | 'compilation';
};
export const getAlbumDetails = async (spotifyAlbumId: string): Promise<SpotifyAlbumDetails | undefined> => {
  const response = await makeSpotifyRequest(() => spotifyApiWrapper.getAlbum(spotifyAlbumId));

  if (response.statusCode !== 200) {
    return undefined;
  }

  return {
    spotifyAlbumId: response.body.id,
    name: response.body.name,
    tracks: response.body.tracks.items,
    albumArtists: response.body.artists,
    releaseType: response.body.album_type
  };
};

export type SpotifyArtistDetails = {
  spotifyArtistId: string;
  name: string;
};
export const getArtistDetails = async (spotifyArtistId: string): Promise<SpotifyArtistDetails | undefined> => {
  const response = await makeSpotifyRequest(() => spotifyApiWrapper.getArtist(spotifyArtistId));

  if (response.statusCode !== 200) {
    return undefined;
  }

  return { spotifyArtistId: response.body.id, name: response.body.name };
};
