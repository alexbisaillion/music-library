import { model, Schema, Document, Types } from 'mongoose';

export interface Artist extends Document {
  _id: Types.ObjectId;
  name: string;
  spotifyIds: string[];
  releases: Types.ObjectId[];
}

const ArtistSchema = new Schema({
  name: { type: String, required: true },
  spotifyIds: { type: [String] },
  releases: { type: [Schema.Types.ObjectId], ref: 'Release', required: true }
});

export const ArtistModel = model<Artist>('Artist', ArtistSchema);
