const { STATUS } = require('../consts');

module.exports = (sequelize, Sequelize) => sequelize.define('notifications', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  account_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  type: {
    type: Sequelize.INTEGER,
  },
  audience_type: {
    type: Sequelize.TINYINT(1),
  },
  audience_type_id: {
    type: Sequelize.INTEGER,
  },
  title: {
    type: Sequelize.STRING(255),
  },
  message: {
    type: Sequelize.STRING(1000),
  },
  url: {
    type: Sequelize.STRING(1000),
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
