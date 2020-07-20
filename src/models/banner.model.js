const { STATUS } = require('../consts');

module.exports = (sequelize, Sequelize) => sequelize.define('banner', {
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
    type: Sequelize.TINYINT(1),
  },
  type_id: {
    type: Sequelize.INTEGER,
  },
  name: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING(255),
  },
  start_date: {
    type: Sequelize.DATE,
  },
  end_date: {
    type: Sequelize.DATE,
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
