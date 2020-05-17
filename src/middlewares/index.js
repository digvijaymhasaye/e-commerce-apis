const { jwtService, userService } = require('../services');

const authoriser = async (req, res, next) => {
  console.log(req.headers);
  const bearerToken = req.headers.authorization;
  const token = bearerToken.replace('Bearer ', '');
  const userDecodedData = await jwtService.verify(token);
  // console.info(userDecodedData)
  try {
    const user = await userService.getOne({ id: userDecodedData.id });
    req.user = {};
    req.user.id = user.id;
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  authoriser,
};
