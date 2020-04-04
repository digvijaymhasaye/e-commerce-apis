const { meta, badRequest } = require('../../schemas/common');

module.exports = {
  description: 'Bad Request',
  schema: {
    type: 'object',
    properties: {
      error: badRequest,
      meta,
    },
  },
};
