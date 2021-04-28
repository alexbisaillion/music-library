import { Release } from '../models/release-model';
import { getArtist, getRelease, getTrack } from './storage-consumers';
import {
  SpotifyAlbumDetails,
  getAlbumDetails,
  getArtistDetails,
  SpotifyTrackDetails,
  getTrackDetails
} from '../spotify-api/spotify-api-methods';
import { Artist } from '../models/artist-model';
import { Track } from '../models/track-model';

type ReleaseParamsResult = {
  isRegistered: boolean;
  existingRelease?: Release;
  spotifyRelease?: SpotifyAlbumDetails;
  albumArtists?: ArtistParamsResult[];
  tracks?: TrackParamsResult[];
};
export const getReleaseParams = async (spotifyAlbumId: string): Promise<ReleaseParamsResult> => {
  const existingRelease = await getRelease(spotifyAlbumId);
  if (existingRelease) {
    return { isRegistered: true, existingRelease };
  }

  const albumDetails = await getAlbumDetails(spotifyAlbumId);

  return {
    isRegistered: false,
    spotifyRelease: albumDetails,
    albumArtists: await Promise.all(albumDetails?.albumArtists.map((artist) => getArtistParams(artist.id)) || []),
    tracks: await Promise.all(albumDetails?.tracks.map((track) => getTrackParams(track.id)) || [])
  };
};

type ArtistParamsResult = {
  isRegistered: boolean;
  existingArtist?: Artist;
  spotifyArtist?: string;
};
const getArtistParams = async (spotifyArtistId: string): Promise<ArtistParamsResult> => {
  const existingArtist = await getArtist(spotifyArtistId);
  if (existingArtist) {
    return { isRegistered: true, existingArtist };
  }
  return { isRegistered: false, spotifyArtist: await getArtistDetails(spotifyArtistId) };
};

type TrackParamsResult = {
  isRegistered: boolean;
  existingTrack?: Track;
  spotifyTrack?: SpotifyTrackDetails;
  artists?: ArtistParamsResult[];
};
const getTrackParams = async (spotifyTrackId: string): Promise<TrackParamsResult> => {
  const existingTrack = await getTrack(spotifyTrackId);
  if (existingTrack) {
    return { isRegistered: true, existingTrack };
  }

  const trackDetails = await getTrackDetails(spotifyTrackId);

  return {
    isRegistered: false,
    spotifyTrack: trackDetails,
    artists: await Promise.all(trackDetails?.artists.map((artist) => getArtistParams(artist.id)) || [])
  };
};
