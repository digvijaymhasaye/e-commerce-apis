const Joi = require('@hapi/joi');

module.exports = Joi.object()
  .keys({
    first_name: Joi.string().min(3),
    last_name: Joi.string().min(3),
  }).min(1);
