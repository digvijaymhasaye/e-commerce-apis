const Joi = require('@hapi/joi');

module.exports = Joi.object()
  .keys({
    name: Joi.string().min(3).max(255).label('Name'),
    description: Joi.string().max(1000).allow('').label('Description'),
    enable: Joi.boolean().label('Enable'),
    image_id: Joi.number().integer(),
  }).min(1);
