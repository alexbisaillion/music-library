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

  return body.toptracks.track.map((t: { name: string; artist: { name: string } }) => ({
    track: t.name,
    artist: t.artist.name
  }));
};
