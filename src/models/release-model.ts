import { model, Schema, Types, Document } from 'mongoose';
import { Artist } from './artist-model';
import { Track } from './track-model';

export enum ReleaseType {
  Album = 'Album',
  Single = 'Single',
  EP = 'EP',
  Soundtrack = 'Soundtrack',
  Compilation = 'Compilation',
  Mixtape = 'Mixtape'
}

export interface Release extends Document {
  _id: Types.ObjectId;
  title: string;
  spotifyId?: string;
  releaseType: ReleaseType;
  artists: Types.ObjectId[] | Artist[];
  tracks: Types.ObjectId[] | Track[];
  rating?: number;
  releaseDate?: number;
}

const ReleaseSchema = new Schema({
  title: { type: String, required: true },
  spotifyId: { type: String, unique: true },
  releaseType: { type: String, enum: ReleaseType, required: true },
  artists: { type: [Schema.Types.ObjectId], ref: 'Artist', required: true },
  tracks: { type: [Schema.Types.ObjectId], ref: 'Track', required: true },
  rating: { type: Number },
  releaseDate: { type: Number }
});

export const ReleaseModel = model<Release>('Release', ReleaseSchema);
