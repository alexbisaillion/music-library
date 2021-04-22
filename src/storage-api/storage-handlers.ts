import { Response, Request } from 'express';
import { isNilOrEmpty } from '../helpers/generic-helpers';
import { sendError, ErrorCode, sendSuccessContent, SuccessCode } from '../helpers/routing';
import { getRecentPlays } from '../spotify-api/spotify-api-methods';
import { Track, TrackModel } from '../models/track-model';
import { processNewTrack } from './storage-consumers';
import { Play, PlayModel } from '../models/play-model';

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
        if (await PlayModel.exists({ timestamp: play.timestamp })) {
          continue;
        }
        let track: Track | undefined | null = await TrackModel.findOne({ spotifyId: play.spotifyTrackId });
        if (!track) {
          track = await processNewTrack(play.spotifyTrackId);
        }

        if (!track) {
          sendError(res, ErrorCode.InternalServerError, 'Failed to get track details from the spotify API');
          return;
        }

        await track.updateOne({ $push: { plays: play.timestamp } });

        newPlays.push(
          await PlayModel.create({
            track: track._id,
            timestamp: play.timestamp
          })
        );
      }
    }

    sendSuccessContent(res, SuccessCode.OK, newPlays);
  } catch (error) {
    sendError(res, ErrorCode.InternalServerError, error);
  }
};
