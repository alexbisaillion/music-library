import express from 'express';
import cors from 'cors';
import { authenticationRouter } from './authentication-api/authentication-routes';
import { lastfmRouter } from './lastfm-api/lastfm-routes';
import { spotifyRouter } from './spotify-api/spotify-routes';
import { storageRouter } from './storage-api/storage-routes';
import { environment } from './helpers/environment';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { handleValidateAuthorized } from './authentication-api/authentication-handlers';
import { jobRouter } from './job-api/job-routes';

// Declaration merging required by express-session
declare module 'express-session' {
  interface Session {
    isLoggedIn: boolean;
  }
}

const app = express();

app.set('trust proxy', 1); // Allow requests from an external client.

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
app.use(
  session({
    secret: environment.variables.SECRET || '',
    store: MongoStore.create({ mongoUrl: environment.mongoUri, collectionName: 'sessions' }),
    resave: true,
    saveUninitialized: true
  })
);
app.use(authenticationRouter); // Use authentication router before validating authorization.
app.use(jobRouter);

app.post('*', handleValidateAuthorized); // Validate that every POST is from an authorized session.
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
