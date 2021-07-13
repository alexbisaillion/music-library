import { Response, Request } from 'express';
import { sendError, ErrorCode, SuccessCode, sendSuccessContent } from '../helpers/routing';
import { getCurrentlyPlayingTrack, getRecentPlays } from '../spotify-api/spotify-api-methods';
import { getOrCreateTrack, getTrack, hasPlayBeenRegistered, registerPlay } from '../storage-api/storage-consumers';
import { getBasePlayParams } from '../storage-api/storage-converters';
import { updateNowPlaying } from '../lastfm-api/lastfm-api-methods';
import { Play } from '../models/play-model';

const updateCurrentlyPlaying = async (): Promise<void> => {
  const currentSpotifyTrack = await getCurrentlyPlayingTrack();
  if (!currentSpotifyTrack) {
    return;
  }

  const trackDocument = await getTrack(currentSpotifyTrack.spotifyTrackId);
  if (trackDocument) {
    const params = await getBasePlayParams(trackDocument);
    await updateNowPlaying(params);
    return;
  }

  await updateNowPlaying({
    album: currentSpotifyTrack.album.name,
    albumArtist: currentSpotifyTrack.album.artists[0].name,
    artist: currentSpotifyTrack.artists[0].name,
    track: currentSpotifyTrack.name
  });
};

const refreshPlays = async (): Promise<Play[] | undefined> => {
  const spotifyPlays = await getRecentPlays();

  if (!spotifyPlays || spotifyPlays.length === 0) {
    return [];
  }

  spotifyPlays.sort((a, b) => b.timestamp - a.timestamp);

  const newPlays: Play[] = [];
  for (const play of spotifyPlays) {
    if (await hasPlayBeenRegistered(play.timestamp)) {
      // break;
      continue; // 7/13/2021 - Cannot break due to Spotify API instability.
    }

    const track = await getOrCreateTrack(play.spotifyTrackId);
    if (!track) {
      continue;
    }

    newPlays.push(await registerPlay(track, play.timestamp));
  }

  return newPlays;
};

export const handleRefreshPlays = async (req: Request, res: Response): Promise<void> => {
  try {
    await updateCurrentlyPlaying();
    const plays = await refreshPlays();
    sendSuccessContent(res, SuccessCode.Created, plays);
  } catch (error) {
    sendError(res, ErrorCode.InternalServerError, error);
  }
};
