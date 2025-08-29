import mongoose, { Document, Types } from 'mongoose';

export interface IBook extends Document {
  title: string;
  author: Types.ObjectId; 
  publishedYear?: number;
  genre?: string;
  stock: number;
  borrowedBy: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const bookSchema = new mongoose.Schema<IBook>({
  title: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  publishedYear: { type: Number },
  genre: { type: String },
  stock: { type: Number, required: true, min: 0 },
  borrowedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

export const Book = mongoose.model<IBook>('Book', bookSchema);
