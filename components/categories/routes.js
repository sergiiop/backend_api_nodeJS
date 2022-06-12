const express = require('express');
// const faker = require('faker');

const CategoriesService = require('./service');
const validatorHandler = require('../../middlewares/validator.handler');
const {
  createCategorySchema,
  getCategorySchema,
  updateCategorySchema,
} = require('./schema');

const router = express.Router();

const service = new CategoriesService();

router.get('/', async (req, res, next) => {
  try {
    const categories = await service.get();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:categoryId',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { categoryId } = req.params;
      const category = await service.getCategory(categoryId);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({ categoryId, productId });
});

router.post(
  '/',
  validatorHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await service.create(body);
      res.status(201).json({
        message: 'Category created successfully',
        newCategory,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:categoryId',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await service.update(id, body);
      res.json({
        message: 'Category updated successfully',
        category,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:categoryId',
  validatorHandler(getCategorySchema),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.json({
        message: 'deleted',
        id,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
