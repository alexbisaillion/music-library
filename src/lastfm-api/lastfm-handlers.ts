import { Response, Request } from 'express';
import { scrobblePlay } from './lastfm-api-methods';
import { sendError, sendSuccess, ErrorCode, SuccessCode } from '../helpers/routing';

export const handleScrobblePlay = async (req: Request, res: Response): Promise<void> => {
  try {
    const { track, artist, album, albumArtist, timestamp } = req.body;
    if (!track || !artist || !album || !albumArtist || !timestamp) {
      sendError(res, ErrorCode.BadRequest, 'Missing parameters');
      return;
    }

    const success = await scrobblePlay({ track, artist, album, albumArtist, timestamp });
    if (!success) {
      sendError(res, ErrorCode.InternalServerError, 'Failed to scrobble due to an internal error');
    }

    sendSuccess(res, SuccessCode.Accepted);
  } catch (error) {
    sendError(res, ErrorCode.InternalServerError, error);
  }
};
