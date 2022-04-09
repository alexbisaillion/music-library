import { Response, Request } from 'express';
import { sendError, ErrorCode, SuccessCode, sendSuccessContent } from '../helpers/routing';
import { isNilOrEmpty } from '../helpers/generic-helpers';
import { getAlbum, getHistory } from './deezer-api-methods';

export const handleGetHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { limit, page } = req.query;
    const plays = await getHistory({
      index: typeof page === 'string' ? parseInt(page) : 0,
      limit: typeof limit === 'string' ? parseInt(limit) : 50
    });
    if (isNilOrEmpty(plays)) {
      sendError(res, ErrorCode.InternalServerError, 'Failed to retrieve history');
    }

    sendSuccessContent(res, SuccessCode.OK, plays);
  } catch (error) {
    sendError(res, ErrorCode.InternalServerError, error);
  }
};

export const handleGetAlbum = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const album = await getAlbum(typeof id === 'string' ? parseInt(id) : -1);
    sendSuccessContent(res, SuccessCode.OK, album);
  } catch (error) {
    sendError(res, ErrorCode.InternalServerError, error);
  }
};
