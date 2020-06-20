const express = require('express');
const { paymentController } = require('../controllers');

const paymentRoutes = express.Router();

paymentRoutes.post('/authorize', paymentController.initiatePayment);
paymentRoutes.post('/:paymentId/capture', paymentController.capturePayment);

module.exports = paymentRoutes;
