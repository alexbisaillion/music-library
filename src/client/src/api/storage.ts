import axios, { AxiosResponse } from 'axios';
import { Artist, Release, ReleaseType, Track } from './types';

const routePrefix = '/storage';

type ExistingArtist = { _id: string; name: string };
type SuggestedArtist = { spotifyArtistId: string; name: string };
export type ArtistParamsResult =
  | { isRegistered: true; existingArtist: ExistingArtist; spotifyArtist?: never }
  | { isRegistered: false; existingArtist?: never; spotifyArtist: SuggestedArtist };

type SuggestedRelease = {
  spotifyAlbumId: string;
  name: string;
  releaseType: 'album' | 'single' | 'compilation';
  albumArtists: ArtistParamsResult[];
};
export type ReleaseParamsResult =
  | { isRegistered: true; existingRelease: Release; spotifyRelease?: never }
  | { isRegistered: false; existingRelease?: never; spotifyRelease: SuggestedRelease };

type SuggestedTrack = { spotifyTrackId: string; name: string; artists: ArtistParamsResult[] };
export type TrackParamsResult =
  | { isRegistered: true; existingTrack: Track; spotifyTrack?: never }
  | { isRegistered: false; existingTrack?: never; spotifyTrack: SuggestedTrack };

export type AlbumParamsResponse = {
  release: ReleaseParamsResult;
  tracks: TrackParamsResult[];
};
export const getAlbumParams = async (spotifyAlbumId: string): Promise<AlbumParamsResponse> => {
  const response: AxiosResponse<AlbumParamsResponse> = await axios.post(routePrefix + '/getAlbumInfo', {
    spotifyAlbumId
  });
  return response.data;
};

export const createArtist = async (spotifyArtistId: string, name: string): Promise<Artist> => {
  const response: AxiosResponse<Artist> = await axios.post(routePrefix + '/createArtist', { spotifyArtistId, name });
  return response.data;
};

type CreateReleaseParams = {
  name: string;
  spotifyAlbumId: string;
  releaseType: ReleaseType;
  artistIds: string[];
};
export const createRelease = async (params: CreateReleaseParams): Promise<Release> => {
  const response: AxiosResponse<Release> = await axios.post(routePrefix + '/createRelease', params);
  return response.data;
};

export type CreateTrackParams = {
  name: string;
  spotifyTrackId: string;
  artistIds: string[];
  releaseId: string;
};
export const createTrack = async (params: CreateTrackParams): Promise<Track> => {
  const response: AxiosResponse<Track> = await axios.post(routePrefix + '/createTrack', params);
  return response.data;
};

export type CreateTrackResponse =
  | { success: true; track: Track; error?: never }
  | { success: false; track?: never; error: string };
export const createManyTracks = async (params: CreateTrackParams[]): Promise<CreateTrackResponse[]> => {
  const response: AxiosResponse<CreateTrackResponse[]> = await axios.post(routePrefix + '/createManyTracks', {
    tracks: params
  });
  return response.data;
};
