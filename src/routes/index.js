const express = require('express');

const apiRoutes = express.Router();

const noteRoutes = require('./note.routes');

apiRoutes.use('/notes', noteRoutes);

// apiRoutes.use('*', (req, res) => res.status(handlers.response.STATUS.NOT_FOUND)
//   .send(handlers.response.getErrorPayload('Route Not Found', handlers.response.STATUS.NOT_FOUND)));

module.exports = apiRoutes;
