const { Model, DataTypes, Sequelize } = require('sequelize');

const { USER_TABLE } = require('../users/model');

const CUSTOMERS_TABLE = 'customers';

/**
 * @description description of each field in the table
 * @typedef {Object} field definition
 * @property {boolean} allowNull - false=NOT NULL
 * @property {boolean} autoIncrement - each insert, increase the counter
 * @property {boolean} primaryKey - define is primary key
 * @property {boolean} type - expresion to match SQL type
 * @property {boolean} unique - difne as unique the field
 * @property {boolean} field - rename the field
 */

//Definicion de el esquema que van a tener los campos de la tabla customers
const CustomerSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  firstName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'first_name',
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'last_name',
  },
  phone: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'updated_at',
    defaultValue: Sequelize.NOW,
  },
  //Como estamos agregando un nuevo campo al final de todo, tenemos que agregarle un schema
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    //le indicamos que es llave foranea
    reference: {
      model: USER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

class Customer extends Model {
  // Para hacer una asociación se reciben los modelos
  static associate(models) {
    // "this.belongsTo()" indicara que esta clase(Customer) tendra una relación
    // este metodo recibe con que modelo lo vamos a relacionar
    // si queremos agregarle un alias lo hacemos como segundo argumento un objeto con "as" y el alias
    this.belongsTo(models.User, { as: 'user' });

    //de esta forma estamos asociando la tabla customer con la de user, es decir que la fk estara en la tabla customer
    this.hasMany(models.Order, {
      as: 'orders',
      foreignKey: 'customer_id',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CUSTOMERS_TABLE,
      modelName: 'Customer',
      timestamp: false,
    };
  }
}

module.exports = { CUSTOMERS_TABLE, CustomerSchema, Customer };
