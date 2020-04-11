const Joi = require('@hapi/joi');

module.exports = Joi.object()
  .keys({
    name: Joi.string().min(3).max(255).label('Name'),
    description: Joi.string().max(1000).allow('').label('Description'),
    price: Joi.number().positive().precision(4).default(0.0000)
      .label('Price'),
    quantity: Joi.number().integer().default(0).label('Quantity'),
    unit: Joi.string().valid('dozens', 'packets').label('Unit'),
    category_id: Joi.number().integer().positive().label('Category Id'),
    enable: Joi.boolean().label('Enable'),
  }).min(1);
