const express = require('express');

const UsersService = require('./service');
const validatorHandler = require('../../middlewares/validator.handler');

const {
  getUserSchema,
  createUserSchema,
  updateUserSchema,
} = require('./schema');

const router = express.Router();
const service = new UsersService();

router.get('/', async (req, res) => {
  const users = await service.find();
  res.json(users);
});

router.get(
  '/:userId',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await service.findOne(userId);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.create(body);
      res.status(201).json({
        message: 'User created successfully',
        newUser,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:userId',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const body = req.body;
      const user = await service.update(userId, body);
      res.json({
        message: 'User updated successfully',
        user,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:userId',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const rta = await service.delete(userId);
      res.json({
        message: 'User deleted successfully',
        rta,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
