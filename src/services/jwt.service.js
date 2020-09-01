const jwt = require('jsonwebtoken');
const { v4: uuid } = require('uuid');
const config = require('../config');
const { addSession } = require('./session.service');

const sign = async (payload) => {
  console.info(`JWT Service - Sign - Payload: ${JSON.stringify(payload)}`);
  const reformattedPayload = JSON.parse(JSON.stringify(payload));

  const sessionId = await uuid();

  reformattedPayload.type = payload.user_type;
  reformattedPayload.session_id = sessionId;

  // console.info(`JWT Service - Sign - Reformatted Payload: ${JSON.stringify(reformattedPayload)}`);
  const accessToken = jwt.sign(reformattedPayload, config.AUTH_KEY, { expiresIn: '30d' });
  const session = await addSession({
    id: sessionId,
    user_id: payload.user_id,
    user_type: payload.user_type,
    device_info: payload.device_info,
    device_token: payload.device_token,
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
