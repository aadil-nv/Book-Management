import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
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
    ref: 'Book', // relation to Book collection
  }]
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);

