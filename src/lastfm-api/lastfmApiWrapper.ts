import { stringify } from 'querystring';
import { createHash } from 'crypto';
import fetch from 'node-fetch';

enum LastfmMethod {
  Scrobble = 'track.scrobble',
  GetTopTracks = 'user.getTopTracks',
  GetTopAlbums = 'user.getTopAlbums',
  GetTopArtists = 'user.getTopArtists',
  GetSession = 'auth.getSession'
}

export type ScrobbleParams = {
  timestamp: number;
  track: string;
  artist: string;
  album: string;
  albumArtist: string;
};

export type PaginationParams = {
  limit: number;
  page?: number;
};

export class LastfmApiWrapper {
  constructor(
    private apiKey: string,
    private sharedSecret: string,
    private session: string,
    private username: string
  ) {}

  private generateMethodSignature(params: Record<string, string>) {
    const signature =
      Object.keys(params)
        .sort()
        .reduce((acc, key) => acc + key + params[key], '') + this.sharedSecret;
    return createHash('md5').update(signature, 'utf8').digest('hex');
  }

  private generateAuthenticatedUrl(method: LastfmMethod, params: Record<string, string | number>) {
    const fullParams: Record<string, string> = { ...params, api_key: this.apiKey, sk: this.session, method: method };
    return `http://ws.audioscrobbler.com/2.0/?format=json&${stringify(
      fullParams
    )}&api_sig=${this.generateMethodSignature(fullParams)}`;
  }

  private generateUrl(method: LastfmMethod, params: Record<string, string | number>) {
    const fullParams: Record<string, string> = { ...params, api_key: this.apiKey, method: method };
    return `http://ws.audioscrobbler.com/2.0/?format=json&${stringify(fullParams)}`;
  }

  private async makeAuthenticatedRequest(method: LastfmMethod, params: Record<string, string | number>) {
    return fetch(this.generateAuthenticatedUrl(method, params), { method: 'POST' });
  }

  private async makeRequest(method: LastfmMethod, params: Record<string, string | number>) {
    return fetch(this.generateUrl(method, params), { method: 'GET' });
  }

  public async scrobbleTrack(scrobbleParams: ScrobbleParams) {
    const { album, albumArtist, artist, timestamp, track } = scrobbleParams; // Destructure so that extra properties are not sent.
    return this.makeAuthenticatedRequest(LastfmMethod.Scrobble, { album, albumArtist, artist, timestamp, track });
  }

  public async getTopTracks(topTracksParams: PaginationParams) {
    return this.makeRequest(LastfmMethod.GetTopTracks, {
      ...topTracksParams,
      page: topTracksParams.page ? topTracksParams.page : 1,
      user: this.username
    });
  }

  public async getTopAlbums(topAlbumsParams: PaginationParams) {
    return this.makeRequest(LastfmMethod.GetTopAlbums, {
      ...topAlbumsParams,
      page: topAlbumsParams.page ? topAlbumsParams.page : 1,
      user: this.username
    });
  }

  public async getTopArtists(topArtistsParams: PaginationParams) {
    return this.makeRequest(LastfmMethod.GetTopArtists, {
      ...topArtistsParams,
      page: topArtistsParams.page ? topArtistsParams.page : 1,
      user: this.username
    });
  }

  public async getSession(token: string) {
    return this.makeAuthenticatedRequest(LastfmMethod.GetSession, { token });
  }
}
