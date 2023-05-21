const { STATUS } = require('../consts');

module.exports = (sequelize, Sequelize) => sequelize.define('payment', {
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
  order_id: {
    type: Sequelize.INTEGER,
  },
  payer_type: {
    type: Sequelize.TINYINT(1),
  },
  payer_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  rzp_payment_method: {
    type: Sequelize.STRING(16),
  },
  rzp_order_id: {
    type: Sequelize.STRING(40),
  },
  rzp_payment_id: {
    type: Sequelize.STRING(40),
  },
  entity: {
    type: Sequelize.STRING(56),
  },
  amount: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  payment_capture: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  amount_paid: {
    type: Sequelize.INTEGER,
    defaultValue: false,
  },
  amount_due: {
    type: Sequelize.INTEGER,
    defaultValue: false,
  },
  currency: {
    type: Sequelize.STRING(3),
    defaultValue: 'INR',
  },
  receipt: {
    type: Sequelize.STRING(40),
  },
  offer_id: {
    type: Sequelize.INTEGER,
  },
  rzp_status: {
    type: Sequelize.STRING(11),
  },
  attempts: {
    type: Sequelize.INTEGER,
  },
  notes: {
    type: Sequelize.STRING(255),
  },
  rzp_created_at: {
    type: Sequelize.INTEGER(11),
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
