import { model, Schema, Document, Types } from 'mongoose';
import { Artist } from './artist-model';
import { Release } from './release-model';
import { Track } from './track-model';

export interface SpotifyTrack extends Document {
  _id: Types.ObjectId;
  spotifyId: string;
  track: Types.ObjectId | Track;
}

const SpotifyTrackSchema = new Schema({
  spotifyId: { type: String, required: true, unique: true },
  track: { type: Schema.Types.ObjectId, ref: 'Track', required: true }
});

export const SpotifyTrackModel = model<SpotifyTrack>('SpotifyTrack', SpotifyTrackSchema);

export interface SpotifyAlbum extends Document {
  _id: Types.ObjectId;
  spotifyId: string;
  album: Types.ObjectId | Release;
}

const SpotifyAlbumSchema = new Schema({
  spotifyId: { type: String, required: true, unique: true },
  album: { type: Schema.Types.ObjectId, ref: 'Release', required: true }
});

export const SpotifyAlbumModel = model<SpotifyAlbum>('SpotifyAlbum', SpotifyAlbumSchema);

export interface SpotifyArtist extends Document {
  _id: Types.ObjectId;
  spotifyId: string;
  artist: Types.ObjectId | Artist;
}

const SpotifyArtistSchema = new Schema({
  spotifyId: { type: String, required: true, unique: true },
  artist: { type: Schema.Types.ObjectId, ref: 'Artist', required: true }
});

export const SpotifyArtistModel = model<SpotifyArtist>('SpotifyArtist', SpotifyArtistSchema);
