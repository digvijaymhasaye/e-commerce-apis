const Joi = require('@hapi/joi');

module.exports = Joi.object()
  .keys({
    amount: Joi.number().min(1).required(),
    order_id: Joi.number(),
    type: Joi.number(),
  }).min(1);
