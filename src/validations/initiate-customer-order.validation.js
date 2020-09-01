const Joi = require('@hapi/joi');

module.exports = Joi.object()
  .keys({
    address_id: Joi.number().positive().required().label('address_id'),
    delivery_type: Joi.number().positive().required().label('delivery_type'),
    payment_type: Joi.number().positive().required().label('payment_type'),
    amount: Joi.number().positive().min(1).required()
      .label('amount'),
  }).min(1);
