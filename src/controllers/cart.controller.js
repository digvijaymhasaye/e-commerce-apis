const { successUtils } = require('../utils');
const {
  addCartItemValidation, getId,
} = require('../validations');
const { cartService } = require('../services');

const getCartItemsCount = async (req, res, next) => {
  try {
    const count = await cartService.getItemsCount({
      customer_id: req.headers.customer_id,
      account_id: req.headers.account_id,
    });
    return successUtils.handler({ count }, req, res);
  } catch (err) {
    return next(err);
  }
};

const getCartItems = async (req, res, next) => {
  try {
    const cartItems = await cartService.getProducts({
      customer_id: req.headers.customer_id,
    });
    return successUtils.handler({ products: cartItems }, req, res);
  } catch (err) {
    return next(err);
  }
};

const getCartProduct = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const validatedProductId = await getId.validate(productId);
    const product = await cartService.getProduct({
      account_id: req.headers.account_id,
      customer_id: req.headers.customer_id,
      product_id: validatedProductId,
    });
    return successUtils.handler({ product }, req, res);
  } catch (err) {
    return next(err);
  }
};

const addCartItem = async (req, res, next) => {
  const reqBody = req.body;
  try {
    const validatedReqData = await addCartItemValidation.validate(reqBody);
    const product = await cartService.addProductToCart({
      account_id: req.headers.account_id,
      customer_id: req.headers.customer_id,
      ...validatedReqData,
    });
    return successUtils.handler({ product }, req, res);
  } catch (err) {
    return next(err);
  }
};

const removeCartProduct = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const validatedProductId = await getId.validate(productId);
    const product = await cartService.removeCartProduct({
      account_id: req.headers.account_id,
      customer_id: req.headers.customer_id,
      product_id: validatedProductId,
    });
    return successUtils.handler({ product }, req, res);
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  getCartItemsCount,
  getCartItems,
  addCartItem,
  getCartProduct,
  removeCartProduct,
};
