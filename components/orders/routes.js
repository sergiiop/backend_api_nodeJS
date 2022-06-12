const express = require('express');

const OrdersService = require('./service');

const validatorHandler = require('./../../middlewares/validator.handler');
const {
  createOrderSchema,
  getOrderSchema,
  addItemSchema,
} = require('./schema');

const router = express.Router();
const service = new OrdersService();

router.get('/', async (req, res, next) => {
  try {
    const orders = await service.get();
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:idOrder',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { idOrder } = req.params;
      const order = await service.getOrder(idOrder);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newOrder = await service.create(body);
      res.status(201).json({
        message: 'Order created successfully',
        newOrder,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/add-item',
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newOrder = await service.addItem(body);
      res.status(201).json({
        message: 'Order created successfully',
        newOrder,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const order = service.update(id, body);
  res.json({
    message: 'Order update successfully',
    order,
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const rta = service.delete(id);
  res.json({
    message: 'Order deleted successfully',
    rta,
  });
});

module.exports = router;
