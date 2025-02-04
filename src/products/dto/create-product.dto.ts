import * as Joi from 'joi';
import { Category } from 'src/common/enums/category';

// Joi validation schema with correct message usage
export const createProduct = Joi.object({
  productname: Joi.string().min(2).max(100).required().messages({
    'string.min': 'Min 2 characters required for product name',
    'string.max': 'Max 100 characters allowed for product name',
  }),

  desc: Joi.string().min(2).max(50).required().messages({
    'string.min': 'Min 2 characters required for description',
    'string.max': 'Max 50 characters allowed for description',
  }),

  price: Joi.number().min(1).positive().required().messages({
    'number.min': 'Price must be at least 1',
    'number.positive': 'Price must be a positive number',
  }),

  category: Joi.string()
    .valid(Category.CLOTHING, Category.ELECTRONICS, Category.FURNITURE)
    .required()
    .messages({
      'any.only':
        'Category must be one of the following: clothing, electronics, or furniture',
    }),
});
