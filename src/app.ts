import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { lastfmRouter } from './lastfm-api/lastfm-routes';
import { spotifyRouter } from './spotify-api/spotify-routes';
import { storageRouter } from './storage-api/storage-routes';
import { areAnyEnvVarsMissing } from './helpers/environment-variables';
import { validateSecret } from './helpers/routing';

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

app.post('*', validateSecret); // Validate that every POST request supplies the correct secret.
app.use(lastfmRouter);
app.use(spotifyRouter);
app.use(storageRouter);

const startServer = async () => {
  if (areAnyEnvVarsMissing()) {
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
