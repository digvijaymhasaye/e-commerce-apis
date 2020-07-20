const { successUtils } = require('../utils');
const {
  signInValidation, addUserValidation,
} = require('../validations');
const { userService } = require('../services');


const signIn = async (req, res, next) => {
  const reqBody = req.body;
  try {
    const validatedReqData = await signInValidation.validate(reqBody);
    const user = await userService.addOne({
      ...validatedReqData,
    });
    return successUtils.handler({ user }, req, res);
  } catch (err) {
    return next(err);
  }
};

const signUp = async (req, res, next) => {
  const reqBody = req.body;
  try {
    const validatedReqData = await addUserValidation.validate(reqBody);
    const user = await userService.addOne({
      ...validatedReqData,
    });
    return successUtils.handler({ user }, req, res);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  signIn,
  signUp,
};
