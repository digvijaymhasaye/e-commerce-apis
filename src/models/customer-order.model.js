const { STATUS, ORDER_STATUS } = require('../consts');

module.exports = (sequelize, Sequelize) => sequelize.define('customer_order', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  account_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  customer_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  cart_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  session_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  items_count: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: 0,
  },
  total_price: {
    type: Sequelize.DECIMAL,
    defaultValue: 0,
    allowNull: false,
  },
  delivery_type: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
  notes: {
    type: Sequelize.STRING(255),
    allowNull: true,
  },
  status: {
    type: Sequelize.TINYINT(1),
    allowNull: false,
    defaultValue: ORDER_STATUS.INITIATED,
  },
  deleted: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});
