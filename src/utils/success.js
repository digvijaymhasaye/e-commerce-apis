const { HTTP_STATUS } = require('../consts');

/**
 * Return success payload
 * @param data
 * @returns {{data: *, meta: {version: number, timestamp: Date}}}
 */
const getSuccessPayload = (data) => ({
  data,
  meta: {
    version: 1.0,
    timestamp: new Date(),
  },
});

/**
 * Handler success and send appropriate response
 * @param data
 * @param req
 * @param res
 * @returns {*}
 */
// eslint-disable-next-line no-unused-vars
const handler = (data, req, res, next) => res.status(HTTP_STATUS.OK)
  .send(getSuccessPayload(data));

module.exports = {
  handler,
};
