import { Artist } from './artist-model';
import { Release } from './release-model';
import { model, Schema, Document, Types } from 'mongoose';

export interface Track extends Document {
  _id: Types.ObjectId;
  name: string;
  spotifyIds: string[];
  artists: Types.ObjectId[] | Artist[];
  primaryRelease: Types.ObjectId | Release;
  secondaryReleases: Types.ObjectId[] | Release[];
  plays: number[];
  rating?: number;
}

const TrackSchema = new Schema({
  name: { type: String, required: true },
  spotifyIds: { type: [String] },
  artists: { type: [Schema.Types.ObjectId], ref: 'Artist', required: true },
  primaryRelease: { type: Schema.Types.ObjectId, ref: 'Release', required: true },
  secondaryReleases: { type: [Schema.Types.ObjectId], ref: 'Release', required: true },
  plays: { type: [Number], required: true },
  rating: { type: Number }
});

export const TrackModel = model<Track>('Track', TrackSchema);
