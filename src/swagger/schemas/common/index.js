const badRequest = require('./bad-request');
const internalServerError = require('./internal-server-error');
const meta = require('./meta');
const notFound = require('./not-found');
const ok = require('./ok');
const preconditionFailed = require('./precondition-failed');

module.exports = {
  badRequest,
  internalServerError,
  meta,
  notFound,
  ok,
  preconditionFailed,
};
