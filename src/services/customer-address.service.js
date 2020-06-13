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
  await getCustomer({ id: customer_id });

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

const addAddress = async ({
  account_id, customer_id, first_name, last_name, mobile_no, address_line_1, address_line_2,
  city, state, country, postal_code, type,
}) => {
  await getCustomer({ id: customer_id });

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
};

module.exports = {
  getAddressList,
  getAddress,
  addAddress,
};
