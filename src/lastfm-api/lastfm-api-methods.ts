import { LastfmMethod } from './lastfm-api-types';
import { makeAuthenticatedRequest } from './lastfm-api-utilities';

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
