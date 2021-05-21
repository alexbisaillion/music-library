import { config } from 'dotenv';
config();

import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import cors from 'cors';
import { authenticationRouter } from './authentication-api/authentication-routes';
import { lastfmRouter } from './lastfm-api/lastfm-routes';
import { spotifyRouter } from './spotify-api/spotify-routes';
import { storageRouter } from './storage-api/storage-routes';
import { environment } from './helpers/environment';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { handleValidateAuthorized } from './authentication-api/authentication-handlers';

// Declaration merging required by express-session
declare module 'express-session' {
  interface Session {
    isLoggedIn: boolean;
  }
}

const app = express();
const PORT: string | number = process.env.PORT || 3001;
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

app.use(
  cors({
    origin: ['http://localhost:3000', 'https://localhost:3000'],
    methods: ['GET', 'POST']
  })
);
app.use(express.json());
app.use(
  session({
    secret: process.env.SECRET || '',
    store: MongoStore.create({ mongoUrl: uri, collectionName: 'sessions' }),
    resave: true,
    saveUninitialized: true
  })
);
app.use(authenticationRouter); // Use authentication router before validating authorization.

app.post('*', handleValidateAuthorized); // Validate that every POST is from an authorized session.
app.use(lastfmRouter);
app.use(spotifyRouter);
app.use(storageRouter);

// Serve static files from the React app
app.use(express.static(`${process.env.ROOT_DIR}/client/build`));
app.get('/*', (_req, res) => {
  const url = path.join(`${process.env.ROOT_DIR}/client/build`, 'index.html');
  res.sendFile(url);
});

const startServer = async () => {
  if (environment.areAnyVariablesMissing()) {
    console.error(`Missing environment variables.`);
    return;
  }

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  });

  app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}.`));
};

startServer();
