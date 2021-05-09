import { config } from 'dotenv';
config();

import mongoose from 'mongoose';

export const connectToMongo = async (): Promise<void> => {
  const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  });
};

// Import and call any methods here. Example:
// import { createDocumentsFromArtistsList } from './scripts/copyPreviousModel';
// import artistLists from './artist-lists.json';
// createDocumentsFromArtistsList(artistLists, connectToMongo);
