import { config } from 'dotenv';
config();

import { sleep, SleepTime } from './helpers/generic-helpers';
import { Play } from './models/play-model';
import { getRecentPlays } from './spotify-api/spotify-api-methods';
import { getOrCreateTrack, hasPlayBeenRegistered, registerPlay } from './storage-api/storage-consumers';
import { connectToMongoose } from './helpers/connectToMongoose';

const refreshPlays = async (): Promise<Play[] | undefined> => {
  const spotifyPlays = await getRecentPlays();

  if (!spotifyPlays || spotifyPlays.length === 0) {
    return;
  }

  await connectToMongoose();
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
    const plays = await refreshPlays();
    if (!plays) {
      console.log('Failed retrieving plays.');
    } else {
      console.log(`Registered ${plays.length} plays.`);
    }
    console.log('Sleeping for 60000ms...');
    await sleep(SleepTime.Minute);
  }
};

listenToPlays();
