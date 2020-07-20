const Joi = require('@hapi/joi');

module.exports = Joi.object()
  .keys({
    mobile_no: Joi.number().positive().max(9999999999)
      .required(),
    device_token: Joi.string().min(24).required(),
  }).min(1);
