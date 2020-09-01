const getListValidation = require('./get-list.validation');
const getId = require('./get-id.validation');
const addProductValidation = require('./add-product.validation');
const updateProductValidation = require('./update-product.validation');
const addCategoryValidation = require('./add-category.validation');
const updateCategoryValidation = require('./update-category.validation');
const addImageValidation = require('./add-image.validation');
const addUserValidation = require('./add-user.validation');
const userSignInValidation = require('./user-sign-in.validation');
const addCartItemValidation = require('./add-cart-item.validation');
const addCustomerValidation = require('./add-customer.validation');
const addCustomerAddressValidation = require('./add-customer-address.validation');
const updateCustomerAddressValidation = require('./update-customer-address.validation');
const initiatePaymentValidation = require('./initiate-payment.validation');
const capturePaymentValidation = require('./capture-payment.validation');
const addFeedbackValidation = require('./add-feedback.validation');
const customerSignInValidation = require('./customer-sign-in.validation');
const initiateCustomerOrderValidation = require('./initiate-customer-order.validation');

module.exports = {
  getListValidation,
  getId,
  addProductValidation,
  updateProductValidation,
  addCategoryValidation,
  addImageValidation,
  updateCategoryValidation,
  addUserValidation,
  userSignInValidation,
  addCartItemValidation,
  addCustomerValidation,
  addCustomerAddressValidation,
  updateCustomerAddressValidation,
  initiatePaymentValidation,
  capturePaymentValidation,
  addFeedbackValidation,
  customerSignInValidation,
  initiateCustomerOrderValidation,
};
