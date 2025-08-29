import mongoose, { Document, Types } from 'mongoose';

// --- TypeScript interface for User ---
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  borrowedBooks: Types.ObjectId[]; // Array of Book IDs
  createdAt: Date;
  updatedAt: Date;
}

// --- Mongoose Schema ---
const userSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  borrowedBooks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
  }],
}, { timestamps: true });

// --- Model ---
export const User = mongoose.model<IUser>('User', userSchema);
