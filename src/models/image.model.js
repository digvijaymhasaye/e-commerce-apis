const { STATUS } = require('../consts');

module.exports = (sequelize, Sequelize) => sequelize.define('image', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  type: {
    type: Sequelize.TINYINT(1),
    allowNull: false,
    defaultValue: 0,
  },
  type_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  description: {
    type: Sequelize.STRING(255),
  },
  url: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  size: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  uploaded_by: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  is_copy: {
    type: Sequelize.TINYINT(1),
    allowNull: false,
    defaultValue: 0,
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
