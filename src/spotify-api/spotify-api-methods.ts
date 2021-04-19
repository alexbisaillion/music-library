import { getUTCDate } from '../helpers/dates';
import { isNilOrEmpty } from '../helpers/generic-helpers';
import { RawPlay } from '../models/play-model';
import { makeSpotifyRequest, spotifyApiWrapper } from './spotify-api-utilities';

export const getRecentPlays = async (): Promise<RawPlay[] | undefined> => {
  const response = await makeSpotifyRequest(() => spotifyApiWrapper.getMyRecentlyPlayedTracks({ limit: 50 }));

  if (response.statusCode !== 200 || isNilOrEmpty(response.body.items)) {
    return undefined;
  }

  return response.body.items.map((item) => ({
    trackId: item.track.id,
    timestamp: getUTCDate(item.played_at)
  }));
};
