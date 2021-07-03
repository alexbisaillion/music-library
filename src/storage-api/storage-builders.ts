import { Release } from '../models/release-model';
import { getArtist, getRelease, getTrack } from './storage-consumers';
import { getAlbumDetails, getArtistDetails, getTrackDetails } from '../spotify-api/spotify-api-methods';
import { Track } from '../models/track-model';
import { Artist } from '../models/artist-model';
import { isNonNil } from '../helpers/generic-helpers';

type SuggestedRelease = {
  spotifyAlbumId: string;
  name: string;
  releaseType: 'album' | 'single' | 'compilation';
  albumArtists: ArtistParamsResult[];
};
type ReleaseParamsResult =
  | {
      isRegistered: true;
      existingRelease: Release;
      spotifyRelease?: never;
    }
  | {
      isRegistered: false;
      existingRelease?: never;
      spotifyRelease: SuggestedRelease;
    };
export const getReleaseParams = async (spotifyAlbumId: string): Promise<ReleaseParamsResult | undefined> => {
  const existingRelease = await getRelease(spotifyAlbumId);
  if (existingRelease) {
    return { isRegistered: true, existingRelease };
  }

  const albumDetails = await getAlbumDetails(spotifyAlbumId);

  if (albumDetails) {
    const artistDetails = await Promise.all(albumDetails.albumArtists.map((artist) => getArtistParams(artist.id)));

    return {
      isRegistered: false,
      spotifyRelease: {
        spotifyAlbumId: albumDetails.spotifyAlbumId,
        name: albumDetails.name,
        releaseType: albumDetails.releaseType,
        albumArtists: artistDetails.filter(isNonNil)
      }
    };
  }

  return undefined;
};

type SuggestedTrack = {
  spotifyTrackId: string;
  name: string;
  artists: ArtistParamsResult[];
};
type TrackParamsResult =
  | {
      isRegistered: true;
      existingTrack: Track;
      spotifyTrack?: never;
    }
  | {
      isRegistered: false;
      existingTrack?: never;
      spotifyTrack: SuggestedTrack;
    };
export const getTrackParams = async (spotifyTrackId: string): Promise<TrackParamsResult | undefined> => {
  const existingTrack = await getTrack(spotifyTrackId);
  if (existingTrack) {
    return { isRegistered: true, existingTrack };
  }

  const trackDetails = await getTrackDetails(spotifyTrackId);

  if (trackDetails) {
    const artistsDetails = await Promise.all(trackDetails.artists.map((artist) => getArtistParams(artist.id)));

    return {
      isRegistered: false,
      spotifyTrack: {
        spotifyTrackId: trackDetails.spotifyTrackId,
        name: trackDetails.name,
        artists: artistsDetails.filter(isNonNil)
      }
    };
  }

  return undefined;
};

type SuggestedArtist = {
  spotifyArtistId: string;
  name: string;
};
type ArtistParamsResult =
  | {
      isRegistered: true;
      existingArtist: Artist;
      spotifyArtist?: never;
    }
  | {
      isRegistered: false;
      existingArtist?: never;
      spotifyArtist: SuggestedArtist;
    };
export const getArtistParams = async (spotifyArtistId: string): Promise<ArtistParamsResult | undefined> => {
  const existingArtist = await getArtist(spotifyArtistId);

  if (existingArtist) {
    return { isRegistered: true, existingArtist };
  }

  const artistDetails = await getArtistDetails(spotifyArtistId);

  if (artistDetails) {
    return {
      isRegistered: false,
      spotifyArtist: {
        spotifyArtistId: artistDetails.spotifyArtistId,
        name: artistDetails.name
      }
    };
  }

  return undefined;
};
