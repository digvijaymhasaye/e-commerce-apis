const { STATUS } = require('../consts');

module.exports = (sequelize, Sequelize) => sequelize.define('offer', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
    defaultValue: new Date(),
    allowNull: false,
  },
  end_date: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  type: {
    type: Sequelize.TINYINT(1),
    allowNull: false,
    defaultValue: 0,
  },
  type_id: {
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
