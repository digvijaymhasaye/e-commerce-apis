const { jwtService, userService, customerService } = require('../services');
const { USER_TYPE } = require('../consts');

const authoriser = async (req, res, next) => {
  console.log(req.headers);
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
    const validateUser = userDecodedData.type === USER_TYPE.USER ? userService.getOne : customerService.getOne;
    const user = await validateUser({ id: userDecodedData.id });
    req[userDecodedData.type] = {};
    req[userDecodedData.type].id = user.id;
    req[userDecodedData.type].account_id = user.account_id;
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
