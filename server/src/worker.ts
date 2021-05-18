import { config } from 'dotenv';
config();

import { sleep, SleepTime } from './helpers/generic-helpers';
import { Play } from './models/play-model';
import { getCurrentlyPlayingTrack, getRecentPlays } from './spotify-api/spotify-api-methods';
import { getOrCreateTrack, getTrack, hasPlayBeenRegistered, registerPlay } from './storage-api/storage-consumers';
import { connectToMongoose } from './helpers/connectToMongoose';
import { updateNowPlaying } from './lastfm-api/lastfm-api-methods';
import { getBasePlayParams } from './storage-api/storage-converters';

const updateCurrentlyPlaying = async (): Promise<void> => {
  const currentSpotifyTrack = await getCurrentlyPlayingTrack();
  if (!currentSpotifyTrack) {
    return;
  }

  const trackDocument = await getTrack(currentSpotifyTrack.spotifyTrackId);
  if (trackDocument) {
    const params = await getBasePlayParams(trackDocument);
    await updateNowPlaying(params);
  } else {
    await updateNowPlaying({
      album: currentSpotifyTrack.album.name,
      albumArtist: currentSpotifyTrack.album.artists[0].name,
      artist: currentSpotifyTrack.artists[0].name,
      track: currentSpotifyTrack.name
    });
  }
};

const refreshPlays = async (): Promise<Play[] | undefined> => {
  const spotifyPlays = await getRecentPlays();

  if (!spotifyPlays || spotifyPlays.length === 0) {
    return;
  }

  const newPlays: Play[] = [];
  for (const play of spotifyPlays) {
    if (await hasPlayBeenRegistered(play.timestamp)) {
      continue;
    }

    const track = await getOrCreateTrack(play.spotifyTrackId);
    if (!track) {
      continue;
    }

    newPlays.push(await registerPlay(track, play.timestamp));
  }

  return newPlays;
};

const listenToPlays = async () => {
  while (true) {
    try {
      await connectToMongoose();
      await updateCurrentlyPlaying();
      const plays = await refreshPlays();
      if (!plays) {
        console.log('Failed retrieving plays.');
      } else {
        console.log(`Registered ${plays.length} plays.`);
      }
    } catch (error) {
      console.log('Encountered an error.');
      console.log(error);
    }
    console.log('Sleeping for 60000ms...');
    await sleep(SleepTime.Minute);
  }
};

listenToPlays();
