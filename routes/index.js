const express = require('express');

const productsRouter = require('../components/products/routes');
const usersRouter = require('../components/users/routes');
const categoriesRouter = require('../components/categories/routes');
const ordersRouter = require('../components/orders/routes');
const customersRouter = require('../components/customers/routes');
const authRouter = require('./auth');

const routerApi = (app) => {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/users', usersRouter);
  router.use('/customers', customersRouter);
  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
  router.use('/orders', ordersRouter);
  router.use('/auth', authRouter);
};

module.exports = routerApi;
