import * as Joi from 'joi';
import { Category } from 'src/common/enums/category';

export const updateProductDtoVal = Joi.object({
  name: Joi.string().min(2).max(100).optional().messages({
    'string.min': 'Min 2 characters optional for product name',
    'string.max': 'Max 100 characters allowed for product name',
  }),

  price: Joi.number().min(1).positive().optional().messages({
    'number.min': 'Price must be at least 1',
    'number.positive': 'Price must be a positive number',
  }),

  description: Joi.string().min(2).max(255).optional().messages({
    'string.min': 'Min 2 characters optional for description',
    'string.max': 'Max 255 characters allowed for description',
  }),

  category: Joi.string()
    .valid(Category.CLOTHING, Category.ELECTRONICS, Category.FURNITURE)
    .optional()
    .messages({
      'any.only':
        'Category must be one of the following: clothing, electronics, or furniture',
    }),

  brand: Joi.string().min(2).max(50).optional().messages({
    'string.min': 'Min 2 characters optional for brand',
    'string.max': 'Max 50 characters allowed for brand',
  }),

  image_url: Joi.string().optional().uri().messages({
    'string.uri': 'Image URL must be a valid URI',
  }),

  color: Joi.string().min(2).max(30).optional().messages({
    'string.min': 'Min 2 characters optional for color',
    'string.max': 'Max 30 characters allowed for color',
  }),

  quantity: Joi.number().integer().min(0).optional().messages({
    'number.min': 'Quantity must be at least 0',
    'number.integer': 'Quantity must be an integer',
  }),

  rating: Joi.number().min(0).max(5).optional().messages({
    'number.min': 'Rating must be at least 0',
    'number.max': 'Rating must be at most 5',
  }),

  weight: Joi.string().optional().messages({
    'string.base': 'Weight must be a string',
  }),

  release_date: Joi.date().optional().messages({
    'date.base': 'Release date must be a valid date',
  }),

  warranty: Joi.string().optional().messages({
    'string.base': 'Warranty must be a string',
  }),

  discount: Joi.string().optional().messages({
    'string.base': 'Discount must be a string',
  }),
});
