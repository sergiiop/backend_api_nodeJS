const boom = require('@hapi/boom');

const { models } = require('../../lib/sequelize');

class OrdersService {
  constructor() {}

  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async addItem(data) {
    const newItem = await models.Order.create(data);
    return newItem;
  }

  async get() {
    const orders = await models.Order.findAll({
      include: ['customer'],
    });
    return orders;
  }

  async getOrder(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
        'items',
      ],
    });
    if (!order) throw boom.notFound('order not found');
    return order;
  }

  async update(id, changes) {
    const order = await this.getOrder(id);
    const rta = order.update(changes);
    return rta;
  }

  async delete(id) {
    const order = await this.getOrder(id);
    await order.destroy();
    return { rta: true };
  }
}

module.exports = OrdersService;
