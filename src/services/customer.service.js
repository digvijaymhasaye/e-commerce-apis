const { CustomerModel } = require('../managers').sequelizeManager;
const { errorUtils } = require('../utils');
const { sign } = require('./jwt.service');
const { USER_TYPE } = require('../consts');

const getOne = async ({ id }) => {
  const customer = await CustomerModel.findOne({
    where: {
      id,
    },
  });

  if (!customer) {
    errorUtils.throwNotFoundError('Customer not found');
  }

  return customer;
};

const signIn = async () => {

};

const signUp = async ({
  account_id, first_name, last_name, mobile_no, user_agent, app_version,
}) => {
  const existingUser = await CustomerModel.findOne({
    where: {
      mobile_no,
    },
  });

  if (existingUser) {
    errorUtils.throwConflictError('User with same mobile number already exist');
  }

  const customer = await CustomerModel.create({
    account_id,
    first_name,
    last_name,
    mobile_no,
  });

  const session = await sign({
    app_version,
    user_type: USER_TYPE.CUSTOMER,
    device_info: user_agent,
    ...customer.dataValues,
  });
  return {
    ...customer.dataValues,
    session,
  };
};

module.exports = {
  getOne,
  signUp,
  signIn,
};
