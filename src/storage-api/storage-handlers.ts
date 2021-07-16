import { Response, Request } from 'express';
import { isNilOrEmpty } from '../helpers/generic-helpers';
import { sendError, ErrorCode, sendSuccessContent, SuccessCode } from '../helpers/routing';
import { getAlbumDetails, getAlbumTrackIds } from '../spotify-api/spotify-api-methods';
import { getOrCreateTrack, getRelease, hasPlayBeenRegistered, registerPlay } from './storage-consumers';
import { getReleaseParams, getTrackParams } from './storage-builders';
import { createArtist, createRelease, createTrack } from './storage-creators';
import { ReleaseModel, ReleaseType } from '../models/release-model';
import { ArtistModel } from '../models/artist-model';
import { TrackModel } from '../models/track-model';

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

export const handleCreateArtist = async (req: Request, res: Response): Promise<void> => {
  try {
    const { spotifyArtistId, name } = req.body;
    if (!spotifyArtistId || spotifyArtistId.length < 1) {
      sendError(res, ErrorCode.BadRequest, 'Please supply a valid spotify artist ID.');
      return;
    }

    if (!name || name.length < 1) {
      sendError(res, ErrorCode.BadRequest, 'Please supply a valid name.');
    }

    const newArtist = await createArtist({ spotifyArtistId, name });

    sendSuccessContent(res, SuccessCode.OK, newArtist);
  } catch (error) {
    sendError(res, ErrorCode.InternalServerError, error);
  }
};

export const handleCreateRelease = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, spotifyAlbumId, releaseType, artistIds } = req.body;
    if (!spotifyAlbumId || spotifyAlbumId.length < 1) {
      sendError(res, ErrorCode.BadRequest, 'Please supply a valid spotify album ID.');
      return;
    }

    if (!name || name.length < 1) {
      sendError(res, ErrorCode.BadRequest, 'Please supply a valid name.');
    }

    if (!Object.values(ReleaseType).includes(releaseType)) {
      sendError(res, ErrorCode.BadRequest, 'Please supply a valid release type.');
    }

    if (isNilOrEmpty(artistIds)) {
      sendError(res, ErrorCode.BadRequest, 'Please supply at least 1 artist ID.');
    }

    if (!artistIds.some(async (artistId: string) => await ArtistModel.exists({ _id: artistId }))) {
      sendError(res, ErrorCode.BadRequest, 'An invalid artist ID was supplied.');
    }

    const newRelease = await createRelease({ name, spotifyAlbumIds: [spotifyAlbumId], releaseType, artistIds });

    sendSuccessContent(res, SuccessCode.OK, newRelease);
  } catch (error) {
    sendError(res, ErrorCode.InternalServerError, error);
  }
};

export const handleCreateTrack = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, spotifyTrackId, artistIds, releaseId } = req.body;
    if (!spotifyTrackId || spotifyTrackId.length < 1) {
      sendError(res, ErrorCode.BadRequest, 'Please supply a valid spotify track ID.');
      return;
    }

    if (!name || name.length < 1) {
      sendError(res, ErrorCode.BadRequest, 'Please supply a valid name.');
    }

    if (isNilOrEmpty(artistIds)) {
      sendError(res, ErrorCode.BadRequest, 'Please supply at least 1 artist ID.');
    }

    if (!ReleaseModel.exists({ _id: releaseId })) {
      sendError(res, ErrorCode.BadRequest, 'An invalid release ID was supplied.');
    }

    const newTrack = await createTrack({ name, spotifyTrackIds: [spotifyTrackId], artistIds, releaseId });

    sendSuccessContent(res, SuccessCode.OK, newTrack);
  } catch (error) {
    sendError(res, ErrorCode.InternalServerError, error);
  }
};

export const handleCreateManyTracks = async (req: Request, res: Response): Promise<void> => {
  const { tracks } = req.body;

  if (!tracks || tracks.length < 1) {
    sendSuccessContent(res, SuccessCode.OK, []);
    return;
  }

  const results = [];
  for (const track of tracks) {
    try {
      const { name, spotifyTrackId, artistIds, releaseId } = track;

      if (!spotifyTrackId || spotifyTrackId.length < 1) {
        results.push({ success: false, error: 'Please supply a valid spotify track ID.' });
        continue;
      }

      if (!name || name.length < 1) {
        results.push({ success: false, error: 'Please supply a valid name.' });
        continue;
      }

      if (isNilOrEmpty(artistIds)) {
        results.push({ success: false, error: 'Please supply at least 1 artist ID.' });
        continue;
      }

      if (!ReleaseModel.exists({ _id: releaseId })) {
        results.push({ success: false, error: 'An invalid release ID was supplied.' });
        continue;
      }

      const newTrack = await createTrack({ name, spotifyTrackIds: [spotifyTrackId], artistIds, releaseId });

      results.push({ success: true, track: newTrack });
    } catch (error) {
      results.push({ success: false, error: error });
    }
  }

  sendSuccessContent(res, SuccessCode.OK, results);
};

export const handleGetTracks = async (_req: Request, res: Response): Promise<void> => {
  try {
    const tracks = await TrackModel.find({});
    sendSuccessContent(res, SuccessCode.OK, tracks);
  } catch (error) {
    sendError(res, ErrorCode.InternalServerError, error);
  }
};

export const handleGetReleases = async (_req: Request, res: Response): Promise<void> => {
  try {
    const releases = await ReleaseModel.find({});
    sendSuccessContent(res, SuccessCode.OK, releases);
  } catch (error) {
    sendError(res, ErrorCode.InternalServerError, error);
  }
};

export const handleRegisterPlays = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tracks } = req.body;
    if (!tracks) {
      sendError(res, ErrorCode.BadRequest, 'Missing tracks parameter');
      return;
    }

    const results = [];
    for (const track of tracks) {
      const { spotifyTrackId, timestamp } = track;
      if (!spotifyTrackId || !timestamp) {
        results.push({ success: false, error: 'Missing parameters', ...track });
        continue;
      }

      if (await hasPlayBeenRegistered(timestamp)) {
        results.push({ success: false, error: 'Play already registered', ...track });
        continue;
      }

      const trackDocument = await getOrCreateTrack(spotifyTrackId);
      if (!trackDocument) {
        results.push({ success: false, error: 'Failed to retrieve track', ...track });
        continue;
      }

      const result = await registerPlay(trackDocument, timestamp);
      results.push({ success: true, ...result });
    }

    sendSuccessContent(res, SuccessCode.Accepted, results);
  } catch (error) {
    sendError(res, ErrorCode.InternalServerError, error);
  }
};
