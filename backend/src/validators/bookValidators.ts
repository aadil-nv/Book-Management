import { body, query, param } from 'express-validator';

export const createBookValidator = [
  body('title')
    .notEmpty().withMessage('Title is required')
    .isString().withMessage('Title must be a string'),
  
  body('author')
    .notEmpty().withMessage('Author is required')
    .isString().withMessage('Author must be a string'),
  
  body('publishedYear')
    .optional()
    .isInt({ min: 0, max: new Date().getFullYear() })
    .withMessage('Published year must be a valid year'),
  
  body('genre')
    .optional()
    .isString().withMessage('Genre must be a string'),
  
  body('stock')
    .notEmpty().withMessage('Stock is required')
    .isInt({ min: 0 }).withMessage('Stock must be a positive integer'),
];

export const getBooksValidator = [
  query('genre').optional().isString().withMessage('Genre must be a string'),
  query('author').optional().isString().withMessage('Author must be a string'),
  query('minYear').optional().isInt({ min: 0 }).withMessage('Min year must be a positive number'),
  query('available').optional().isBoolean().withMessage('Available must be true or false'),
  query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive number'),
  query('offset').optional().isInt({ min: 0 }).withMessage('Offset must be zero or positive'),
];

export const checkoutBookValidator = [
  param('id').notEmpty().withMessage('Book ID is required')
    .isMongoId().withMessage('Invalid Book ID')
];
