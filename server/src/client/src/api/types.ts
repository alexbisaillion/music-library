export type Artist = {
  _id: string;
  name: string;
  spotifyIds: string[];
  releases: string[];
};

export enum ReleaseType {
  Album = 'Album',
  Single = 'Single',
  EP = 'EP',
  Soundtrack = 'Soundtrack',
  Compilation = 'Compilation',
  Mixtape = 'Mixtape'
}

export type Release = {
  _id: string;
  name: string;
  spotifyIds: string[];
  releaseType: ReleaseType;
  artists: string[] | Artist[];
  tracks: string[] | Track[];
  rating?: number;
  releaseDate?: number;
};

export type Track = {
  _id: string;
  name: string;
  spotifyIds: string[];
  artists: string[] | Artist[];
  primaryRelease: string | Release;
  secondaryReleases: string[] | Release[];
  plays: number[];
  rating?: number;
};
