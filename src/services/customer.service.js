const { CustomerModel } = require('../managers').sequelizeManager;
const { errorUtils } = require('../utils');
const { sign } = require('./jwt.service');
const { USER_TYPE } = require('../consts');
const { deleteSession } = require('./session.service');

const getOne = async ({ id }) => {
  console.info(`Customer.service -- getOne() -- id = ${id}`);
  const customer = await CustomerModel.findOne({
    where: {
      id,
    },
  });

  console.info(`Customer.service -- getOne() -- customer = ${JSON.stringify(customer)}`);
  if (!customer) {
    errorUtils.throwNotFoundError('Customer not found');
  }

  return customer;
};

const getCustomerByMobileNo = async ({ mobile_no, account_id }) => CustomerModel.findOne({
  where: {
    account_id,
    mobile_no,
  },
});

const signIn = async ({
  account_id, mobile_no, app_version, user_agent, device_token,
}) => {
  const customer = await getCustomerByMobileNo({ account_id, mobile_no });

  if (!customer) {
    errorUtils.throwNotFoundError('Customer not found');
  }

  // const savedOtp = await getByMobileNoOtp({ account_id, mobile_no, otp });


  // console.log(savedOtp);
  // if (savedOtp.status !== OTP_STATUS.VERIFIED) {
  //   errorUtils.throwPreconditionFailed('OTP is not verified');
  // }

  const session = await sign({
    app_version,
    user_type: USER_TYPE.CUSTOMER,
    device_info: user_agent,
    device_token,
    user_id: customer.dataValues.id,
  });

  return {
    ...customer.dataValues,
    session: {
      id: session.id,
      token: session.token,
    },
  };
};

const signUp = async ({
  account_id, first_name, last_name, mobile_no, user_agent, app_version, device_token,
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
    device_token,
    user_type: USER_TYPE.CUSTOMER,
    device_info: user_agent,
    user_id: customer.id,
  });
  return {
    ...customer.dataValues,
    session,
  };
};

const signOut = async ({ account_id, customer_id, session_id }) => deleteSession({
  session_id,
  user_id: customer_id,
  user_type: USER_TYPE.CUSTOMER,
});

module.exports = {
  getOne,
  signUp,
  signIn,
  signOut,
};
