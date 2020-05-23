const { successUtils } = require('../utils');
const {
  getListValidation, getId, addProductValidation, updateProductValidation,
} = require('../validations');
const { productService } = require('../services');

const getListCount = async (req, res, next) => {
  try {
    const validatedReqData = await getListValidation.validate(req.query);
    const count = await productService.getListCount({
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
    const products = await productService.getList({
      account_id: req.headers.account_id,
      user_id: req.headers.user_id,
      ...validatedReqData,
    });
    return successUtils.handler({ products }, req, res);
  } catch (err) {
    return next(err);
  }
};

const getOne = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const id = await getId.validate(productId);
    const product = await productService.getOne({
      id,
      account_id: req.headers.account_id,
      user_id: req.headers.user_id,
    });
    return successUtils.handler({ product }, req, res);
  } catch (err) {
    return next(err);
  }
};

const addOne = async (req, res, next) => {
  const reqBody = req.body;
  try {
    const validatedReqData = await addProductValidation.validate(reqBody);
    const product = await productService.addOne({
      account_id: req.headers.account_id,
      user_id: req.headers.user_id,
      ...validatedReqData,
    });
    return successUtils.handler({ product }, req, res);
  } catch (err) {
    return next(err);
  }
};


const updateOne = async (req, res, next) => {
  const { productId } = req.params;
  const { enable } = req.query;
  const reqBody = req.body;
  try {
    const id = await getId.validate(productId);
    const validatedReqData = await updateProductValidation.validate({ enable, ...reqBody });
    const product = await productService.updateOne({
      id,
      account_id: req.headers.account_id,
      user_id: req.headers.user_id,
      ...validatedReqData,
    });
    return successUtils.handler({ product }, req, res);
  } catch (err) {
    return next(err);
  }
};

const deleteOne = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const id = await getId.validate(productId);
    const product = await productService.deleteOne({
      id,
      account_id: req.headers.account_id,
      user_id: req.headers.user_id,
    });
    return successUtils.handler({ product }, req, res);
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
