const express = require('express');
const { paymentController } = require('../controllers');

const paymentRoutes = express.Router();

paymentRoutes.get('/stats', paymentController.getPaymentStats);
paymentRoutes.get('/count', paymentController.getPaymentCount);
paymentRoutes.get('/', paymentController.getPaymentList);
paymentRoutes.get('/:paymentId', paymentController.getPayment);
paymentRoutes.post('/authorize', paymentController.initiatePayment);
paymentRoutes.post('/:paymentId/capture', paymentController.capturePayment);

module.exports = paymentRoutes;
