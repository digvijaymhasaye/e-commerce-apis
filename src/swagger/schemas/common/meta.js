module.exports = {
  type: 'object',
  properties: {
    version: {
      type: 'number',
      example: '1',
    },
    timestamp: {
      type: 'string',
      example: (new Date().toISOString()),
    },
  },
};
