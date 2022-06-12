const Joi = require('joi');

const id = Joi.number().integer();
const nameCategory = Joi.string().min(4).max(20);
const image = Joi.string().uri();

const getCategorySchema = Joi.object({
  categoryId: id,
});

const createCategorySchema = Joi.object({
  nameCategory: nameCategory.required(),
  image: image.required()
});

const updateCategorySchema = Joi.object({
  nameCategory,
  image,
});


module.exports = {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
};
