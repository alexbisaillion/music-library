import SpotifyWebApi from 'spotify-web-api-node';
import { EnvironmentVariable, getEnvVar } from '../helpers/environment-variables';

export const spotifyApiWrapper = new SpotifyWebApi({
  clientId: getEnvVar(EnvironmentVariable.SpotifyClientId),
  clientSecret: getEnvVar(EnvironmentVariable.SpotifyClientSecret),
  refreshToken: getEnvVar(EnvironmentVariable.SpotifyRefreshToken)
});

export const refreshCredentials = async (): Promise<void> => {
  const response = await spotifyApiWrapper.refreshAccessToken();
  spotifyApiWrapper.setAccessToken(response.body.access_token);
};

export const makeSpotifyRequest = async <T>(requestFn: () => Promise<T>): Promise<T> => {
  await refreshCredentials();
  return requestFn();
};
