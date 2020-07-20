const { STATUS } = require('../consts');

module.exports = (sequelize, Sequelize) => sequelize.define('category', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  account_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  image_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  name: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  description: {
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
