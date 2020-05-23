const { successUtils } = require('../utils');
const {
  getListValidation, getId, addCategoryValidation, updateCategoryValidation,
} = require('../validations');
const { categoryService } = require('../services');

const getListCount = async (req, res, next) => {
  try {
    const validatedReqData = await getListValidation.validate(req.query);
    const count = await categoryService.getListCount({
      account_id: req.headers.account_id,
      user_id: req.headers.user_id,
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
    const categories = await categoryService.getList({
      account_id: req.headers.account_id,
      user_id: req.headers.user_id,
      ...validatedReqData,
    });
    return successUtils.handler({ categories }, req, res);
  } catch (err) {
    return next(err);
  }
};

const getOne = async (req, res, next) => {
  const { categoryId } = req.params;
  try {
    const id = await getId.validate(categoryId);
    const category = await categoryService.getOne({
      id,
      account_id: req.headers.account_id,
      user_id: req.headers.user_id,
    });
    return successUtils.handler({ category }, req, res);
  } catch (err) {
    return next(err);
  }
};

const addOne = async (req, res, next) => {
  const reqBody = req.body;
  try {
    const validatedReqData = await addCategoryValidation.validate(reqBody);
    const category = await categoryService.addOne({
      account_id: req.headers.account_id,
      user_id: req.headers.user_id,
      ...validatedReqData,
    });
    return successUtils.handler({ category }, req, res);
  } catch (err) {
    return next(err);
  }
};


const updateOne = async (req, res, next) => {
  const { categoryId } = req.params;
  const { enable } = req.query;
  const reqBody = req.body;
  try {
    const id = await getId.validate(categoryId);
    const validatedReqData = await updateCategoryValidation.validate({ enable, ...reqBody });
    const category = await categoryService.updateOne({
      id,
      account_id: req.headers.account_id,
      user_id: req.headers.user_id,
      ...validatedReqData,
    });
    return successUtils.handler({ category }, req, res);
  } catch (err) {
    return next(err);
  }
};

const deleteOne = async (req, res, next) => {
  const { categoryId } = req.params;
  try {
    const id = await getId.validate(categoryId);
    const category = await categoryService.deleteOne({
      account_id: req.headers.account_id,
      user_id: req.headers.user_id,
      id,
    });
    return successUtils.handler({ category }, req, res);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getListCount,
  getList,
  getOne,
  addOne,
  updateOne,
  deleteOne,
};
