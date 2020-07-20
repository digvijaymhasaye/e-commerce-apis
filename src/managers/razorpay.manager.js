const razorpay = require('razorpay');
const config = require('../config');

const instance = new razorpay({
  key_id: config.RAZORPAY_KEY_ID,
  key_secret: config.RAZORPAY_KEY_SECRET,
});

module.exports = instance;
