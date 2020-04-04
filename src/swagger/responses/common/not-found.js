const { meta, notFound } = require('../../schemas/common');

module.exports = {
  description: 'Not Found',
  schema: {
    type: 'object',
    properties: {
      error: notFound,
      meta,
    },
  },
};
