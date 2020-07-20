const Joi = require('@hapi/joi');

module.exports = Joi.object()
  .keys({
    full_name: Joi.string(),
    mobile_no: Joi.number(),
    // email_id: Joi.string(),
    message: Joi.string(),
  }).min(1).unknown(true);
