const parameters = require('./../../parameters');
const responses = require('./../../responses');

const notePaths = {

  '/notes': {
    get: {
      tags: ['Notes'],
      description: 'This will return a list of notes.',
      parameters: [
        parameters.header.whitelabelId,
        parameters.header.accountId,
        parameters.header.userId,
        parameters.query.pageNo,
        parameters.query.pageSize,
        parameters.query.sortBy,
        parameters.query.sortOrder,
        parameters.query.status,
        parameters.query.search,
        parameters.query.ids,
      ],
      responses: {
        200: responses.note.getListOk,
        400: responses.common.badRequest,
        404: responses.common.notFound,
        500: responses.common.internalServerError,
      },
    },
    post: {
      tags: ['Notes'],
      description: 'This api returns a new note with provided body.',
      parameters: [
        parameters.header.whitelabelId,
        parameters.header.accountId,
        parameters.header.userId,
        {
          name: 'body',
          in: 'body',
          type: 'object',
          properties: {
            name: parameters.body.name,
            description: parameters.body.description,
          },
        }],
      responses: {
        200: responses.note.getOneOk,
        400: responses.common.badRequest,
        404: responses.common.notFound,
        412: responses.common.preconditionFailed,
        500: responses.common.internalServerError,
      },
    },
  },
  '/notes/count': {
    get: {
      tags: ['Notes'],
      description: 'This will return count of notes.',
      parameters: [
        parameters.header.whitelabelId,
        parameters.header.accountId,
        parameters.header.userId,
        parameters.query.pageNo,
        parameters.query.pageSize,
        parameters.query.sortBy,
        parameters.query.sortOrder,
        parameters.query.status,
        parameters.query.search,
      ],
      responses: {
        200: responses.common.getCount,
        400: responses.common.badRequest,
        500: responses.common.internalServerError,
      },
    },
  },
  '/notes/{noteId}': {
    get: {
      tags: ['Notes'],
      description: 'This will Return note with provided id.',
      parameters: [
        parameters.header.whitelabelId,
        parameters.header.accountId,
        parameters.header.userId,
        parameters.path.noteId,
      ],
      responses: {
        200: responses.note.getOneOk,
        400: responses.common.badRequest,
        404: responses.common.notFound,
        500: responses.common.internalServerError,
      },
    },
    put: {
      tags: ['Notes'],
      description: 'This api returns updated note with provided id after updating with provided body.',
      parameters: [
        parameters.header.whitelabelId,
        parameters.header.accountId,
        parameters.header.userId,
        parameters.path.noteId,
        {
          name: 'body',
          in: 'body',
          type: 'object',
          properties: {
            name: parameters.body.name,
            description: parameters.body.description,
          },
        },
      ],
      responses: {
        200: responses.note.getOneOk,
        400: responses.common.badRequest,
        404: responses.common.notFound,
        412: responses.common.preconditionFailed,
        500: responses.common.internalServerError,
      },
    },
    delete: {
      tags: ['Notes'],
      description: 'This will return a list of notes.',
      parameters: [
        parameters.header.whitelabelId,
        parameters.header.accountId,
        parameters.header.userId,
        parameters.path.noteId,
      ],
      responses: {
        200: responses.note.getOneOk,
        400: responses.common.badRequest,
        404: responses.common.notFound,
        412: responses.common.preconditionFailed,
        500: responses.common.internalServerError,
      },
    },
  },
  '/notes/{noteId}/enable': {
    post: {
      tags: ['Notes'],
      description: 'This api enables a note with provided id',
      parameters: [
        parameters.header.whitelabelId,
        parameters.header.accountId,
        parameters.header.userId,
        parameters.path.noteId,
      ],
      responses: {
        200: responses.note.getOneOk,
        400: responses.common.badRequest,
        404: responses.common.notFound,
        412: responses.common.preconditionFailed,
        500: responses.common.internalServerError,
      },
    },
  },
  '/notes/{noteId}/disable': {
    post: {
      tags: ['Notes'],
      description: 'This api disables a note with provided id',
      parameters: [
        parameters.header.whitelabelId,
        parameters.header.accountId,
        parameters.header.userId,
        parameters.path.noteId,
      ],
      responses: {
        200: responses.note.getOneOk,
        400: responses.common.badRequest,
        404: responses.common.notFound,
        412: responses.common.preconditionFailed,
        500: responses.common.internalServerError,
      },
    },
  },
  '/notes/name/suggest/:name': {
    get: {
      tags: ['Notes'],
      description: 'This api suggests a note name',
      parameters: [
        parameters.header.whitelabelId,
        parameters.header.accountId,
        parameters.header.userId,
        parameters.path.name,
      ],
      responses: {
        200: responses.common.suggestNameOk,
        400: responses.common.badRequest,
        404: responses.common.notFound,
        412: responses.common.preconditionFailed,
        500: responses.common.internalServerError,
      },
    },
  },
};

module.exports = notePaths;
