const { STATUS, ADDRESS_TYPE } = require('../consts');

module.exports = (sequelize, Sequelize) => sequelize.define('customer_address', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  customer_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  first_name: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  last_name: {
    type: Sequelize.STRING(255),
  },
  mobile_no: {
    type: Sequelize.STRING(10),
    allowNull: false,
  },
  address_line_1: {
    type: Sequelize.STRING(255),
  },
  address_line_2: {
    type: Sequelize.STRING(255),
  },
  city: {
    type: Sequelize.STRING(255),
  },
  postal_code: {
    type: Sequelize.STRING(15),
  },
  state: {
    type: Sequelize.STRING(255),
  },
  country: {
    type: Sequelize.INTEGER,
  },
  type: {
    type: Sequelize.TINYINT(1),
    defaultValue: ADDRESS_TYPE.BOTH,
  },
  is_default: {
    type: Sequelize.TINYINT(1),
    defaultValue: 1,
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
