module.exports = {
  name: 'account-id',
  in: 'header',
  type: 'integer',
  minimum: 1,
  exclusiveMinimum: true,
  required: true,
  default: 1,
};
