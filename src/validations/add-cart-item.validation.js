const Joi = require('@hapi/joi');
const getId = require('./get-id.validation');

module.exports = Joi.object()
  .keys({
    product_id: getId,
    quantity: Joi.number().integer().required(),
  }).min(1);
