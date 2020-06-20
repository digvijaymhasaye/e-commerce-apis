const Joi = require('@hapi/joi');

module.exports = Joi.object()
  .keys({
    amount: Joi.number().min(100).required(),
  }).min(1);
