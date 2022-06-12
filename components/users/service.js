const boom = require('@hapi/boom');

// const bcrypt = require('bcrypt');

const { models } = require('../../lib/sequelize');

class UsersService {
  constructor() {
    // this.users = [];
    // this.generate();
    // this.pool = pool;
    // this.pool.on('error', (err) => console.error(err));
  }

  // generate() {
  //   const limit = 5;
  //   for (let index = 0; index < limit; index++) {
  //     this.users.push({
  //       id: faker.datatype.uuid(),
  //       firstName: faker.name.firstName(),
  //       secondName: faker.name.lastName(),
  //       email: faker.internet.email(),
  //       phone: faker.phone.phoneNumber(),
  //     });
  //   }
  // }

  async create(data) {
    // const { firstName, secondName, email, phone } = data;
    // const newUser = {
    //   id: faker.datatype.uuid(),
    //   firstName,
    //   secondName,
    //   email,
    //   phone,
    // };
    // this.users.push(newUser);
    // const hash = await bcrypt.hash(data.password, 10);
    const newUser = await models.User.create(data);
    //   ...data,
    //   password: hash,
    // });

    //sequelize controla los datos en dataValue
    delete newUser.dataValues.password;

    return newUser;
  }

  async find() {
    // const query = 'SELECT * FROM users';
    // sequelize retorna la informacion en un array
    // en la primer posicion esta la data y la segunda la metadata(más informacion del query)
    const rta = await models.User.findAll({
      include: ['customer'],
    });
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(rta);
      }, 2000);
    });
  }

  async findByEmail(email) {
    const user = await models.User.findOne({
      where: { email },
    });
    return user;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) throw boom.notFound('User not found');
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    // const user = this.users[index];
    // this.users[index] = {
    //   ...user,
    //   ...changes,
    // };

    // return this.users[index];
    return rta;
  }

  async delete(id) {
    // const index = this.users.findIndex((user) => user.id === id);
    // if (index === -1) throw boom.notFound('Product not found');

    // this.users.splice(index, 1);
    const user = await this.findOne(id);
    await user.destroy();
    return { rta: true };
  }
}

module.exports = UsersService;
