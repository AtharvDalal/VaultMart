import * as Joi from 'joi';
import { Category } from 'src/common/enums/category';

export const createProduct = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    'string.min': 'Min 2 characters required for product name',
    'string.max': 'Max 100 characters allowed for product name',
  }),

  price: Joi.number().min(1).positive().required().messages({
    'number.min': 'Price must be at least 1',
    'number.positive': 'Price must be a positive number',
  }),

  description: Joi.string().min(2).max(255).required().messages({
    'string.min': 'Min 2 characters required for description',
    'string.max': 'Max 255 characters allowed for description',
  }),

  category: Joi.string()
    .valid(Category.CLOTHING, Category.ELECTRONICS, Category.FURNITURE)
    .required()
    .messages({
      'any.only':
        'Category must be one of the following: clothing, electronics, or furniture',
    }),

  brand: Joi.string().min(2).max(50).required().messages({
    'string.min': 'Min 2 characters required for brand',
    'string.max': 'Max 50 characters allowed for brand',
  }),

  image_url: Joi.string().optional().uri().messages({
    'string.uri': 'Image URL must be a valid URI',
  }),

  color: Joi.string().min(2).max(30).required().messages({
    'string.min': 'Min 2 characters required for color',
    'string.max': 'Max 30 characters allowed for color',
  }),

  quantity: Joi.number().integer().min(0).required().messages({
    'number.min': 'Quantity must be at least 0',
    'number.integer': 'Quantity must be an integer',
  }),

  rating: Joi.number().min(0).max(5).required().messages({
    'number.min': 'Rating must be at least 0',
    'number.max': 'Rating must be at most 5',
  }),

  weight: Joi.string().required().messages({
    'string.base': 'Weight must be a string',
  }),

  release_date: Joi.date().required().messages({
    'date.base': 'Release date must be a valid date',
  }),

  warranty: Joi.string().required().messages({
    'string.base': 'Warranty must be a string',
  }),

  discount: Joi.string().optional().messages({
    'string.base': 'Discount must be a string',
  }),
});
