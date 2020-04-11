const jwt = require('jsonwebtoken');
const config = require('../config');
const { UserModel } = require('../managers').sequelizeManager;

const sign = async ({ payload }) => {
  const reformattedPayload = JSON.parse(JSON.stringify(payload));
  const accessToken = jwt.sign(reformattedPayload, config.AUTH_KEY, { expiresIn: '1d' });
  return accessToken;
};

const verify = async ({ token }) => {
  const decodedToken = jwt.verify(token, config.AUTH_KEY);

  const user = await UserModel.findById(decodedToken.id);

  if (!user) {
    const error = new Error('Unauthorised');
    error.name = 'Unauthorised';
    throw error;
  }
};

module.exports = {
  sign,
  verify,
};
