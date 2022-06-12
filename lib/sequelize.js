const { Sequelize } = require('sequelize');

const { config } = require('../config/config');
const setupModels = require('../db/models/index');

const options = {
  dialect: 'postgres',
  loggin: config.isProd ? false : (msg) => console.log(msg),
};

if (config.isProd) {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

// Se crea una instancia para realizar la conexion
const sequelize = new Sequelize(config.dbUrl, options);

setupModels(sequelize);

// sequelize.sync();

module.exports = sequelize;
