const { STATUS } = require('../consts');

module.exports = (sequelize, Sequelize) => sequelize.define('customer_group_customer_map', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  customer_group_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  customer_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
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
