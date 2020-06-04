const jwt = require('jsonwebtoken');
const config = require('../config');
const { addSession } = require('./session.service');

const sign = async (payload) => {
  console.info(`JWT Service - Sign - Payload: ${JSON.stringify(payload)}`);
  const reformattedPayload = JSON.parse(JSON.stringify(payload));
  reformattedPayload.type = payload.user_type;
  console.info(`JWT Service - Sign - Reformatted Payload: ${JSON.stringify(reformattedPayload)}`);
  const accessToken = jwt.sign(reformattedPayload, config.AUTH_KEY, { expiresIn: '1d' });
  const session = await addSession({
    user_id: payload.id,
    user_type: payload.user_type,
    device_info: payload.device_info,
    app_version: payload.app_version,
    token: accessToken,
  });
  return session;
};

const verify = async (token) => jwt.verify(token, config.AUTH_KEY);

module.exports = {
  sign,
  verify,
};
