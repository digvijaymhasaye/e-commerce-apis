const { STATUS } = require('../consts');

module.exports = (sequelize, Sequelize) => sequelize.define('coupon_audience_map', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  coupon_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  type: {
    type: Sequelize.TINYINT(1),
    allowNull: false,
    defaultValue: 0,
  },
  type_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  start_date: {
    type: Sequelize.Date,
    allowNull: false,
  },
  end_date: {
    type: Sequelize.Date,
    allowNull: false,
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
