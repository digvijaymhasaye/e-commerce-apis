module.exports = {
  name: 'whitelabel-id',
  in: 'header',
  type: 'integer',
  minimum: 1,
  exclusiveMinimum: true,
  required: true,
  default: 1,
};
