// se exporta express
const express = require('express');

// Importamos los servicios
const CustomersService = require('./service');

//Importamos el middleware de las validaciones
const validatorHandler = require('./../../middlewares/validator.handler');

// Importamos los respectivos esquemas para la validacion de datos ingresados
const {
  getCustomerSchema,
  createCustomerSchema,
  updateCustomerSchema,
} = require('./schema');

//importamos el router de express
const router = express.Router();

// creamos una instancia de la clase de los servicios
const service = new CustomersService();

//obtener todos los customers
router.get('/', async (req, res, next) => {
  try {
    res.json(await service.find());
  } catch (error) {
    next(error);
  }
});

//Obtener un customer
router.get(
  '/:customerId',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { customerId } = req.params;
      const customer = await service.findeOne(customerId);
      res.json(customer);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const data = req.body;
      const newCustomer = await service.create(data);
      res.status(201).json({
        message: 'Customer created successfully',
        newCustomer,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:customerId',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { customerId } = req.params;
      const data = req.body;
      const customer = await service.update(customerId, data);
      res.json({
        message: 'Customer updated successfully',
        customer,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:customerId',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { customerId } = req.params;
      const rta = await service.delete(customerId);
      res.status(200).json({
        message: 'Customer deleted successfully',
        rta,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
