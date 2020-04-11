const { successUtils } = require('../utils');
const {
  getListValidation, getId, signInValidation, addUserValidation, updateNoteValidation,
} = require('../validations');
const { userService } = require('../services');

const getListCount = async (req, res, next) => {
  try {
    const validatedReqData = await getListValidation.validate(req.query);
    const count = await userService.getListCount({
      ...validatedReqData,
    });
    return successUtils.handler({ count }, req, res);
  } catch (err) {
    return next(err);
  }
};

const getList = async (req, res, next) => {
  const reqData = { ...req.query };
  if (reqData.ids) {
    reqData.ids = reqData.ids.split(';');
  }
  try {
    const validatedReqData = await getListValidation.validate(reqData);
    const users = await userService.getList({
      ...validatedReqData,
    });
    return successUtils.handler({ users }, req, res);
  } catch (err) {
    return next(err);
  }
};

const getOne = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const id = await getId.validate(userId);
    const user = await userService.getOne({
      id,
    });
    return successUtils.handler({ user }, req, res);
  } catch (err) {
    return next(err);
  }
};

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

const updateOne = async (req, res, next) => {
  const { userId } = req.params;
  const reqBody = req.body;
  try {
    const id = await getId.validate(userId);
    const validatedReqData = await updateNoteValidation.validate(reqBody);
    const user = await userService.updateOne({
      id,
      ...validatedReqData,
    });
    return successUtils.handler({ user }, req, res);
  } catch (err) {
    return next(err);
  }
};

const deleteOne = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const id = await getId.validate(userId);
    const user = await userService.deleteOne({
      id,
    });
    return successUtils.handler({ user }, req, res);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getListCount,
  getList,
  getOne,
  signIn,
  signUp,
  updateOne,
  deleteOne,
};