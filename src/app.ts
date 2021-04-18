import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { lastfmApiRouter } from './lastfm-api/lastfmApiRoutes';
import { areAnyEnvVarsMissing } from './helpers/environmentVariables';

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
app.use(lastfmApiRouter);

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
