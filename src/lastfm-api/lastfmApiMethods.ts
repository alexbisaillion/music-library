import { LastfmMethod } from './lastfmApiTypes';
import { makeAuthenticatedRequest } from './lastfmApiUtilities';

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
