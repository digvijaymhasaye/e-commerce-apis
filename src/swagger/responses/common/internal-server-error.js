const { meta, internalServerError } = require('../../schemas/common');

module.exports = {
  description: 'Internal Server Error',
  schema: {
    type: 'object',
    properties: {
      error: internalServerError,
      meta,
    },
  },
};
