const Joi = require('@hapi/joi');

module.exports = Joi.object()
  .keys({
    email_id: Joi.string().email({
      allowUnicode: true,
      tlds: false,
    }).required(),
    password: Joi.string().min(8).max(32).required(),
  }).min(1);
