const Joi = require('@hapi/joi');

module.exports = Joi.object()
  .keys({
    old_password: Joi.string().min(8).max(32).required(),
    new_password: Joi.string().min(8).max(32).required(),
  }).min(1);
