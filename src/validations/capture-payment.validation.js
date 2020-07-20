const Joi = require('@hapi/joi');

module.exports = Joi.object()
  .keys({
    rzp_order_id: Joi.string().min(10).required().label('razerpay_order_id'),
    rzp_payment_id: Joi.string().min(10).required().label('razerpay_payment_id'),
    // enquiry_id: Joi.string().max(24).required().label('enquiry_id'),
    rzp_signature: Joi.string().min(32).max(64).required()
      .label('signature'),
  });
