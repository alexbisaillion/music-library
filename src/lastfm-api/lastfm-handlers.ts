import { Response, Request } from 'express';
import { getTopAlbums, getTopArtists, getTopTracks, scrobblePlay } from './lastfm-api-methods';
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

export const handleScrobblePlays = async (req: Request, res: Response): Promise<void> => {
  try {
    const { plays } = req.body;
    if (!plays) {
      sendError(res, ErrorCode.BadRequest, 'Missing plays parameter');
      return;
    }

    const results = [];
    for (const play of plays) {
      const { track, artist, album, albumArtist, timestamp } = play;
      if (!track || !artist || !album || !albumArtist || !timestamp) {
        results.push({ success: false, error: 'Missing parameters', ...play });
        continue;
      }

      const result = await scrobblePlay({ track, artist, album, albumArtist, timestamp });
      results.push({ success: result, ...play });
    }

    sendSuccessContent(res, SuccessCode.Accepted, results);
  } catch (error) {
    sendError(res, ErrorCode.InternalServerError, error);
  }
};

export const handleGetTopArtists = async (req: Request, res: Response): Promise<void> => {
  try {
    const { limit, page } = req.params;
    const artists = await getTopArtists({ limit: limit ? parseInt(limit) : 1000, page: page ? parseInt(page) : 1 });

    if (isNilOrEmpty(artists)) {
      sendError(res, ErrorCode.InternalServerError, 'Failed to get top artists due to an internal error');
      return;
    }

    sendSuccessContent(res, SuccessCode.OK, artists);
  } catch (error) {
    sendError(res, ErrorCode.InternalServerError, error);
  }
};

export const handleGetTopAlbums = async (req: Request, res: Response): Promise<void> => {
  try {
    const { limit, page } = req.params;
    const albums = await getTopAlbums({ limit: limit ? parseInt(limit) : 1000, page: page ? parseInt(page) : 1 });

    if (isNilOrEmpty(albums)) {
      sendError(res, ErrorCode.InternalServerError, 'Failed to get top albums due to an internal error');
      return;
    }

    sendSuccessContent(res, SuccessCode.OK, albums);
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
      return;
    }

    sendSuccessContent(res, SuccessCode.OK, tracks);
  } catch (error) {
    sendError(res, ErrorCode.InternalServerError, error);
  }
};
