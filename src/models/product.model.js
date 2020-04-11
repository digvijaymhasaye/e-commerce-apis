const { STATUS } = require('../consts');

module.exports = (sequelize, Sequelize) => sequelize.define('product', {
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
  price: {
    type: Sequelize.DECIMAL,
    defaultValue: 0,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: -1,
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
