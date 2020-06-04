const bcrypt = require('bcrypt');
const {
  UserModel,
} = require('../managers').sequelizeManager;
const { errorUtils } = require('../utils');
const { sign } = require('./jwt.service');
const { USER_TYPE } = require('../consts');

const SALT_ROUNDS = 10;

// const findById = async (_id) => {
//   const user = await UserModel.findOne({
//     _id,
//   });

//   if (!user) {
//     const error = new Error('User not found');
//     error.name = 'NotFound';
//     throw error;
//   }

//   return user;
// };

const findByEmailId = async (email_id) => {
  const user = await UserModel.findOne({
    where: {
      email_id,
    },
  });

  if (!user) {
    const error = new Error('User not found');
    error.name = 'NotFound';
    throw error;
  }

  return user;
};

/**
 * Sign-in admin into system
 * @param {*} param0
 */
const signIn = async ({
  email_id, password, app_version, user_agent,
}) => {
  const user = await findByEmailId(email_id);

  const result = bcrypt.compareSync(password, user.hash);

  if (!result) {
    return errorUtils.throwForbiddenError('Invalid password');
  }

  const session = await sign({
    app_version,
    user_type: USER_TYPE.USER,
    device_info: user_agent,
    ...user.dataValues,
  });

  const userWithoutPrivateDetails = {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email_id: user.email_id,
    mobile_no: user.mobile_no,
    account_id: user.account_id,
    image_id: user.image_id,
    status: user.status,
    created_at: user.created_at,
    updated_at: user.updated_at,
    session,
  };

  return userWithoutPrivateDetails;
};


/**
 * Create new admin
 * @param {*} param0
 */
const addOne = async ({
  first_name, last_name, email_id, mobile_no, account_id, image_id, password,
  user_agent, app_version,
}) => {
  const salt = bcrypt.genSaltSync(SALT_ROUNDS);
  const hash = bcrypt.hashSync(password, salt);

  const user = await UserModel.create({
    first_name,
    last_name,
    email_id,
    mobile_no,
    hash,
    salt,
    account_id,
    image_id,
  });

  const session = await sign({
    app_version,
    user_type: USER_TYPE.USER,
    device_info: user_agent,
    ...user.dataValues,
  });

  const userWithoutPrivateDetails = {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email_id: user.email_id,
    mobile_no: user.mobile_no,
    account_id: user.account_id,
    image_id: user.image_id,
    status: user.status,
    created_at: user.created_at,
    updated_at: user.updated_at,
    session,
  };
  return userWithoutPrivateDetails;
};

// const getDetails = async ({ user_id }) => {

// };

// const changePassword = async ({ user_id, old_password, new_password }) => {

// };

// const resetPassword = async ({ mobile_no, password }) => {

// };

const getOne = async ({ id }) => {
  const user = await UserModel.findOne({
    where: {
      id,
    },
  });
  console.info(`User = ${JSON.stringify(user)}`);
  if (!user) {
    const error = new Error('User not found');
    error.name = 'NotFound';
    throw error;
  }

  return user;
};

module.exports = {
  signIn,
  addOne,
  getOne,
};
