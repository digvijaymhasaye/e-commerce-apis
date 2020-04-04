module.exports = {
  type: 'object',
  properties: {
    code: {
      type: 'integer',
      example: 400,
    },
    message: {
      type: 'string',
      example: 'Bad Request',
    },
    fields: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          key: {
            type: 'string',
            example: 'name',
          },
          type: {
            type: 'string',
            example: 'any.required',
          },
          message: {
            type: 'string',
            example: 'Name is required',
          },
        },
      },
    },
  },
};
