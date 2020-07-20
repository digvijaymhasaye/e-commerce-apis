const { successUtils } = require('../utils');
const {
  getListValidation, getId, addCategoryValidation, updateCategoryValidation,
} = require('../validations');
const { offerService } = require('../services');

const getListCount = async (req, res, next) => {
  try {
    const validatedReqData = await getListValidation.validate(req.query);
    const count = await offerService.getListCount({
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
    const offers = await offerService.getList({
      ...validatedReqData,
    });
    return successUtils.handler({ offers }, req, res);
  } catch (err) {
    return next(err);
  }
};

const getOne = async (req, res, next) => {
  const { offerId } = req.params;
  try {
    const id = await getId.validate(offerId);
    const offer = await offerService.getOne({
      id,
    });
    return successUtils.handler({ offer }, req, res);
  } catch (err) {
    return next(err);
  }
};

const addOne = async (req, res, next) => {
  const reqBody = req.body;
  try {
    const validatedReqData = await addCategoryValidation.validate(reqBody);
    const offer = await offerService.addOne({
      ...validatedReqData,
    });
    return successUtils.handler({ offer }, req, res);
  } catch (err) {
    return next(err);
  }
};


const updateOne = async (req, res, next) => {
  const { offerId } = req.params;
  const { enable } = req.query;
  const reqBody = req.body;
  try {
    const id = await getId.validate(offerId);
    const validatedReqData = await updateCategoryValidation.validate({ enable, ...reqBody });
    const offer = await offerService.updateOne({
      id,
      ...validatedReqData,
    });
    return successUtils.handler({ offer }, req, res);
  } catch (err) {
    return next(err);
  }
};

const deleteOne = async (req, res, next) => {
  const { offerId } = req.params;
  try {
    const id = await getId.validate(offerId);
    const offer = await offerService.deleteOne({
      id,
    });
    return successUtils.handler({ offer }, req, res);
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
