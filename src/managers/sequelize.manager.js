const Sequelize = require('sequelize');
const {
  product,
  category,
} = require('../models');
const config = require('../config');

const sequelize = new Sequelize(config.MYSQL_DB_NAME, config.MYSQL_USERNAME, config.MYSQL_PASSWORD, {
  host: config.MYSQL_HOST,
  dialect: 'mysql',
  logging: true,
  dialectOptions: {
    charset: 'utf8mb4',
  },
  define: {
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true,
  },
});

sequelize.sync();

const ProductModel = product(sequelize, Sequelize);
const CategoryModel = category(sequelize, Sequelize);

module.exports = {
  sequelize,
  ProductModel,
  CategoryModel,
};
