export enum EnvironmentVariable {
  MongoCluster = 'MONGO_CLUSTER',
  MongoDB = 'MONGO_DB',
  MongoPassword = 'MONGO_PASSWORD',
  MongoUser = 'MONGO_USER',
  LastfmApiKey = 'LASTFM_API_KEY',
  LastfmSession = 'LASTFM_SESSION',
  LastfmSharedSecret = 'LASTFM_SHARED_SECRET',
  LastfmUsername = 'LASTFM_USERNAME'
}

export const getEnvVar = (variable: EnvironmentVariable): string => process.env[variable] || '';
export const areAnyEnvVarsMissing = (): boolean =>
  Object.values(EnvironmentVariable).some((variable) => getEnvVar(variable).length === 0);
