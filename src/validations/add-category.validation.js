const Joi = require('@hapi/joi');

module.exports = Joi.object()
  .keys({
    name: Joi.string().min(3).max(255).required()
      .label('Name'),
    description: Joi.string().max(1000).allow('').label('Description'),
    image_id: Joi.number().integer().positive(),
  }).min(1);
