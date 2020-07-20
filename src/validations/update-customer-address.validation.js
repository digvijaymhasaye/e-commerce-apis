const Joi = require('@hapi/joi');

module.exports = Joi.object()
  .keys({
    first_name: Joi.string().min(3).max(255),
    last_name: Joi.string().min(3).max(255),
    mobile_no: Joi.string().max(10),
    address_line_1: Joi.string().min(3).max(1000),
    address_line_2: Joi.string().min(3).max(1000),
    city: Joi.string().min(3).max(56),
    state: Joi.string().min(3).max(16),
    country: Joi.string().default('India'),
    type: Joi.number().positive(),
    postal_code: Joi.number(),
    enable: Joi.boolean().label('Enable'),
  }).min(1);
