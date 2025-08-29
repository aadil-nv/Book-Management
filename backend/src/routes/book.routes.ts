import express from 'express';
import { createBook, getAllBooks, checkoutBook } from '../controllers/book.controller';
import { authMiddleware } from '../middlewares/authMiddleware';
import { createBookValidator,checkoutBookValidator,getBooksValidator } from '../validators/bookValidators';
import { validateRequest } from '../middlewares/validateRequest';

export const bookRouter = express.Router();

bookRouter.post('/books', authMiddleware,createBookValidator,validateRequest, createBook);
bookRouter.get('/books',getBooksValidator,validateRequest, getAllBooks);
bookRouter.post('/books/:id/checkout', authMiddleware,checkoutBookValidator,validateRequest, checkoutBook);

