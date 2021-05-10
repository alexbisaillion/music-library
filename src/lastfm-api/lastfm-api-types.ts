export enum LastfmMethod {
  Scrobble = 'track.scrobble',
  GetTopTracks = 'user.getTopTracks',
  GetTopAlbums = 'user.getTopAlbums',
  GetTopArtists = 'user.getTopArtists',
  GetSession = 'auth.getSession',
  UpdateNowPlaying = 'track.updateNowPlaying'
}

export type LastfmPaginationParams = {
  limit: number;
  page?: number;
};
