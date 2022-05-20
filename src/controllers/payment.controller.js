const { paymentService } = require('../services');
const { successUtils } = require('../utils');
const {
  getId, initiatePaymentValidation, capturePaymentValidation,
  getListValidation,
} = require('../validations');

const getPaymentCount = async (req, res, next) => {
  try {
    const validatedQueryParams = await getListValidation.validate(req.query);
    const count = await paymentService.getPaymentCount({
      account_id: req.headers.account_id,
      ...validatedQueryParams,
    });
    return successUtils.handler({ count }, req, res);
  } catch (error) {
    return next(error);
  }
};

const getPaymentStats = async (req, res, next) => {
  try {
    const stats = await paymentService.getPaymentStats({
      account_id: req.headers.account_id,
    });
    return successUtils.handler({ stats }, req, res);
  } catch (error) {
    return next(error);
  }
};

const getPaymentList = async (req, res, next) => {
  try {
    const validatedQueryParams = await getListValidation.validate(req.query);
    const payments = await paymentService.getPaymentList({
      account_id: req.headers.account_id,
      ...validatedQueryParams,
    });
    return successUtils.handler({ payments }, req, res);
  } catch (error) {
    return next(error);
  }
};

const getPayment = async (req, res, next) => {
  const { paymentId } = req.params;
  try {
    const validatedPaymentId = await getId.validate(paymentId);
    const payment = await paymentService.getPayment({
      account_id: req.headers.account_id,
      payment_id: validatedPaymentId,
    });
    return successUtils.handler({ payment }, req, res);
  } catch (error) {
    return next(error);
  }
};

const initiatePayment = async (req, res, next) => {
  try {
    const validatedReqBody = await initiatePaymentValidation.validate(req.body);
    const payment = await paymentService.initiatePayment({
      account_id: req.headers.account_id,
      customer_id: req.headers.customer_id,
      ...validatedReqBody,
    });
    return successUtils.handler({ payment }, req, res);
  } catch (error) {
    return next(error);
  }
};

const capturePayment = async (req, res, next) => {
  console.info(`capture payment-> headers -> ${JSON.stringify(req.headers)}`);
  console.info(`capture payment-> params -> ${JSON.stringify(req.params)}`);
  const { paymentId } = req.params;
  try {
    const validatedPaymentId = await getId.validate(paymentId);
    const validatedReqBody = await capturePaymentValidation.validate(req.body);
    const payment = await paymentService.capturePayment({
      account_id: req.headers.account_id,
      customer_id: req.headers.customer_id,
      payment_id: validatedPaymentId,
      ...validatedReqBody,
    });
    return successUtils.handler({ payment }, req, res);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getPaymentCount,
  getPaymentStats,
  getPaymentList,
  getPayment,
  initiatePayment,
  capturePayment,
};
