const { successUtils } = require('../utils');
const {
  getId, getListValidation, userSignInValidation, addUserValidation, // updateNoteValidation,
} = require('../validations');
const { userService } = require('../services');

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
      user_agent: req.headers['user-agent'],
      app_version: req.headers['app-version'],
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
      account_id: req.headers.account_id,
      ...validatedReqData,
    });
    return successUtils.handler({ user }, req, res);
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
  // updateOne,
  // deleteOne,
};
