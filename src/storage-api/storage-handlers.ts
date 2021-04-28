import { Response, Request } from 'express';
import { isNilOrEmpty } from '../helpers/generic-helpers';
import { sendError, ErrorCode, sendSuccessContent, SuccessCode } from '../helpers/routing';
import { getAlbumDetails, getAlbumTrackIds, getRecentPlays } from '../spotify-api/spotify-api-methods';
import { getOrCreateTrack, getRelease, hasPlayBeenRegistered, registerPlay } from './storage-consumers';
import { Play } from '../models/play-model';
import { getReleaseParams, getTrackParams } from './storage-builders';

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

        const track = await getOrCreateTrack(play.spotifyTrackId);

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

export const handleRegisterRelease = async (req: Request, res: Response): Promise<void> => {
  const spotifyAlbumId = req.body.spotifyAlbumId;
  if (!spotifyAlbumId) {
    sendError(res, ErrorCode.BadRequest, 'Please provide an album ID.');
    return;
  }

  const trackIds = await getAlbumTrackIds(spotifyAlbumId);
  if (!trackIds) {
    sendError(res, ErrorCode.InternalServerError, 'Unable to retrieve track IDs from the spotify API.');
    return;
  }

  for (const trackId of trackIds) {
    await getOrCreateTrack(trackId);
  }

  const release = await getRelease(spotifyAlbumId);
  if (!release) {
    sendError(res, ErrorCode.InternalServerError, 'Unable to get updated release document.');
  }

  sendSuccessContent(res, SuccessCode.Created, release);
};

export const handleGetAlbumInfo = async (req: Request, res: Response): Promise<void> => {
  const spotifyAlbumId = req.body.spotifyAlbumId;
  if (!spotifyAlbumId) {
    sendError(res, ErrorCode.BadRequest, 'Please provide an album ID.');
    return;
  }

  const spotifyAlbum = await getAlbumDetails(spotifyAlbumId);

  if (!spotifyAlbum) {
    sendError(res, ErrorCode.BadRequest, 'The provided ID is not a valid album on Spotify.');
    return;
  }

  const release = await getReleaseParams(spotifyAlbumId);
  const tracks = await Promise.all(spotifyAlbum.tracks.map((track) => getTrackParams(track.id)));

  sendSuccessContent(res, SuccessCode.OK, { release, tracks });
};
