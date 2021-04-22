import { model, Schema, Document, Types } from 'mongoose';

export interface Artist extends Document {
  _id: Types.ObjectId;
  name: string;
  spotifyId?: string;
  releases: Types.ObjectId[];
}

const ArtistSchema = new Schema({
  name: { type: String, required: true },
  spotifyId: { type: String, unique: true },
  releases: { type: [Schema.Types.ObjectId], ref: 'Release', required: true }
});

export const ArtistModel = model<Artist>('Artist', ArtistSchema);
