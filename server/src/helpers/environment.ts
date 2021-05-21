import { config } from 'dotenv';

enum EnvironmentVariable {
  ApplicationUsername = 'APPLICATION_USERNAME',
  ApplicationPassword = 'APPLICATION_PASSWORD',
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

type EnvironmentVariables = { [key in EnvironmentVariable]: string };

class Environment {
  readonly variables: EnvironmentVariables;

  constructor() {
    config();
    this.variables = Object.values(EnvironmentVariable).reduce((result, variable) => {
      result[variable] = process.env[variable] || '';
      return result;
    }, {} as EnvironmentVariables);
  }

  areAnyVariablesMissing = (): boolean => Object.values(this.variables).some((variable) => variable.length <= 0);

  mongoUri = (): string =>
    `mongodb+srv://${this.variables.MONGO_USER}:${this.variables.MONGO_PASSWORD}@${this.variables.MONGO_CLUSTER}/${this.variables.MONGO_DB}?retryWrites=true&w=majority`;
}

export const environment = new Environment();
