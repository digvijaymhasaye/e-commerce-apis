const { STATUS } = require('../consts');

module.exports = (sequelize, Sequelize) => sequelize.define('user', {
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
    allowNull: false,
  },
  email_id: {
    type: Sequelize.STRING(255),
    allowNull: true,
  },
  mobile_no: {
    type: Sequelize.STRING(10),
    allowNull: false,
  },
  image_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  hash: {
    type: Sequelize.STRING(255),
    allowNull: true,
  },
  salt: {
    type: Sequelize.STRING(255),
    allowNull: true,
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
