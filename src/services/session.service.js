const { SessionModel } = require('../managers').sequelizeManager;

const addSession = async ({
  user_type, user_id, device_info, app_version, token,
}) => SessionModel.create({
  user_type,
  user_id,
  token,
  device_info,
  app_version,
});

module.exports = {
  addSession,
};
