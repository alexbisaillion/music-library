import { Response, Request } from 'express';
import { isNilOrEmpty } from '../helpers/generic-helpers';
import { sendError, ErrorCode, sendSuccessContent, SuccessCode } from '../helpers/routing';
import { getRecentPlays } from '../spotify-api/spotify-api-methods';
import { getTrack, hasPlayBeenRegistered, registerPlay } from './storage-consumers';
import { Play } from '../models/play-model';

export const handleRefreshPlays = async (req: Request, res: Response): Promise<void> => {
  try {
    const spotifyPlays = await getRecentPlays();

    if (isNilOrEmpty(spotifyPlays)) {
      sendError(res, ErrorCode.InternalServerError, 'Failed to retrieve recent plays from the Spotify API');
      return;
    }

    const newPlays: Play[] = [];
    if (spotifyPlays) {
      // TODO: sort plays by timestamp in order to break out of the loop instead of continue.
      for (const play of spotifyPlays) {
        if (await hasPlayBeenRegistered(play.timestamp)) {
          continue;
        }

        const track = await getTrack(play.spotifyTrackId);

        if (!track) {
          sendError(res, ErrorCode.InternalServerError, 'Failed to get track details from the spotify API');
          return;
        }

        newPlays.push(await registerPlay(track, play.timestamp));
      }
    }

    sendSuccessContent(res, SuccessCode.OK, newPlays);
  } catch (error) {
    sendError(res, ErrorCode.InternalServerError, error);
  }
};
