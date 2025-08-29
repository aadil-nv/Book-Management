import express from 'express';
import { createBook, getAllBooks, checkoutBook } from '../controllers/book.controller';
import { authMiddleware } from '../middlewares/authMiddleware';
import { createBookValidator,checkoutBookValidator,getBooksValidator } from '../validators/bookValidators';
import { validateRequest } from '../middlewares/validateRequest';

export const bookRouter = express.Router();

bookRouter.post('/', authMiddleware,createBookValidator,validateRequest, createBook);
bookRouter.get('/',getBooksValidator,validateRequest, getAllBooks);
bookRouter.post('/:id/checkout', authMiddleware,checkoutBookValidator,validateRequest, checkoutBook);

