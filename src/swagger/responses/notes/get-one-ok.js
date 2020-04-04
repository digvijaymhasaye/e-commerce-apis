const { meta } = require('../../schemas/common');
const { note } = require('../../schemas/notes');

module.exports = {
  description: 'Get One',
  schema: {
    type: 'object',
    properties: {
      data: {
        type: 'object',
        properties: {
          product: note,
        },
      },
      meta,
    },
  },
};
