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
  email_id: {
    type: Sequelize.STRING(255),
    allowNull: true,
  },
  mobile_no: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  hash: {
    type: Sequelize.STRING(255),
    allowNull: true,
  },
  salt: {
    type: Sequelize.STRING(255),
    allowNull: true,
  },
  otp: {
    type: Sequelize.INTEGER(255),
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
