import express from 'express';
import cors from 'cors';
import { lastfmRouter } from './lastfm-api/lastfm-routes';
import { spotifyRouter } from './spotify-api/spotify-routes';
import { storageRouter } from './storage-api/storage-routes';
import { environment } from './helpers/environment';
import { jobRouter } from './job-api/job-routes';
import { validateAuthorized } from './helpers/routing';

const app = express();

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://localhost:3000',
      'http://alexbisaillion.github.io',
      'https://alexbisaillion.github.io'
    ],
    methods: ['GET', 'POST']
  })
);
app.use(express.json());

app.post('*', validateAuthorized); // Validate that every POST request supplies the correct secret.
app.use(jobRouter);
app.use(lastfmRouter);
app.use(spotifyRouter);
app.use(storageRouter);

const startServer = async () => {
  if (environment.areAnyVariablesMissing()) {
    console.error(`Missing environment variables.`);
    return;
  }

  await environment.connectToMongoose();

  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}.`));
};

startServer();
