const { meta, preconditionFailed } = require('../../schemas/common');

module.exports = {
  description: 'Precondition Failed',
  schema: {
    type: 'object',
    properties: {
      error: preconditionFailed,
      meta,
    },
  },
};
