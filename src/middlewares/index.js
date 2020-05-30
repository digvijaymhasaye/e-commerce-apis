const { jwtService, userService } = require('../services');

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
    const user = await userService.getOne({ id: userDecodedData.id });
    req.user = {};
    req.user.id = user.id;
    return next();
  } catch (error) {
    return res.status(401).json({
      status: 401,
      message: 'Unauthorized',
    });
  }
};

module.exports = {
  authoriser,
};
