const { meta, ok } = require('../../schemas/common');

module.exports = {
  description: 'ok',
  schema: {
    type: 'object',
    properties: {
      data: ok,
      meta,
    },
  },
};
