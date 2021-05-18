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
  name: string;
  spotifyIds: string[];
  releaseType: ReleaseType;
  artists: Types.ObjectId[] | Artist[];
  tracks: Types.ObjectId[] | Track[];
  rating?: number;
  releaseDate?: number;
  dateAdded: number;
}

const ReleaseSchema = new Schema({
  name: { type: String, required: true },
  spotifyIds: { type: [String] },
  releaseType: { type: String, enum: ReleaseType, required: true },
  artists: { type: [Schema.Types.ObjectId], ref: 'Artist', required: true },
  tracks: { type: [Schema.Types.ObjectId], ref: 'Track', required: true },
  rating: { type: Number },
  releaseDate: { type: Number },
  dateAdded: { type: Date, default: Date.now }
});

export const ReleaseModel = model<Release>('Release', ReleaseSchema);
