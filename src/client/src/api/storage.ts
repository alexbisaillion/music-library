import axios, { AxiosResponse } from 'axios';

const routePrefix = '/storage';

type ExistingArtist = {
  _id: string;
  name: string;
};
type SuggestedArtist = {
  spotifyArtistId: string;
  name: string;
};
type ArtistParamsResult =
  | {
      isRegistered: true;
      existingArtist: ExistingArtist;
      spotifyArtist?: never;
    }
  | {
      isRegistered: false;
      existingArtist?: never;
      spotifyArtist: SuggestedArtist;
    };

type ExistingRelease = {
  _id: string;
  name: string;
  albumArtists: ExistingArtist[];
};
type SuggestedRelease = {
  spotifyAlbumId: string;
  name: string;
  releaseType: 'album' | 'single' | 'compilation';
  albumArtists: ArtistParamsResult[];
};
export type ReleaseParamsResult =
  | {
      isRegistered: true;
      existingRelease: ExistingRelease;
      spotifyRelease?: never;
    }
  | {
      isRegistered: false;
      existingRelease?: never;
      spotifyRelease: SuggestedRelease;
    };

type ExistingTrack = {
  _id: string;
  name: string;
  artists: ExistingArtist[];
};
type SuggestedTrack = {
  spotifyTrackId: string;
  name: string;
  artists: ArtistParamsResult[];
};
type TrackParamsResult =
  | {
      isRegistered: true;
      existingTrack: ExistingTrack;
      spotifyTrack?: never;
    }
  | {
      isRegistered: false;
      existingTrack?: never;
      spotifyTrack: SuggestedTrack;
    };

export type AlbumParamsResponse = {
  release: ReleaseParamsResult;
  track: TrackParamsResult[];
};
export const getAlbumParams = async (spotifyAlbumId: string): Promise<AlbumParamsResponse> => {
  const response: AxiosResponse<AlbumParamsResponse> = await axios.post(routePrefix + '/getAlbumInfo', {
    spotifyAlbumId
  });
  return response.data;
};
