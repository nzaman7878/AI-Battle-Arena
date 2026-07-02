import mongoose, { Document, Schema } from 'mongoose';
import type { IUser } from './user.model.js';

export interface IBattle extends Document {
  userId: mongoose.Types.ObjectId | IUser;
  problem: string;
  solution_1: string;
  solution_2: string;
  judge: {
    solution_1_score: number;
    solution_2_score: number;
    solution_1_reasoning: string;
    solution_2_reasoning: string;
  };
  createdAt: Date;
}

const battleSchema = new Schema<IBattle>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  problem: { type: String, required: true },
  solution_1: { type: String, required: true },
  solution_2: { type: String, required: true },
  judge: {
    solution_1_score: { type: Number, required: true },
    solution_2_score: { type: Number, required: true },
    solution_1_reasoning: { type: String, required: true },
    solution_2_reasoning: { type: String, required: true },
  },
  createdAt: { type: Date, default: Date.now },
});

export const Battle = mongoose.model<IBattle>('Battle', battleSchema);
