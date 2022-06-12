// archivo para inicializar todos los modelos y agregarles la configuración
const { User, UserSchema } = require('../../components/users/model');

const {
  Customer,
  CustomerSchema,
} = require('../../components/customers/model');

const {
  Category,
  CategorySchema,
} = require('../../components/categories/model');
const { Product, ProductSchema } = require('../../components/products/model');
const { Order, OrderSchema } = require('../../components/orders/model');
const { OrderProduct, OrderProductSchema } = require('./order_product');

function setupModels(sequelize) {
  //Inicializaciónes
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize));
  //Luego de las inicializaciónes vienen las asociaciones
  // lo hacemos con el metodo associate y le pasamos como parametros los modelos, en sequelize estan en sequelize.models
  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
  Category.associate(sequelize.models);
  Product.associate(sequelize.models);
  Order.associate(sequelize.models);
}

module.exports = setupModels;
