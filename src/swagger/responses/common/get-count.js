const { meta } = require('../../schemas/common');

module.exports = {
  description: 'Get Count',
  schema: {
    type: 'object',
    properties: {
      data: {
        type: 'object',
        properties: {
          count: {
            type: 'number',
            example: 10,
          },
        },
      },
      meta,
    },
  },
};
