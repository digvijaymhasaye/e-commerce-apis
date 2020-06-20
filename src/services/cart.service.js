const { CartItemModel, CartModel } = require('../managers').sequelizeManager;
// const { getOne: getCustomer } = require('./customer.service');
const { STATUS } = require('../consts');
const { ProductModel, ImageModel } = require('../managers/sequelize.manager');
const { errorUtils } = require('../utils');

const getItemsCount = async ({ customer_id /* , account_id */ }) => {
  const cart = await CartModel.findOne({
    where: {
      customer_id,
    },
  });

  if (!cart) {
    errorUtils.throwNotFoundError('Cart Not Found');
  }

  return CartItemModel.count({
    include: [{
      model: ProductModel,
      attributes: [],
      where: {
        status: STATUS.ENABLED,
      },
    }, {
      model: CartModel,
      where: {
        customer_id,
      },
      attributes: [],
    }],
  });
};

const getProducts = async ({ customer_id }) => {
  const cart = await CartModel.findOne({
    where: {
      customer_id,
    },
  });

  if (!cart) {
    errorUtils.throwNotFoundError('Cart Not Found');
  }

  return CartItemModel.findAll({
    include: [{
      model: ProductModel,
      where: {
        status: STATUS.ENABLED,
      },
      include: {
        model: ImageModel,
        through: {
          attributes: [],
        },
      },
    }, {
      model: CartModel,
      where: {
        customer_id,
      },
      attributes: [],
    }],
  });
};

const getProduct = async ({ account_id, customer_id, product_id }) => {
  const cart = await CartModel.findOne({
    where: {
      customer_id,
    },
  });

  if (!cart) {
    errorUtils.throwNotFoundError('Cart Not Found');
  }

  const cartProduct = await CartItemModel.findOne({
    where: {
      product_id,
    },
    include: [{
      model: ProductModel,
      where: {
        status: STATUS.ENABLED,
      },
      include: {
        model: ImageModel,
        through: {
          attributes: [],
        },
      },
    }, {
      model: CartModel,
      where: {
        customer_id,
      },
      attributes: [],
    }],
  });

  if (!cartProduct) {
    errorUtils.throwNotFoundError('Product is not present in cart');
  }

  return cartProduct;
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
  // await getCustomer({ account_id, id: customer_id });

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

    return CartItemModel.create({
      cart_id: cart.id,
      product_id,
      quantity,
    });
  }

  const cartProduct = await CartItemModel.findOne({
    where: {
      cart_id: cart.id,
      product_id,
    },
  });

  if (!cartProduct && quantity !== 0) {
    return CartItemModel.create({
      cart_id: cart.id,
      product_id,
      quantity,
    });
  }
  if (cartProduct && quantity === 0) {
    return cartProduct.destroy();
  }

  cartProduct.quantity = quantity;
  return cartProduct.save();
};

const addProductToCart = async ({
  account_id, customer_id, product_id, quantity,
}) => {
  // await getCustomer({ account_id, id: customer_id });

  const product = await ProductModel.findOne({
    where: {
      account_id,
      id: product_id,
    },
  });

  if (!product) {
    errorUtils.throwNotFoundError('Product not found');
  }

  const cart = await getActiveCartByCustomerId({ customer_id });

  const cartProduct = await CartItemModel.findOne({
    where: {
      cart_id: cart.id,
      product_id,
    },
  });

  if (!cartProduct) {
    return CartItemModel.create({
      cart_id: cart.id,
      product_id,
      quantity,
    });
  }

  cartProduct.quantity = quantity;
  return cartProduct.save();
};

const removeCartProduct = async ({ account_id, customer_id, product_id }) => {
  const cartProduct = await CartItemModel.findOne({
    where: {
      product_id,
    },
    include: [{
      model: ProductModel,
      where: {
        status: STATUS.ENABLED,
        account_id,
      },
      include: {
        model: ImageModel,
        through: {
          attributes: [],
        },
      },
    }, {
      model: CartModel,
      where: {
        customer_id,
      },
      attributes: [],
    }],
  });

  if (!cartProduct) {
    errorUtils.throwNotFoundError('Product is not present in cart');
  }

  return cartProduct.destroy();
};

const getInvoice = async ({ account_id, customer_id }) => {
  const cartItems = await getProducts({ customer_id });
  const invoice = {
    total_amount: 0,
    cart_amount: 0,
    delivery_fee: 0,
    gst: 0,
    discount: {
      percentile: 0,
      amount: 0,
    },
  };

  if (cartItems.length === 0) {
    return invoice;
  }

  cartItems.forEach((eachItems) => {
    const eachItemTotalPrice = (eachItems.quantity * eachItems.product.price);
    invoice.cart_amount += eachItemTotalPrice;
  });

  const totalPrice = (invoice.cart_amount + invoice.delivery_fee + invoice.gst);
  invoice.total_amount = totalPrice;
  return invoice;
};

module.exports = {
  getProducts,
  getItemsCount,
  addOne,
  addProductToCart,
  getProduct,
  removeCartProduct,
  getInvoice,
};
