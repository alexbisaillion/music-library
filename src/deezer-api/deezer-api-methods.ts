import { DeezerMethod, DeezerPaginationParams } from './deezer-api-types';
import { makeDeezerRequest } from './deezer-api-utilities';

type RawPlay = {
  id: number;
  title: string;
  timestamp: number;
  artist: {
    id: number;
    name: string;
  };
  album: {
    id: number;
    title: string;
  };
};

type ParsedPlay = {
  title: string;
  id: number;
  timestamp: number;
  artist: string;
  artistId: number;
  album: string;
  albumId: number;
};
export const getHistory = async (params: DeezerPaginationParams): Promise<ParsedPlay[] | undefined> => {
  const response = await makeDeezerRequest({ method: DeezerMethod.History, methodParams: params });
  if (response.status !== 200) {
    return undefined;
  }

  const body = await response.json();
  if (!body.data) {
    return undefined;
  }

  return body.data.map((track: RawPlay) => ({
    title: track.title,
    id: track.id,
    timestamp: track.timestamp,
    artist: track.artist.name,
    artistId: track.artist.id,
    album: track.album.title,
    albumId: track.album.id
  }));
};

type ParsedAlbum = {
  name: string;
  artists: string[];
};
export const getAlbum = async (albumId: number): Promise<ParsedAlbum | undefined> => {
  const response = await makeDeezerRequest({ method: DeezerMethod.Album, methodPaths: [albumId] });
  if (response.status !== 200) {
    return undefined;
  }

  const body = await response.json();
  return { name: body.title, artists: body.contributors.map((contributor: { name: string }) => contributor.name) };
};
