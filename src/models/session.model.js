const { STATUS } = require('../consts');

module.exports = (sequelize, Sequelize) => sequelize.define('session', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_type: {
    type: Sequelize.TINYINT(1),
    allowNull: false,
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  app_version: {
    type: Sequelize.STRING(11),
  },
  token: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  device_info: {
    type: Sequelize.JSON,
    allowNull: false,
  },
  device_token: {
    type: Sequelize.STRING(1000),
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
