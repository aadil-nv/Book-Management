import express from 'express';
import { createBook, getAllBooks, checkoutBook } from '../controllers/book.controller';
import { authMiddleware } from '../middlewares/authMiddleware';
import { createBookValidator,checkoutBookValidator,getBooksValidator } from '../validators/bookValidators';

export const bookRouter = express.Router();

bookRouter.post('/books', authMiddleware,createBookValidator, createBook);
bookRouter.get('/books',getBooksValidator, getAllBooks);
bookRouter.post('/books/:id/checkout', authMiddleware,checkoutBookValidator, checkoutBook);

