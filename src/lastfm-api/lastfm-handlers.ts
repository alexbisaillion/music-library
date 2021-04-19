import { Response, Request } from 'express';
import { getTopTracks, scrobblePlay } from './lastfm-api-methods';
import { sendError, sendSuccess, ErrorCode, SuccessCode, sendSuccessContent } from '../helpers/routing';
import { isNilOrEmpty } from '../helpers/generic-helpers';

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

export const handleGetTopTracks = async (req: Request, res: Response): Promise<void> => {
  try {
    const { limit, page } = req.params;
    const tracks = await getTopTracks({ limit: limit ? parseInt(limit) : 1000, page: page ? parseInt(page) : 1 });

    if (isNilOrEmpty(tracks)) {
      sendError(res, ErrorCode.InternalServerError, 'Failed to get top tracks due to an internal error');
    }

    sendSuccessContent(res, SuccessCode.OK, tracks);
  } catch (error) {
    sendError(res, ErrorCode.InternalServerError, error);
  }
};
