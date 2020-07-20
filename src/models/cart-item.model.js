const { STATUS } = require('../consts');

module.exports = (sequelize, Sequelize) => sequelize.define('cart_item', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cart_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  product_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
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
