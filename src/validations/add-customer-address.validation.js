const Joi = require('@hapi/joi');

module.exports = Joi.object()
  .keys({
    first_name: Joi.string().min(3).max(255).required(),
    last_name: Joi.string().min(3).max(255).required(),
    mobile_no: Joi.string().max(10).required(),
    address_line_1: Joi.string().min(3).max(1000).required(),
    address_line_2: Joi.string().min(3).max(1000).required(),
    city: Joi.string().min(3).max(56),
    state: Joi.string().min(3).max(16),
    country: Joi.string().default('India'),
    type: Joi.number().positive().default(1),
    postal_code: Joi.number(),
  }).min(1);
