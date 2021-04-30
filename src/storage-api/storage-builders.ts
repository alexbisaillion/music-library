import { Release } from '../models/release-model';
import { getArtist, getRelease, getTrack } from './storage-consumers';
import { getAlbumDetails, getArtistDetails, getTrackDetails } from '../spotify-api/spotify-api-methods';
import { Track } from '../models/track-model';
import { Artist } from '../models/artist-model';

type SuggestedRelease = {
  spotifyAlbumId: string;
  name: string;
  releaseType: 'album' | 'single' | 'compilation';
  albumArtists: ArtistParamsResult[];
};
type ReleaseParamsResult = {
  isRegistered: boolean;
  existingRelease?: Release;
  spotifyRelease?: SuggestedRelease;
};
export const getReleaseParams = async (spotifyAlbumId: string): Promise<ReleaseParamsResult> => {
  const existingRelease = await getRelease(spotifyAlbumId);
  if (existingRelease) {
    return { isRegistered: true, existingRelease };
  }

  const albumDetails = await getAlbumDetails(spotifyAlbumId);

  if (!albumDetails) {
    return { isRegistered: false, spotifyRelease: undefined };
  }

  return {
    isRegistered: false,
    spotifyRelease: {
      spotifyAlbumId: albumDetails.spotifyAlbumId,
      name: albumDetails.name,
      releaseType: albumDetails.releaseType,
      albumArtists: await Promise.all(albumDetails.albumArtists.map((artist) => getArtistParams(artist.id)))
    }
  };
};

type SuggestedTrack = {
  spotifyTrackId: string;
  name: string;
  artists: ArtistParamsResult[];
};
type TrackParamsResult = {
  isRegistered: boolean;
  existingTrack?: Track;
  spotifyTrack?: SuggestedTrack;
};
export const getTrackParams = async (spotifyTrackId: string): Promise<TrackParamsResult> => {
  const existingTrack = await getTrack(spotifyTrackId);
  if (existingTrack) {
    return { isRegistered: true, existingTrack };
  }

  const trackDetails = await getTrackDetails(spotifyTrackId);

  if (!trackDetails) {
    return { isRegistered: false, spotifyTrack: undefined };
  }

  return {
    isRegistered: false,
    spotifyTrack: {
      spotifyTrackId: trackDetails.spotifyTrackId,
      name: trackDetails.name,
      artists: await Promise.all(trackDetails.artists.map((artist) => getArtistParams(artist.id)))
    }
  };
};

type SuggestedArtist = {
  spotifyArtistId: string;
  name: string;
};
type ArtistParamsResult = {
  isRegistered: boolean;
  existingArtist?: Artist;
  spotifyArtist?: SuggestedArtist;
};
export const getArtistParams = async (spotifyArtistId: string): Promise<ArtistParamsResult> => {
  const existingArtist = await getArtist(spotifyArtistId);

  if (existingArtist) {
    return { isRegistered: true, existingArtist };
  }

  const artistDetails = await getArtistDetails(spotifyArtistId);

  if (!artistDetails) {
    return { isRegistered: false, spotifyArtist: undefined };
  }

  return {
    isRegistered: false,
    spotifyArtist: {
      spotifyArtistId: artistDetails.spotifyArtistId,
      name: artistDetails.name
    }
  };
};
