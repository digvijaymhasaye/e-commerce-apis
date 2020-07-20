const { messaging } = require('../../managers/firebase.manager');

const send = async ({ title, body, registration_token }) => {
  const params = {
    notification: {
      title,
      body,
    },
    token: registration_token,
  };

  return messaging.send(params);
};

const sendAll = async ({ title, body, registration_tokens }) => {
  const params = {
    notification: {
      title,
      body,
    },
    tokens: registration_tokens,
  };

  return messaging.sendMulticast(params);
};

module.exports = {
  send,
  sendAll,
};
