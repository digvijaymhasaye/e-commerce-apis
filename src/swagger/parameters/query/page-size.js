module.exports = {
  name: 'page_size',
  in: 'query',
  type: 'integer',
  minimum: 1,
  exclusiveMinimum: true,
  default: 100,
};
