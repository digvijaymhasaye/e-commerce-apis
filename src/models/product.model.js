const { STATUS } = require('../consts');

module.exports = (sequelize, Sequelize) => sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  account_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  category_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING(255),
  },
  price: {
    type: Sequelize.DECIMAL,
    defaultValue: 0,
    allowNull: false,
  },
  base_quantity: {
    type: Sequelize.INTEGER,
  },
  unit: {
    type: Sequelize.STRING(56),
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: -1,
    allowNull: true,
  },
  image_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  status: {
    type: Sequelize.TINYINT(1),
    allowNull: false,
    defaultValue: STATUS.ENABLED,
  },
  deleted: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});
