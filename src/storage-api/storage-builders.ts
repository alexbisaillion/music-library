import { Release } from '../models/release-model';
import { getRelease, getTrack } from './storage-consumers';
import { getAlbumDetails, getTrackDetails } from '../spotify-api/spotify-api-methods';
import { Track } from '../models/track-model';

type SuggestedArtist = {
  spotifyArtistId: string;
  name: string;
};

type SuggestedRelease = {
  spotifyAlbumId: string;
  name: string;
  releaseType: 'album' | 'single' | 'compilation';
  albumArtists: SuggestedArtist[];
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
      albumArtists: albumDetails.albumArtists.map((artist) => ({ spotifyArtistId: artist.id, name: artist.name }))
    }
  };
};

type SuggestedTrack = {
  spotifyTrackId: string;
  name: string;
  artists: SuggestedArtist[];
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
      name: trackDetails.title,
      artists: trackDetails.artists.map((artist) => ({ spotifyArtistId: artist.id, name: artist.name }))
    }
  };
};
