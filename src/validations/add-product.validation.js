const Joi = require('@hapi/joi');

module.exports = Joi.object()
  .keys({
    name: Joi.string().min(3).max(255).required()
      .label('Name'),
    description: Joi.string().max(1000).allow('').label('Description'),
    price: Joi.number().positive().precision(4).default(0.0000)
      .label('Price'),
    base_quantity: Joi.number().integer().default(0).label('Quantity'),
    quantity: Joi.number().integer().default(0).label('Quantity'),
    unit: Joi.string().valid('kg', 'dozens', 'packets').label('Unit'),
    category_id: Joi.number().integer().positive().required()
      .label('Category Id'),
    // image_ids: Joi.array().items(
    //   Joi.number().integer().positive()).min(1).max(5)
    //   .required(),
  }).unknown(true).min(1);
