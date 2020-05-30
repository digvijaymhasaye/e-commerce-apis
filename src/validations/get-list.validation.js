const Joi = require('@hapi/joi');

module.exports = Joi.object()
  .keys({
    page_no: Joi.number().default(1).label('Page Number'),
    page_size: Joi.number().default(100).label('Page Size'),
    sort_by: Joi.string().max(255).default('created_at').label('Sort By'),
    sort_order: Joi.string().min(3).max(4).default('desc')
      .label('Sort Order'),
    status: Joi.number().valid(1, 2, 3, 4).label('Status'),
    search: Joi.string().min(3).max(255).label('Search Query'),
    ids: Joi.array().items(Joi.number().positive()).label('Ids'),
    include_category: Joi.boolean().label('Include category'),
    include_offers: Joi.boolean().label('Include offers'),
    include_coupons: Joi.boolean().label('Include coupons'),
    include_address: Joi.boolean().label('Include address'),
    category_id: Joi.number().positive(),
  })
  .unknown(true);
