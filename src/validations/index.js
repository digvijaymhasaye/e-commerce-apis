const getListValidation = require('./get-list.validation');
const getId = require('./get-id.validation');
const addProductValidation = require('./add-product.validation');
const updateProductValidation = require('./update-product.validation');
const addCategoryValidation = require('./add-category.validation');
const updateCategoryValidation = require('./update-category.validation');
const addImageValidation = require('./add-image.validation');
const addUserValidation = require('./add-user.validation');
const userSignInValidation = require('./user-sign-in.validation');

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
};
