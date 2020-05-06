const { STATUS } = require('../consts');

module.exports = (sequelize, Sequelize) => sequelize.define('coupon', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  code: {
    type: Sequelize.STRING(56),
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING(255),
  },
  start_date: {
    type: Sequelize.Date,
    allowNull: false,
  },
  end_date: {
    type: Sequelize.Date,
    allowNull: false,
  },
  is_app_only: {
    type: Sequelize.TINYINT(1),
    defaultValue: 0,
  },
  percentile: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  max_amount: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  min_amount_required: {
    type: Sequelize.INTEGER,
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
