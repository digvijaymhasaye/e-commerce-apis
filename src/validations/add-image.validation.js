const Joi = require('@hapi/joi');

module.exports = Joi.object()
  .keys({
    type: Joi.number().integer().valid(0, 1, 2).required(),
    description: Joi.string().max(255),
    is_copy: Joi.number().integer().valid(0, 1).default(0),
  }).min(1);
