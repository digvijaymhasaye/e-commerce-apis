const { STATUS } = require('../consts');

module.exports = (sequelize, Sequelize) => sequelize.define('product_image_map', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  product_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  image_id: {
    type: Sequelize.INTEGER,
  },
  is_default: {
    type: Sequelize.TINYINT(1),
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
