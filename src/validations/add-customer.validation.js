const Joi = require('@hapi/joi');

module.exports = Joi.object().keys({
  first_name: Joi.string().max(255).required(),
  last_name: Joi.string().max(255).required(),
  mobile_no: Joi.number().positive().max(9999999999).required(),
  device_token: Joi.string().min(24).required(),
}).min(1);
