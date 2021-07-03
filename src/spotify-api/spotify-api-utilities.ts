import SpotifyWebApi from 'spotify-web-api-node';
import { environment } from '../helpers/environment';

export const spotifyApiWrapper = new SpotifyWebApi({
  clientId: environment.variables.SPOTIFY_CLIENT_ID,
  clientSecret: environment.variables.SPOTIFY_CLIENT_SECRET,
  refreshToken: environment.variables.SPOTIFY_REFRESH_TOKEN
});

export const refreshCredentials = async (): Promise<void> => {
  const response = await spotifyApiWrapper.refreshAccessToken();
  spotifyApiWrapper.setAccessToken(response.body.access_token);
};

export const makeSpotifyRequest = async <T>(requestFn: () => Promise<T>): Promise<T> => {
  await refreshCredentials();
  return requestFn();
};
