const { feedbackService } = require('../services');
const { successUtils } = require('../utils');
const { getId, getListValidation, addFeedbackValidation } = require('../validations');

const getFeedbackCount = async (req, res, next) => {
  try {
    const validatedReqQuery = await getListValidation.validate(req.query);
    const count = await feedbackService.getFeedbackCount({
      account_id: req.headers.account_id,
      ...validatedReqQuery,
    });
    return successUtils.handler({ count }, req, res);
  } catch (error) {
    return next(error);
  }
};

const getFeedbackList = async (req, res, next) => {
  try {
    const validatedReqQuery = await getListValidation.validate(req.query);
    const feedbacks = await feedbackService.getFeedbackList({
      account_id: req.headers.account_id,
      ...validatedReqQuery,
    });
    return successUtils.handler({ feedbacks }, req, res);
  } catch (error) {
    return next(error);
  }
};


const addFeedback = async (req, res, next) => {
  try {
    const validatedReqBody = await addFeedbackValidation.validate(req.body);
    const feedback = await feedbackService.addFeedback({
      account_id: req.headers.account_id,
      ...validatedReqBody,
    });
    return successUtils.handler({ feedback }, req, res);
  } catch (error) {
    return next(error);
  }
};

const getFeedback = async (req, res, next) => {
  const { feedbackId } = req.params;
  try {
    const validatedFeedbackId = await getId.validate(feedbackId);
    const feedback = await feedbackService.getFeedback({
      account_id: req.headers.account_id,
      feedback_id: validatedFeedbackId,
    });
    return successUtils.handler({ feedback }, req, res);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getFeedbackCount,
  getFeedbackList,
  addFeedback,
  getFeedback,
};
