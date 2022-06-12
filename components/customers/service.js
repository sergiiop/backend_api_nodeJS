const boom = require('@hapi/boom');

// const bcrypt = require('bcrypt');

const { models } = require('../../lib/sequelize');

class CustomersService {
  constructor() {}

  async create(data) {
    //Forma manual
    // const newUser = await models.User.create(data.user);
    // const newCustomer = await models.Customer.create({
    //   ...data,
    //   userId: newUser.id,
    // });

    // forma directa, sequelice sabe que tiene una asociación por lo cual lo hace directo
    // const hash = await bcrypt.hash(data.user.password, 10);

    // const newData = {
    //   ...data,
    //   user: {
    //     ...data.user,
    //     password: hash,
    //   },
    // };
    const newCustomer = await models.Customer.create(data, {
      include: ['user'],
    });

    delete newCustomer.dataValues.user.dataValues.password;
    return newCustomer;
  }

  async find() {
    const rta = await models.Customer.findAll({
      //de esta forma agregamos la informacion de las asociasiones que tengamos, las colocamos todas en un array con el alias que le asignamos
      include: ['user'],
    });
    return rta;
  }

  async findeOne(id) {
    const customer = await models.Customer.findByPk(id);
    if (!customer) throw boom.notFound('Customer not found');
    return customer;
  }

  async update(id, changes) {
    const customer = await this.findeOne(id);
    const rta = await customer.update(changes);
    return rta;
  }

  async delete(id) {
    const customer = await this.findeOne(id);
    await customer.destroy();
    return { rta: true };
  }
}

module.exports = CustomersService;
