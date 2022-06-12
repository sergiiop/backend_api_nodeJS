const Joi = require('joi');

const id = Joi.number().integer();
// const firstName = Joi.string().min(5).max(15);
// const secondName = Joi.string().min(5).max(15);
const email = Joi.string().email();
const password = Joi.string().min(8);
const role = Joi.string().min(5);

//Para crear un producto necesitamos un name y un precio requeridos
const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role: role,
});

//Para actualizar un producto necesitamos el nombre y el precio a actualizar pero no son requeridos
const updateUserSchema = Joi.object({
  // firstName: firstName,
  // secondName: secondName,
  email: email,
  password: password,
  role: role,
});

//Para hacer un get necesitamos el id del producto a retornar por lo cual es requerido
const getUserSchema = Joi.object({
  userId: id.required(),
});

module.exports = {
  createUserSchema,
  getUserSchema,
  updateUserSchema,
};
