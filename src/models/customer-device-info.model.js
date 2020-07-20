const { OTP_STATUS } = require('../consts');

module.exports = (sequelize, Sequelize) => sequelize.define('customer_device_info', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  account_id: {
    type: Sequelize.INTEGER,
  },
  customer_id: {
    type: Sequelize.STRING(10),
  },
  app_version: {
    type: Sequelize.STRING(255),
  },
  device_token: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  status: {
    type: Sequelize.TINYINT(1),
    allowNull: false,
    defaultValue: OTP_STATUS.SENT,
  },
  deleted: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});
