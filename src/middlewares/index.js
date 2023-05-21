const {
  jwtService, userService, customerService,
  sessionService,
} = require('../services');
const { USER_TYPE } = require('../consts');

const authoriser = async (req, res, next) => {
  console.log(req.originalUrl);
  const bearerToken = req.headers.authorization;
  if (!bearerToken) {
    return res.status(403).json({
      status: 403,
      message: 'Forbidden',
    });
  }
  // console.info(userDecodedData)
  try {
    const token = bearerToken.replace('Bearer ', '');
    const userDecodedData = await jwtService.verify(token);
    console.info(`Authoriser - Decoded data: ${JSON.stringify(userDecodedData)}`);
    console.info(`Authoriser - Request Header = ${JSON.stringify(req.headers)}`);
    console.info(`Authoriser - Session id = ${userDecodedData.session_id}`);
    await sessionService.getSessionById(userDecodedData.session_id);
    console.info(`Authoriser - User Type = ${userDecodedData.user_type}`);
    const validateUser = userDecodedData.user_type === USER_TYPE.USER ? userService.getOne : customerService.getOne;
    const user = await validateUser({ account_id: userDecodedData.account_id, id: userDecodedData.user_id });
    console.info(`Authoriser - User = ${JSON.stringify(user)}`);
    req.headers.user_id = userDecodedData.user_id;
    req.headers.session_id = userDecodedData.session_id;
    req.headers.account_id = user.account_id;
    return next();
  } catch (error) {
    console.error(`Authoriser - Error: ${JSON.stringify(error)}`);
    return res.status(401).json({
      status: 401,
      message: 'Unauthorized',
    });
  }
};

module.exports = {
  authoriser,
};
