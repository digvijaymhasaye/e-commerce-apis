const { STATUS } = require('../consts');

module.exports = (sequelize, Sequelize) => sequelize.define('customer', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  account_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  first_name: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  last_name: {
    type: Sequelize.STRING(255),
  },
  mobile_no: {
    type: Sequelize.STRING(10),
    allowNull: false,
  },
  is_mobile_verified: {
    type: Sequelize.TINYINT(1),
    defaultValue: 0,
  },
  otp: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  city: {
    type: Sequelize.STRING(255),
  },
  state: {
    type: Sequelize.STRING(255),
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
