const { paymentService } = require('../services');
const { successUtils } = require('../utils');
const { getId, initiatePaymentValidation, capturePaymentValidation } = require('../validations');

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
  initiatePayment,
  capturePayment,
};
