const Joi = require('joi');

const id = Joi.number().integer();
const firstName = Joi.string().min(5).max(15);
const lastName = Joi.string().min(5).max(15);
const phone = Joi.string().min(10).max(10);

const { createUserSchema, updateUserSchema } = require('./../users/schema');

const getCustomerSchema = Joi.object({
  customerId: id.required(),
});

const createCustomerSchema = Joi.object({
  firstName: firstName.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  user: createUserSchema.required(),
});

const updateCustomerSchema = Joi.object({
  firstName,
  lastName,
  phone,
  updateUserSchema,
});

module.exports = {
  createCustomerSchema,
  updateCustomerSchema,
  getCustomerSchema,
};
