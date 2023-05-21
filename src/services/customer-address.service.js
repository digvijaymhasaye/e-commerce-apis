const { CustomerAddressModel } = require('../managers').sequelizeManager;
const { errorUtils } = require('../utils');
const { getOne: getCustomer } = require('./customer.service');

const getAddressList = async ({
  account_id, customer_id, status, type, sort_by, sort_order,
}) => {
  await getCustomer({ id: customer_id });

  const where = {
    customer_id,
  };

  if (status) {
    where.status = status;
  }

  if (type) {
    where.type = type;
  }

  const order = [];
  order.push([sort_by, sort_order]);

  return CustomerAddressModel.findAll({
    where,
    order,
  });
};

const getAddress = async ({ account_id, customer_id }) => {
  await getCustomer({ id: customer_id, account_id });

  const address = await CustomerAddressModel.findOne({
    where: {
      customer_id,
      // id: address_id,
    },
  });

  if (!address) {
    errorUtils.throwNotFoundError('Address not found');
  }

  return address;
};

const getAddressById = async ({ customer_id, address_id }) => {
  const address = await CustomerAddressModel.findOne({
    where: {
      customer_id,
      id: address_id,
    },
  });

  if (!address) {
    errorUtils.throwNotFoundError('Address not found');
  }

  return address;
};

const addAddress = async ({
  account_id, customer_id, first_name, last_name, mobile_no, address_line_1, address_line_2,
  city, state, country, postal_code, type,
}) => {
  await getCustomer({ id: customer_id });

  const exitingAddress = await CustomerAddressModel.findOne({
    where: {
      customer_id,
    },
  });

  if (!exitingAddress) {
    return CustomerAddressModel.create({
      customer_id,
      first_name,
      last_name,
      mobile_no,
      address_line_1,
      address_line_2,
      city,
      state,
      country,
      postal_code,
      type,
    });
  }

  exitingAddress.first_name = first_name === undefined ? exitingAddress.first_name : first_name;
  exitingAddress.last_name = last_name === undefined ? exitingAddress.last_name : last_name;
  exitingAddress.mobile_no = mobile_no === undefined ? exitingAddress.mobile_no : mobile_no;
  exitingAddress.address_line_1 = address_line_1 === undefined ? exitingAddress.address_line_1 : address_line_1;
  exitingAddress.address_line_2 = address_line_2 === undefined ? exitingAddress.address_line_2 : address_line_2;
  exitingAddress.city = city === undefined ? exitingAddress.city : city;
  exitingAddress.state = state === undefined ? exitingAddress.state : state;
  exitingAddress.country = country === undefined ? exitingAddress.country : country;
  exitingAddress.postal_code = postal_code === undefined ? exitingAddress.postal_code : postal_code;
  exitingAddress.type = type === undefined ? exitingAddress.type : type;

  return exitingAddress.save();
};

module.exports = {
  getAddressList,
  getAddress,
  addAddress,
  getAddressById,
};
