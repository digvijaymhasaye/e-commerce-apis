const express = require('express');
const { otpController } = require('../controllers');

const otpRoutes = express.Router();

otpRoutes.get('/mobiles/:mobileNo/send', otpController.sendOtp);
otpRoutes.post('/mobiles/:mobileNo/resend', otpController.resendOtp);
otpRoutes.post('/mobiles/:mobileNo/verify', otpController.verifyOtp);

module.exports = otpRoutes;
