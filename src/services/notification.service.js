const { NotificationModel } = require('../managers/sequelize.manager');
const { getActiveSessionsByCustomerId } = require('./session.service');
const { errorUtils, firebase } = require('../utils');

const send = async ({
  account_id, user_id, customer_id, title, message,
}) => {
  const customerActiveSessions = await getActiveSessionsByCustomerId({
    account_id,
    customer_id,
  });

  if (customerActiveSessions.length) {
    errorUtils.throwPreconditionFailed('Customer do not have active session.');
  }

  const registrationTokens = [];

  customerActiveSessions.forEach((eachActiveSession) => {
    registrationTokens.push(eachActiveSession.device_token);
  });

  const messages = await firebase.messaging.sendAll({
    title,
    body: message,
    registration_tokens: registrationTokens,
  });

  if (messages.failureCount > 0) {
    
  }

};

module.exports = {
  send,
};
