import mongoose from 'mongoose';
import { environment } from './environment';

export const connectToMongoose = async (): Promise<void> => {
  await mongoose.connect(environment.mongoUri(), {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  });
};
