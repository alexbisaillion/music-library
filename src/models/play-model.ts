import { Track } from './track-model';
import { model, Schema, Document, Types } from 'mongoose';

export interface Play extends Document {
  _id: Types.ObjectId;
  track: Types.ObjectId | Track;
  timestamp: number;
}

const PlaySchema = new Schema({
  track: { type: Schema.Types.ObjectId, ref: 'Track', required: true },
  timestamp: { type: Number, required: true, unique: true }
});

export const PlayModel = model<Play>('Play', PlaySchema);
