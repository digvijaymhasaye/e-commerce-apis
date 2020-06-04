const { CartItemModel, CartModel } = require('../managers').sequelizeManager;
const { getOne: getCustomer } = require('./customer.service');
const { STATUS } = require('../consts');
const { ProductModel } = require('../managers/sequelize.manager');
const { errorUtils } = require('../utils');

const getItemsCount = async ({ customer_id, cart_id }) => {
  const cart = await CartModel.findOne({
    where: {
      id: cart_id,
      customer_id,
    },
  });

  if (!cart) {
    errorUtils.throwNotFoundError('Cart Not Found');
  }

  return CartItemModel.count({
    where: {
      cart_id,
    },
    include: {
      model: ProductModel,
      attributes: [],
      where: {
        status: STATUS.ENABLED,
      },
    },
  });
};

const getItems = async ({ customer_id, cart_id }) => {
  const cart = await CartModel.findOne({
    where: {
      id: cart_id,
      customer_id,
    },
  });

  if (!cart) {
    errorUtils.throwNotFoundError('Cart Not Found');
  }

  return CartItemModel.findAll({
    where: {
      cart_id,
    },
    include: {
      model: ProductModel,
    },
  });
};

const getActiveCartByCustomerId = async ({ customer_id }) => CartModel.findOne({
  where: {
    customer_id,
    status: STATUS.ENABLED,
  },
});

const addOne = async ({
  account_id, customer_id, session_id, product_id, quantity,
}) => {
  await getCustomer({ account_id, id: customer_id });

  const product = await ProductModel.findOne({
    where: {
      account_id,
      id: product_id,
    },
  });

  if (!product) {
    errorUtils.throwNotFoundError('Product not found');
  }
  let cart = await getActiveCartByCustomerId({ customer_id });

  if (!cart) {
    cart = await CartModel.create({
      last_session_id: session_id,
      customer_id,
      total_price: quantity * product.price,
    });

    await CartItemModel.create({
      cart_id: cart.id,
      product_id,
      quantity,
    });

    return CartModel.findOne({
      where: {
        id: cart.id,
      },
      include: {
        model: CartItemModel,
      },
    });
  }

  const cartProduct = await CartItemModel.findOne({
    where: {
      cart_id: cart.id,
      product_id,
    },
  });

  if (!cartProduct) {
    await CartItemModel.findOne({
      where: {
        cart_id: cart.id,
        product_id,
      },
    });
  } else {
    cartProduct.quantity = quantity;
    await cartProduct.save();
  }

  return CartModel.findOne({
    where: {
      id: cart.id,
    },
    include: {
      model: CartItemModel,
    },
  });
};

module.exports = {
  getItems,
  getItemsCount,
  addOne,
};
