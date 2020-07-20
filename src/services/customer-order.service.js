const {
  PaymentModel, CustomerModel, CustomerOrderModel,
  CustomerOrderAddressModel, CustomerOrderItemModel,
  ProductModel, ImageModel, ProductImageMapModel,
} = require('../managers/sequelize.manager');
const { getProducts, getInvoice, disableCart } = require('./cart.service');
const { getAddressById } = require('./customer-address.service');
const { updateProductQuantityAfterOrder } = require('./product.service');
const { errorUtils } = require('../utils');
const { DELIVERY_TYPE, ORDER_STATUS } = require('../consts');

const getOrdersByCustomerId = async ({ account_id, customer_id, include_payment }) => {
  const include = [{
    model: CustomerModel,
  }, {
    model: CustomerOrderAddressModel,
  }, {
    model: CustomerOrderItemModel,
    include: {
      model: ProductModel,
      include: {
        model: ImageModel,
        through: {
          attributes: [],
        },
      },
    },
  }];

  if (include_payment) {
    include.push({
      model: PaymentModel,
    });
  }
  const orders = await CustomerOrderModel.findAll({
    where: {
      account_id,
      customer_id,
    },
    include,
  });

  return orders;
};

const getOrderItemListByCustomerId = async ({
  account_id, customer_id, page_no, page_size, sort_by, sort_order,
}) => {
  const limit = page_size;
  const offset = (page_no - 1) * limit;

  const order = [];
  order.push([sort_by, sort_order]);

  const include = [{
    model: ProductModel,
    where: {
      account_id,
    },
    include: {
      model: ImageModel,
      through: {
        attributes: [],
      },
    },
  }, {
    model: CustomerOrderModel,
    where: {
      customer_id,
      account_id,
    },
  }];

  return CustomerOrderItemModel.findAll({
    include,
    order,
    limit,
    offset,
  });
};

const getOrder = async ({ account_id, customer_id, order_id }) => {
  const order = await CustomerOrderModel.findOne({
    where: {
      account_id,
      customer_id,
      id: order_id,
    },
  });

  if (!order) {
    errorUtils.throwNotFoundError('Order not found');
  }

  return order;
};

const initiateOrder = async ({
  account_id, customer_id, delivery_type, notes, session_id, address_id,
}) => {
  const cartItems = await getProducts({ customer_id });
  if (cartItems.length === 0) {
    errorUtils.throwPreconditionFailed('Cart is empty');
  }
  const cartId = cartItems[0].cart_id;

  const invoice = await getInvoice({ account_id, customer_id });

  const order = await CustomerOrderModel.create({
    account_id,
    customer_id,
    session_id: 1,
    cart_id: cartId,
    items_count: cartItems.length,
    total_price: invoice.total_amount * 100,
    delivery_type: DELIVERY_TYPE.STANDARD,
  });

  const address = await getAddressById({ customer_id, address_id });
  await CustomerOrderAddressModel.create({
    order_id: order.id,
    first_name: address.first_name,
    last_name: address.last_name,
    mobile_no: address.mobile_no,
    address_line_1: address.address_line_1,
    address_line_2: address.address_line_2,
    postal_code: address.postal_code,
    city: address.city,
    state: address.state,
  });

  const orderItems = [];
  cartItems.forEach((eachItems) => {
    const orderItem = {
      order_id: order.id,
      cart_id: cartId,
      product_id: eachItems.product_id,
      quantity: eachItems.quantity,
      price: eachItems.product.price,
    };
    orderItems.push(orderItem);
  });
  console.log(orderItems);
  await CustomerOrderItemModel.bulkCreate(orderItems);
  await updateProductQuantityAfterOrder({ account_id, products: cartItems });

  return order;
};

const finaliseOrder = async ({
  account_id, order_id, customer_id, payment_id,
}) => {
  let order = await CustomerOrderModel.findOne({
    where: {
      id: order_id,
    },
  });

  if (!order) {
    errorUtils.throwNotFoundError('Order not found');
  }

  order.payment_id = payment_id;
  order.status = ORDER_STATUS.PLACED;
  order = await order.save();
  await disableCart({ account_id, customer_id, cart_id: order.cart_id });
  return order;
};

module.exports = {
  getOrdersByCustomerId,
  getOrderItemListByCustomerId,
  getOrder,
  initiateOrder,
  finaliseOrder,
};
