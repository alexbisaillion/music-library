import { LastfmMethod, LastfmPaginationParams } from './lastfm-api-types';
import { makeAuthenticatedRequest, makeRequest } from './lastfm-api-utilities';
import { RawTrack } from '../models/track-model';

export type ScrobblePlayParams = {
  timestamp: number;
  track: string;
  artist: string;
  album: string;
  albumArtist: string;
};
export const scrobblePlay = async (params: ScrobblePlayParams): Promise<boolean> => {
  const response = await makeAuthenticatedRequest(LastfmMethod.Scrobble, params);
  const body = await response.json();

  return response.status === 200 && !body['error'] && body['scrobbles']['@attr']['accepted'] > 0;
};

export const getTopTracks = async (params: LastfmPaginationParams): Promise<RawTrack[] | undefined> => {
  const response = await makeRequest(LastfmMethod.GetTopTracks, params);
  const body = await response.json();

  if (response.status !== 200 || !body['toptracks'] || !body['toptracks']['track']) {
    return undefined;
  }

  return body.toptracks.track.map((t: { name: string; artist: { name: string } }) => ({
    track: t.name,
    artist: t.artist.name
  }));
};
