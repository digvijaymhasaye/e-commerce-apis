const Joi = require('@hapi/joi');

module.exports = Joi.number().positive().required().label('Id');
