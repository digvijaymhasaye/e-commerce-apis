const { successUtils } = require('../utils');
const {
  getId, addCartItemValidation,
} = require('../validations');
const { cartService } = require('../services');

const getCartItemsCount = async (req, res, next) => {
  const { cartId } = req.params;
  try {
    const validatedCartId = await getId.validate(cartId);
    const count = await cartService.getItemsCount({
      customer_id: req.headers.customer_id,
      cart_id: validatedCartId,
    });
    return successUtils.handler({ count }, req, res);
  } catch (err) {
    return next(err);
  }
};

const getCartItems = async (req, res, next) => {
  const { cartId } = req.params;
  try {
    const validatedCartId = await getId.validate(cartId);
    const cartItems = await cartService.getItems({
      customer_id: req.headers.customer_id,
      cart_id: validatedCartId,
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
      user_id: req.headers.user_id,
      session_id: req.session.id,
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
