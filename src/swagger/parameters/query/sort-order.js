module.exports = {
  name: 'sort_order',
  in: 'query',
  schema: {
    type: 'string',
    minLength: 3,
    maxLength: 4,
    pattern: '[a-z]',
    enum: ['asc', 'desc'],
    default: 'desc',
  },
};
