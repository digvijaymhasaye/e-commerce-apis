const { Op } = require('sequelize');
const {
  PaymentModel, CustomerModel, CustomerOrderModel,
  CustomerOrderAddressModel, CustomerOrderItemModel,
  ProductModel, ImageModel, ProductImageMapModel,
} = require('../managers/sequelize.manager');
const { getProducts, getInvoice, disableCart } = require('./cart.service');
const { getAddressById } = require('./customer-address.service');
const { updateProductQuantityAfterOrder } = require('./product.service');
const { sendToAdmins } = require('./notification.service');
const { getOne } = require('./customer.service');
const { errorUtils, pushNotificationTemplate } = require('../utils');
const { DELIVERY_TYPE, ORDER_STATUS, TYPE } = require('../consts');

const getOrderStats = async ({ account_id }) => {
  const stats = {};

  const pendingOrdersCount = await CustomerOrderModel.count({
    where: {
      account_id,
      status: [ORDER_STATUS.PLACED, ORDER_STATUS.RECEIVED],
    },
  });

  stats.pending_orders = pendingOrdersCount;

  let currentDate = new Date().toISOString();
  // eslint-disable-next-line prefer-destructuring
  currentDate = currentDate.split('T')[0];
  const todaysOrdersCount = await CustomerOrderModel.count({
    where: {
      account_id,
      status: [ORDER_STATUS.PLACED, ORDER_STATUS.RECEIVED, ORDER_STATUS.OUT_FOR_DELIVERY, ORDER_STATUS.DELIVERED, ORDER_STATUS.CANCELLED],
      created_at: {
        [Op.gte]: currentDate,
      },
    },
  });

  stats.todays_orders = todaysOrdersCount;

  const totalOrders = await CustomerOrderModel.count({
    where: {
      account_id,
      status: [ORDER_STATUS.PLACED, ORDER_STATUS.RECEIVED, ORDER_STATUS.OUT_FOR_DELIVERY, ORDER_STATUS.DELIVERED, ORDER_STATUS.CANCELLED],
    },
  });

  stats.total_orders = totalOrders;

  return stats;
};

const getOrders = async ({
  account_id, sort_by, sort_order, status, page_no, page_size,
}) => {
  const include = [{
    model: CustomerModel,
  }];

  const where = {
    account_id,
  };

  if (status) {
    where.status = status;
  }

  const order = [[sort_by, sort_order]];
  const limit = page_size;
  const offset = (page_no - 1) * limit;
  const orders = await CustomerOrderModel.findAll({
    where,
    include,
    order,
    limit,
    offset,
  });

  return orders;
};

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

const getOrderByCustomerIdOrderId = async ({ account_id, customer_id, order_id }) => {
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
      },
    },
  }, {
    model: PaymentModel,
  }];

  const orders = await CustomerOrderModel.findOne({
    where: {
      account_id,
      customer_id,
      id: order_id,
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
  account_id, customer_id, delivery_type, notes, session_id, address_id, payment_type,
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
    session_id: session_id || 1,
    cart_id: cartId,
    items_count: cartItems.length,
    total_price: invoice.total_amount * 100,
    delivery_type: delivery_type || DELIVERY_TYPE.STANDARD,
    payment_type,
    notes,
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

  const customer = await getOne({ account_id, id: customer_id });
  const orderItems = await getOrderItemListByCustomerId({
    account_id, customer_id, page_no: 1, page_size: 100, sort_by: 'created_at', sort_order: 'desc',
  });

  const notification = await pushNotificationTemplate.create(TYPE.NOTIFICATIONS.TITLE.NEW_ORDER, null, { orderItems, customer });

  await sendToAdmins({ account_id, title: notification.title, message: notification.message });

  return order;
};

const updateOrderStatusByOrderId = async ({
  account_id, customer_id, order_id, status,
}) => {
  console.info(`==============> ${status}`);
  const order = await getOrder({ account_id, customer_id, order_id });

  order.status = status;
  console.log('Update===================', JSON.stringify(order));
  return order.save();
};

module.exports = {
  getOrderStats,
  getOrders,
  getOrdersByCustomerId,
  getOrderItemListByCustomerId,
  getOrder,
  initiateOrder,
  finaliseOrder,
  getOrderByCustomerIdOrderId,
  updateOrderStatusByOrderId,
};
