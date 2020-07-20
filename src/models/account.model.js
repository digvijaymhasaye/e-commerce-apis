const { STATUS } = require('../consts');

module.exports = (sequelize, Sequelize) => sequelize.define('account', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING('255'),
  },
  description: {
    type: Sequelize.STRING(255),
  },
  email_id: {
    type: Sequelize.STRING(255),
  },
  mobile_no: {
    type: Sequelize.INTEGER,
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
