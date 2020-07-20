const { STATUS } = require('../consts');

module.exports = (sequelize, Sequelize) => sequelize.define('customer_wishlist_item', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  wishlist_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  product_id: {
    type: Sequelize.INTEGER,
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
