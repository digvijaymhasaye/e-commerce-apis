const { errorUtils } = require('../utils');
const { SessionModel } = require('../managers/sequelize.manager');

const addSession = async ({
  user_type, user_id, device_info, app_version, token, device_token,
}) => {
  const existingSessionFromSameDevice = await SessionModel.findOne({
    where: {
      user_type,
      device_token,
    },
  });

  if (existingSessionFromSameDevice) {
    await existingSessionFromSameDevice.destroy();
  }

  return SessionModel.create({
    user_type,
    user_id,
    token,
    device_info,
    app_version,
    device_token,
  });
};

const deleteSession = async ({ user_type, user_id, session_id }) => SessionModel.destroy({
  where: {
    user_type,
    user_id,
    id: session_id,
  },
});

const getSessionById = async (id) => {
  console.info(`Session Service - GetSessionById() - Session id = ${id}`);
  const session = await SessionModel.findOne({
    where: {
      id,
    },
  });

  if (!session) {
    console.info(`Session not found. Session id - ${id}`);
    errorUtils.throwNotFoundError('Session not found');
  }

  console.info(`Session Service - GetSessionById() - Session = ${JSON.stringify(session)}`);
  return session;
};

module.exports = {
  addSession,
  deleteSession,
  getSessionById,
};
