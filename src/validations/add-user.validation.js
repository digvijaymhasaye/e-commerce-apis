const Joi = require('@hapi/joi');

module.exports = Joi.object()
  .keys({
    first_name: Joi.string().min(3).max(255).required(),
    last_name: Joi.string().min(3).max(255).required(),
    email_id: Joi.string().email({
      allowUnicode: true,
      tlds: false,
    }).required(),
    mobile_no: Joi.number().max(9999999999).required(),
    image_id: Joi.number().integer().default(0),
    password: Joi.string().min(8).max(32).required(),
  }).min(1);
