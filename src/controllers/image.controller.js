const { successUtils } = require('../utils');
const {
  getListValidation, getId, addImageValidation,
} = require('../validations');
const { imageService } = require('../services');

const getListCount = async (req, res, next) => {
  try {
    const validatedReqData = await getListValidation.validate(req.query);
    const count = await imageService.getCount({
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
    const images = await imageService.getList({
      ...validatedReqData,
    });
    return successUtils.handler({ images }, req, res);
  } catch (err) {
    return next(err);
  }
};

const getOne = async (req, res, next) => {
  const { categoryId } = req.params;
  try {
    const id = await getId.validate(categoryId);
    const image = await imageService.getOne({
      id,
    });
    return successUtils.handler({ image }, req, res);
  } catch (err) {
    return next(err);
  }
};

const addOne = async (req, res, next) => {
  const reqFile = req.file;
  const reqBody = req.body;
  console.log(req.file);
  try {
    const validatedReqData = await addImageValidation.validate(reqBody);
    const image = await imageService.addOne({
      ...validatedReqData,
      file: reqFile,
      account_id: req.headers.account_id,
      user_id: req.headers.user_id,
    });
    return successUtils.handler({ image }, req, res);
  } catch (err) {
    return next(err);
  }
};

const deleteOne = async (req, res, next) => {
  const { categoryId } = req.params;
  try {
    const id = await getId.validate(categoryId);
    const image = await imageService.deleteOne({
      id,
    });
    return successUtils.handler({ image }, req, res);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getListCount,
  getList,
  getOne,
  addOne,
  // updateOne,
  deleteOne,
};
