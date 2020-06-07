const { successUtils } = require('../utils');
const {
  addCartItemValidation,
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
    return successUtils.handler({ cart_items: cartItems }, req, res);
  } catch (err) {
    return next(err);
  }
};

const addCartItem = async (req, res, next) => {
  const reqBody = req.body;
  try {
    const validatedReqData = await addCartItemValidation.validate(reqBody);
    const product = await cartService.addOne({
      account_id: req.headers.account_id,
      customer_id: req.headers.customer_id,
      session_id: 1, // req.session.id,
      ...validatedReqData,
    });
    return successUtils.handler({ product }, req, res);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getCartItemsCount,
  getCartItems,
  addCartItem,
};
