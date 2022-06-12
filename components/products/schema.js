const Joi = require('joi');

const id = Joi.number().integer();
const productName = Joi.string().min(3).max(15);
const description = Joi.string().min(10);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();
const categoryId = Joi.number().integer();

const price_min = Joi.number().integer();
const price_max = Joi.number().integer();

const limit = Joi.number().integer();
const offset = Joi.number().integer();

//Para crear un producto necesitamos un name y un precio requeridos
const createProductSchema = Joi.object({
  productName: productName.required(),
  description: description.required(),
  price: price.required(),
  image: image.required(),
  categoryId: categoryId.required(),
});

//Para actualizar un producto necesitamos el nombre y el precio a actualizar pero no son requeridos
const updateProductSchema = Joi.object({
  productName,
  description,
  price,
  image,
  categoryId,
});

//Para hacer un get necesitamos el id del producto a retornar por lo cual es requerido
const getProductSchema = Joi.object({
  id: id.required(),
});

const queryProductSchema = Joi.object({
  limit,
  offset,
  price,
  price_min,
  price_max: price_max.when('price_min', {
    is: Joi.number().integer().required(),
    then: Joi.required(),
  }),
});

module.exports = {
  createProductSchema,
  getProductSchema,
  updateProductSchema,
  queryProductSchema,
};
