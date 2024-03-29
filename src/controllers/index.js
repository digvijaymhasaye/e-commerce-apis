const customerController = require('./customer.controller');
const adminController = require('./admin.controller');
const productController = require('./product.controller');
const categoryController = require('./category.controller');
const offerController = require('./offer.controller');
const imageController = require('./image.controller');
const userController = require('./user.controller');
const cartController = require('./cart.controller');
const otpController = require('./otp.controller');
const customerAddressController = require('./customer-address.controller');
const paymentController = require('./payment.controller');
const customerOrderController = require('./customer-order.controller');
const feedbackController = require('./feedback.controller');

module.exports = {
  otpController,
  customerController,
  adminController,
  offerController,
  productController,
  categoryController,
  imageController,
  userController,
  cartController,
  customerAddressController,
  paymentController,
  customerOrderController,
  feedbackController,
};
