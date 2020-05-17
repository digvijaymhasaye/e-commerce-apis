const jwt = require('jsonwebtoken');
const config = require('../config');
const { UserModel } = require('../managers').sequelizeManager;
const { errorUtils } = require('../utils');

const sign = (payload) => {
  const reformattedPayload = JSON.parse(JSON.stringify(payload));
  const accessToken = jwt.sign(reformattedPayload, config.AUTH_KEY, { expiresIn: '1d' });
  return accessToken;
};

const verify = async (token) => {
  const decodedToken = jwt.verify(token, config.AUTH_KEY);

  const user = await UserModel.findOne({
    where: {
      id: decodedToken.id,
    },
  });

  if (!user) {
    errorUtils.throwNotFoundError('User not found');
  }

  return user;
};

module.exports = {
  sign,
  verify,
};
