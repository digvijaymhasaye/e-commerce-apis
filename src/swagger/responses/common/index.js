const badRequest = require('./bad-request');
const getCount = require('./get-count');
const internalServerError = require('./internal-server-error');
const notFound = require('./not-found');
const ok = require('./ok');
const preconditionFailed = require('./precondition-failed');

module.exports = {
  badRequest,
  getCount,
  internalServerError,
  notFound,
  ok,
  preconditionFailed,
};
