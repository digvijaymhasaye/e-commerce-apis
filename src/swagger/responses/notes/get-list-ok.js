const { meta } = require('../../schemas/common');
const { note } = require('../../schemas/notes');

module.exports = {
  description: 'Get List',
  schema: {
    type: 'object',
    properties: {
      data: {
        type: 'array',
        items: note,
      },
      meta,
    },
  },
};
