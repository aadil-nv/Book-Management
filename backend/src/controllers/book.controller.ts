import { Request, Response } from 'express';
import mongoose, { FilterQuery } from 'mongoose';
import { Book, IBook } from '../models/book.scheema';
import { AuthRequest } from '../utils/interface';
import { HttpStatusCode } from '../constants/enums';
import { MESSAGES } from '../constants/constants';

export const createBook = async (req: AuthRequest, res: Response) => {
  try {
    const { title, publishedYear, genre, stock } = req.body;
    const authorId = req.user?.id; 

    if (!authorId) {
      return res.status(HttpStatusCode.UNAUTHORIZED).json({ message: MESSAGES.UNAUTHORIZED });
    }

    const existingBook = await Book.findOne({ title: { $regex: `^${title}$`, $options: 'i' } });
    if (existingBook) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({ message: MESSAGES.BOOK_ALREADY_EXISTS_WITH_THIS_TITLE });
    }

    const book = new Book({
      title,
      author: new mongoose.Types.ObjectId(authorId),
      publishedYear,
      genre,
      stock
    });

    await book.save();
    await book.populate('author', 'username email');

    res.status(HttpStatusCode.CREATED).json(book);
  } catch (err) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: MESSAGES.SERVER_ERROR, error: err });
  }
};


export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const { genre, minYear, available, limit = '10', offset = '0' } = req.query;

    const filter: FilterQuery<IBook> = {};

    if (genre) filter.genre = String(genre);
    if (minYear) filter.publishedYear = { $gte: Number(minYear) };

    if (available === 'true') {
      filter.stock = { $gt: 0 };
    } else if (available === 'false') {
      filter.stock = { $eq: 0 }; 
    }

    const books = await Book.find(filter)
      .populate('author', 'username email')
      .skip(Number(offset))
      .limit(Number(limit));

    res.status(HttpStatusCode.OK).json(books);
  } catch (err) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: MESSAGES.SERVER_ERROR, error: err });
  }
};


export const checkoutBook = async (req: AuthRequest, res: Response) => {
  try {
    const bookId = req.params.id;
    const userId = req.user?.id;

    const book = await Book.findById(bookId);
    if (!book) return res.status(HttpStatusCode.NOT_FOUND).json({ message: MESSAGES.BOOK_NOT_FOUND });

    if (book.stock <= 0) return res.status(HttpStatusCode.BAD_REQUEST).json({ message: MESSAGES.BOOK_OUT_OF_STOCK });

    book.stock -= 1;

    if (userId) {
      book.borrowedBy.push(new mongoose.Types.ObjectId(userId));
    }

    await book.save();
    await book.populate('author', 'username email');

    res.status(HttpStatusCode.OK).json(book);
  } catch (err) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: MESSAGES.SERVER_ERROR, error: err });
  }
};
