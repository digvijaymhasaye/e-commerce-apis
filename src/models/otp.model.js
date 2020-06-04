const { OTP_STATUS } = require('../consts');

module.exports = (sequelize, Sequelize) => sequelize.define('otp', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  account_id: {
    type: Sequelize.INTEGER,
  },
  mobile_no: {
    type: Sequelize.STRING(10),
  },
  email_id: {
    type: Sequelize.STRING(255),
  },
  otp: {
    type: Sequelize.INTEGER,
    // allowNull: false,
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
