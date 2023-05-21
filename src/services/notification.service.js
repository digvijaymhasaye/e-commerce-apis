// const { NotificationModel } = require('../managers/sequelize.manager');
const { getAllActiveSessions } = require('./session.service');
const { errorUtils, firebase } = require('../utils');
const { USER_TYPE } = require('../consts');

// const send = async ({
//   account_id, user_id, customer_id, title, message,
// }) => {
//   const customerActiveSessions = await getActiveSessionsByCustomerId({
//     account_id,
//     customer_id,
//   });

//   if (customerActiveSessions.length) {
//     errorUtils.throwPreconditionFailed('Customer do not have active session.');
//   }

//   const registrationTokens = [];

//   customerActiveSessions.forEach((eachActiveSession) => {
//     registrationTokens.push(eachActiveSession.device_token);
//   });

//   const messages = await firebase.messaging.sendAll({
//     title,
//     body: message,
//     registration_tokens: registrationTokens,
//   });

//   if (messages.failureCount > 0) {

//   }

// };

const sendToAdmins = async ({ account_id, title, message }) => {
  const customerActiveSessions = await getAllActiveSessions({
    account_id,
    user_type: USER_TYPE.USER,
  });

  console.info(`--------------> Active sessions = ${JSON.stringify(customerActiveSessions)}`);
  if (!customerActiveSessions.length) {
    errorUtils.throwPreconditionFailed('Customer do not have active session.');
  }

  const registrationTokens = [];

  customerActiveSessions.forEach((eachActiveSession) => {
    registrationTokens.push(eachActiveSession.device_token);
  });

  console.info(`Device tokens - ${JSON.stringify(registrationTokens)}`);
  const messages = await firebase.messaging.sendAll({
    title,
    body: message,
    registration_tokens: registrationTokens,
  });

  console.info(`messages: ${JSON.stringify(messages)}`);
  return messages;
};

module.exports = {
  // send,
  sendToAdmins,
};
