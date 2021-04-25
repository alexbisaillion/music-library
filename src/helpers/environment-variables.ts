export enum EnvironmentVariable {
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

export const getEnvVar = (variable: EnvironmentVariable): string => process.env[variable] || '';
export const areAnyEnvVarsMissing = (): boolean =>
  Object.values(EnvironmentVariable).some((variable) => getEnvVar(variable).length === 0);
