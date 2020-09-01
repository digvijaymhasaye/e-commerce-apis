const { successUtils } = require('../utils');
const {
  getId, getListValidation, userSignInValidation, addUserValidation, // updateNoteValidation,
} = require('../validations');
const { userService, jwtService } = require('../services');
const { USER_TYPE } = require('../consts');

// const getListCount = async (req, res, next) => {
//   try {
//     const validatedReqData = await getListValidation.validate(req.query);
//     const count = await userService.getListCount({
//       ...validatedReqData,
//     });
//     return successUtils.handler({ count }, req, res);
//   } catch (err) {
//     return next(err);
//   }
// };

// const getList = async (req, res, next) => {
//   const reqData = { ...req.query };
//   if (reqData.ids) {
//     reqData.ids = reqData.ids.split(';');
//   }
//   try {
//     const validatedReqData = await getListValidation.validate(reqData);
//     const users = await userService.getList({
//       ...validatedReqData,
//     });
//     return successUtils.handler({ users }, req, res);
//   } catch (err) {
//     return next(err);
//   }
// };

const getOne = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const id = await getId.validate(userId);
    const validatedReqData = await getListValidation.validate(req.query);
    const user = await userService.getOne({
      id,
      account_id: req.headers.account_id,
      ...validatedReqData,
    });
    return successUtils.handler({ user }, req, res);
  } catch (err) {
    return next(err);
  }
};

const signIn = async (req, res, next) => {
  const reqBody = req.body;
  try {
    const validatedReqData = await userSignInValidation.validate(reqBody);
    const user = await userService.signIn({
      account_id: req.headers.account_id,
      ...validatedReqData,
    });
    const session = await jwtService.sign({
      app_version: req.headers['app-version'],
      user_type: USER_TYPE.USER,
      device_info: req.headers['user-agent'],
      device_token: 'abc',
      user_id: user.id,
    });
    console.info(`Session - ${JSON.stringify(session)}`);
    return successUtils.handler({ user, token: session.token }, req, res);
  } catch (err) {
    return next(err);
  }
};

const signUp = async (req, res, next) => {
  const reqBody = req.body;
  try {
    const validatedReqData = await addUserValidation.validate(reqBody);
    const user = await userService.addOne({
      account_id: req.headers.account_id,
      ...validatedReqData,
    });

    const session = await jwtService.sign({
      app_version: req.headers['app-version'],
      user_type: USER_TYPE.USER,
      device_info: req.headers['user-agent'],
      device_token: 'abc',
      user_id: user.id,
    });
    console.info(`Session - ${JSON.stringify(session)}`);
    return successUtils.handler({ user, token: session.token }, req, res);
  } catch (err) {
    return next(err);
  }
};

const signOut = async (req, res, next) => {
  try {
    await userService.signOut({
      account_id: req.headers.account_id,
      user_id: req.headers.user_id,
      session_id: req.headers.session_id,
    });
    return successUtils.handler({ message: 'Ok' }, req, res);
  } catch (err) {
    return next(err);
  }
};

// const updateOne = async (req, res, next) => {
//   const { userId } = req.params;
//   const reqBody = req.body;
//   try {
//     const id = await getId.validate(userId);
//     const validatedReqData = await updateNoteValidation.validate(reqBody);
//     const user = await userService.updateOne({
//       id,
//       ...validatedReqData,
//     });
//     return successUtils.handler({ user }, req, res);
//   } catch (err) {
//     return next(err);
//   }
// };

// const deleteOne = async (req, res, next) => {
//   const { userId } = req.params;
//   try {
//     const id = await getId.validate(userId);
//     const user = await userService.deleteOne({
//       id,
//     });
//     return successUtils.handler({ user }, req, res);
//   } catch (err) {
//     return next(err);
//   }
// };

module.exports = {
  // getListCount,
  // getList,
  getOne,
  signIn,
  signUp,
  signOut,
  // updateOne,
  // deleteOne,
};
