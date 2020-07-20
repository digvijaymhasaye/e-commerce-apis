const { feedbackService } = require('../services');
const { successUtils } = require('../utils');
const { addFeedbackValidation } = require('../validations');

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

module.exports = {
  addFeedback,
};
