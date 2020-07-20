const express = require('express');
const { feedbackController } = require('../controllers');

const feedbackRoutes = express.Router();

feedbackRoutes.post('/', feedbackController.addFeedback);

module.exports = feedbackRoutes;
