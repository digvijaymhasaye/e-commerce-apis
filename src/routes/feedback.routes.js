const express = require('express');
const { feedbackController } = require('../controllers');

const feedbackRoutes = express.Router();

feedbackRoutes.get('/count', feedbackController.getFeedbackCount);
feedbackRoutes.get('/', feedbackController.getFeedbackList);
feedbackRoutes.post('/', feedbackController.addFeedback);
feedbackRoutes.get('/:feedbackId', feedbackController.getFeedback);

module.exports = feedbackRoutes;
