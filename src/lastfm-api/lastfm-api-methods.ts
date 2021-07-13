import { LastfmMethod, LastfmPaginationParams } from './lastfm-api-types';
import { makeLastfmAuthenticatedRequest, makeLastfmRequest } from './lastfm-api-utilities';

export type ScrobblePlayParams = {
  timestamp: number;
  track: string;
  artist: string;
  album: string;
  albumArtist: string;
};
export const scrobblePlay = async (params: ScrobblePlayParams): Promise<boolean> => {
  const response = await makeLastfmAuthenticatedRequest(LastfmMethod.Scrobble, params);
  const body = await response.json();

  return response.status === 200 && !body['error'] && body['scrobbles']['@attr']['accepted'] > 0;
};

export type BasePlayParams = {
  track: string;
  artist: string;
  album: string;
  albumArtist: string;
};
export const updateNowPlaying = async (params: BasePlayParams): Promise<boolean> => {
  const response = await makeLastfmAuthenticatedRequest(LastfmMethod.UpdateNowPlaying, params);
  return response.status === 200;
};

export const getTopArtists = async (params: LastfmPaginationParams): Promise<string[] | undefined> => {
  const response = await makeLastfmRequest(LastfmMethod.GetTopArtists, params);
  const body = await response.json();

  if (response.status !== 200 || !body['topartists'] || !body['topartists']['artist']) {
    return undefined;
  }

  return body.topartists.artist.map((artist: { name: string }) => artist.name);
};

type RawAlbum = {
  album: string;
  albumArtist: string;
};
export const getTopAlbums = async (params: LastfmPaginationParams): Promise<RawAlbum[] | undefined> => {
  const response = await makeLastfmRequest(LastfmMethod.GetTopAlbums, params);
  const body = await response.json();

  if (response.status !== 200 || !body['topalbums'] || !body['topalbums']['album']) {
    return undefined;
  }

  return body.topalbums.album.map((album: { name: string; artist: { name: string } }) => ({
    album: album.name,
    albumArtist: album.artist.name
  }));
};

type RawTrack = {
  track: string;
  artist: string;
};
export const getTopTracks = async (params: LastfmPaginationParams): Promise<RawTrack[] | undefined> => {
  const response = await makeLastfmRequest(LastfmMethod.GetTopTracks, params);
  const body = await response.json();

  if (response.status !== 200 || !body['toptracks'] || !body['toptracks']['track']) {
    return undefined;
  }

  return body.toptracks.track.map((track: { name: string; artist: { name: string } }) => ({
    track: track.name,
    artist: track.artist.name
  }));
};
