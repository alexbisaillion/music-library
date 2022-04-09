import { config } from 'dotenv';
import mongoose from 'mongoose';

export enum EnvironmentVariable {
  ApplicationUsername = 'APPLICATION_USERNAME',
  ApplicationPassword = 'APPLICATION_PASSWORD',
  DeezerAccessToken = 'DEEZER_ACCESS_TOKEN',
  JobUrl = 'JOB_URL',
  LastfmApiKey = 'LASTFM_API_KEY',
  LastfmSession = 'LASTFM_SESSION',
  LastfmSharedSecret = 'LASTFM_SHARED_SECRET',
  LastfmUsername = 'LASTFM_USERNAME',
  MongoCluster = 'MONGO_CLUSTER',
  MongoDB = 'MONGO_DB',
  MongoPassword = 'MONGO_PASSWORD',
  MongoUser = 'MONGO_USER',
  RootDirectory = 'ROOT_DIR',
  Secret = 'SECRET',
  SpotifyClientId = 'SPOTIFY_CLIENT_ID',
  SpotifyClientSecret = 'SPOTIFY_CLIENT_SECRET',
  SpotifyRefreshToken = 'SPOTIFY_REFRESH_TOKEN'
}

export type EnvironmentVariables = { [key in EnvironmentVariable]: string };

export class EnvironmentWrapper {
  private _variables: EnvironmentVariables;
  private _mongoUri: string;

  constructor() {
    config();
    this._variables = Object.values(EnvironmentVariable).reduce((result, variable) => {
      result[variable] = process.env[variable] || '';
      return result;
    }, {} as EnvironmentVariables);
    this._mongoUri = `mongodb+srv://${this._variables.MONGO_USER}:${this._variables.MONGO_PASSWORD}@${this._variables.MONGO_CLUSTER}/${this._variables.MONGO_DB}?retryWrites=true&w=majority`;
  }

  get variables(): EnvironmentVariables {
    return this._variables;
  }

  get mongoUri(): string {
    return this._mongoUri;
  }

  areAnyVariablesMissing = (): boolean => Object.values(this._variables).some((variable) => variable.length <= 0);

  connectToMongoose = async (): Promise<void> => {
    await mongoose.connect(this._mongoUri, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    });
  };
}

export const environment = new EnvironmentWrapper();
