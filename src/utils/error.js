const STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORISED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  ERROR: 500,
};

const handler = (error, req, res, next) => {
  console.error('ERROR UTILS >', error);
  const errorName = error.name;
  switch (errorName) {
    case 'ValidationError':
      return res.status(STATUS_CODE.BAD_REQUEST)
        .send({
          status: STATUS_CODE.BAD_REQUEST,
          message: error.message || 'Bad request',
        });
      break;
    case 'NotFound':
      return res.status(STATUS_CODE.NOT_FOUND)
        .send({
          status: STATUS_CODE.NOT_FOUND,
          message: error.message,
        });
      break;
    case 'Conflict':
      return res.status(STATUS_CODE.CONFLICT)
        .send({
          status: STATUS_CODE.CONFLICT,
          message: error.message,
        });
      break;
    case 'Forbidden':
      return res.status(STATUS_CODE.FORBIDDEN)
        .send({
          status: STATUS_CODE.FORBIDDEN,
          message: error.message,
        });
      break;
    case 'Unauthorized':
      return res.status(STATUS_CODE.UNAUTHORISED)
        .send({
          status: STATUS_CODE.UNAUTHORISED,
          message: error.message,
        });
      break;
    case 'PreconditionFailed':
      return res.status(STATUS_CODE.PRECONDITION_FAILED)
        .send({
          status: STATUS_CODE.PRECONDITION_FAILED,
          message: error.message,
        });
      break;
    case 'MulterError': 
      return res.status(400)
        .send({
          status: STATUS_CODE.BAD_REQUEST,
          message: error.message,
        })
    default:
      return res.status(STATUS_CODE.ERROR)
        .send({
          status: STATUS_CODE.ERROR,
          message: 'Internal server error',
        });
      break;
  }
};

const throwPreconditionFailed = (message) => {
  const error = new Error(message);
  error.name = 'PreconditionFailed';
  throw error;
};

const throwNotFoundError = (message) => {
  const error = new Error(message);
  error.name = 'NotFound';
  throw error;
};

const throwConflictError = (message) => {
  const error = new Error(message);
  error.name = 'Conflict';
  throw error;
};

const throwForbiddenError = (message) => {
  const error = new Error(message);
  error.name = 'Forbidden';
  throw error;
}

const throwUnAuthorisedError = (message) => {
  const error = new Error(message);
  error.name = 'Unauthorized';
  throw error;
}

module.exports = {
  handler,
  throwNotFoundError,
  throwConflictError,
  throwForbiddenError,
  throwUnAuthorisedError,
  throwPreconditionFailed,
};
