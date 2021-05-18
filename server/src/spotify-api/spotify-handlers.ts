import { Response, Request } from 'express';
import { getRecentPlays } from './spotify-api-methods';
import { sendError, ErrorCode, SuccessCode, sendSuccessContent } from '../helpers/routing';
import { isNilOrEmpty } from '../helpers/generic-helpers';

export const handleGetRecentPlays = async (req: Request, res: Response): Promise<void> => {
  try {
    const plays = await getRecentPlays();
    if (isNilOrEmpty(plays)) {
      sendError(res, ErrorCode.InternalServerError, 'Failed to retrieve recent plays');
    }

    sendSuccessContent(res, SuccessCode.OK, plays);
  } catch (error) {
    sendError(res, ErrorCode.InternalServerError, error);
  }
};
