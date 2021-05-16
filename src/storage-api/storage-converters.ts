import { Release, ReleaseType } from '../models/release-model';
import { Track } from '../models/track-model';
import { ScrobblePlayParams, BasePlayParams } from '../lastfm-api/lastfm-api-methods';
import { Artist } from '../models/artist-model';

export const getScrobblePlayParams = async (track: Track, timestamp: number): Promise<ScrobblePlayParams> => {
  const baseParams = await getBasePlayParams(track);
  return { ...baseParams, timestamp };
};

export const getBasePlayParams = async (track: Track): Promise<BasePlayParams> => {
  const fullTrack = await track
    .populate('artists')
    .populate({ path: 'primaryRelease', populate: { path: 'artists' } })
    .execPopulate();

  const release = fullTrack.primaryRelease as Release;
  const artists = fullTrack.artists as Artist[];
  const albumArtists = release.artists as Artist[];

  return {
    track: fullTrack.name,
    album: release.name,
    artist: artists[0].name,
    albumArtist:
      release.tracks.length > 1 ? formatAlbumArtists(albumArtists.map((artist) => artist.name)) : albumArtists[0].name
  };
};

const formatAlbumArtists = (names: string[]): string => {
  if (names.length === 1) {
    return names[0];
  }
  if (names.length === 2) {
    return `${names[0]} & ${names[1]}`;
  }
  return names.reduce((formattedAlbumArtist, currentArtist, index) => {
    if (index < names.length - 1) {
      return `${formattedAlbumArtist}${currentArtist}, `;
    }
    return `${formattedAlbumArtist} & ${currentArtist}`;
  }, '' as string);
};

export const convertAlbumType = (albumType: 'album' | 'single' | 'compilation'): ReleaseType => {
  switch (albumType) {
    case 'album':
      return ReleaseType.Album;
    case 'single':
      return ReleaseType.Single;
    default:
      return ReleaseType.Compilation;
  }
};
