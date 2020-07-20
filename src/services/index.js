const userService = require('./user.service');
const productService = require('./product.service');
const categoryService = require('./category.service');
const offerService = require('./offer.service');
const jwtService = require('./jwt.service');
const imageService = require('./image.service');
const cartService = require('./cart.service');
const sessionService = require('./session.service');
const customerService = require('./customer.service');
const otpService = require('./otp.service');
const customerAddressService = require('./customer-address.service');
const customerOrderService = require('./customer-order.service');
const paymentService = require('./payment.service');
const feedbackService = require('./feedback.service');

module.exports = {
  userService,
  productService,
  categoryService,
  offerService,
  jwtService,
  imageService,
  cartService,
  sessionService,
  customerService,
  otpService,
  customerAddressService,
  customerOrderService,
  paymentService,
  feedbackService,
};
