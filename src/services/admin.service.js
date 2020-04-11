const bcrypt = require('bcrypt');
const { UserModel } = require('../models');

const SALT_ROUNDS = 10;

const findById = async (_id) => {
  const user = await UserModel.findOne({
    _id,
  });

  if (!user) {
    const error = new Error('User not found');
    error.name = 'NotFound';
    throw error;
  }

  return user;
};

const findByMobileNo = async (mobileNo) => {
  const user = await UserModel.findOne({
    mobile_no: mobileNo,
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
const signIn = async ({ mobile_no, password }) => {
  const user = await findByMobileNo(mobile_no);

  const result = bcrypt.compareSync(password, user.hash);

  if (!result) {
    return errorUtils.throwForbiddenError('Invalid password');
  }

  const accessToken = createAccessToken(user);

  const userWithoutPrivateDetails = {
    _id: user._id,
    full_name: user.full_name,
    email_id: user.email_id,
    mobile_no: user.mobile_no,
    type: user.type,
    token: accessToken,
  };

  return userWithoutPrivateDetails;
};


/**
 * Create new admin
 * @param {*} param0
 */
const createAdmin = async ({
  full_name, email_id, mobile_no, type, password, requested_by,
}) => {
  const salt = bcrypt.genSaltSync(SALT_ROUNDS);
  const hash = bcrypt.hashSync(password, salt);

  const user = await UserModel.create({
    full_name,
    email_id,
    mobile_no,
    hash,
    salt,
    type,
    requested_by,
    is_verified: false,
  });

  const accessToken = createAccessToken(user);
  const userWithoutPrivateDetails = {
    token: accessToken,
    _id: user._id,
    full_name: user.full_name,
    email: user.email,
    mobile_no: user.mobile_no,
    type: user.type,
  };
  return userWithoutPrivateDetails;
};

const getDetails = async ({ user_id }) => {

};

const changePassword = async ({ user_id, old_password, new_password }) => {

};

const resetPassword = async ({ mobile_no, password }) => {

};

module.exports = {
  signIn,
  signUp,
  getDetails,
  changePassword,
  resetPassword,
};

