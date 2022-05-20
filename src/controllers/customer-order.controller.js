const { successUtils } = require('../utils');
const { customerOrderService } = require('../services');
const {
  getId, getListValidation, initiateCustomerOrderValidation,
  updateOrderedProductValidation,
} = require('../validations');

const getOrderStats = async (req, res, next) => {
  try {
    const stats = await customerOrderService.getOrderStats({
      account_id: req.headers.account_id,
    });
    return successUtils.handler({ stats }, req, res);
  } catch (error) {
    return next(error);
  }
};

const getAllCustomersOrder = async (req, res, next) => {
  try {
    const validatedQueryParams = await getListValidation.validate(req.query);
    const orders = await customerOrderService.getOrders({
      account_id: req.headers.account_id,
      ...validatedQueryParams,
    });
    return successUtils.handler({ orders }, req, res);
  } catch (error) {
    return next(error);
  }
};

const getOrderItemListByCustomerId = async (req, res, next) => {
  const { customerId } = req.params;
  try {
    const validCustomerId = await getId.validate(customerId);
    const validatedQueryParams = await getListValidation.validate(req.query);
    const orders = await customerOrderService.getOrderItemListByCustomerId({
      account_id: req.headers.account_id,
      customer_id: validCustomerId,
      ...validatedQueryParams,
    });
    return successUtils.handler({ orders }, req, res);
  } catch (error) {
    return next(error);
  }
};

const getCustomerOrders = async (req, res, next) => {
  try {
    const orders = await customerOrderService.getOrdersByCustomerId({
      account_id: req.headers.account_id,
      customer_id: req.headers.customer_id,
      ...req.query,
    });
    return successUtils.handler({ orders }, req, res);
  } catch (error) {
    return next(error);
  }
};

const getCustomerOrderByOrderId = async (req, res, next) => {
  try {
    const { customerId, orderId } = req.params;
    const validatedOrderId = await getId.validate(orderId);
    const validatedCustomerId = await getId.validate(customerId);
    const customerOrder = await customerOrderService.getOrderByCustomerIdOrderId({
      account_id: req.headers.account_id,
      customer_id: validatedCustomerId,
      order_id: validatedOrderId,
    });
    return successUtils.handler({ customer_order: customerOrder }, req, res);
  } catch (error) {
    return next(error);
  }
};

const initiateOrder = async (req, res, next) => {
  try {
    const validOrderBody = await initiateCustomerOrderValidation.validate(req.body);
    const order = await customerOrderService.initiateOrder({
      account_id: req.headers.account_id,
      customer_id: req.headers.customer_id,
      ...validOrderBody,
    });
    return successUtils.handler({ order }, req, res);
  } catch (error) {
    return next(error);
  }
};

const finaliseOrder = async (req, res, next) => {
  console.info(`finalise orders-> headers -> ${JSON.stringify(req.headers)}`);
  console.info(`finalise orders-> params -> ${JSON.stringify(req.params)}`);
  const { orderId } = req.params;
  try {
    const validatedOrderId = await getId.validate(orderId);
    const order = await customerOrderService.finaliseOrder({
      account_id: req.headers.account_id,
      customer_id: req.headers.customer_id,
      order_id: validatedOrderId,
      ...req.body,
    });
    return successUtils.handler({ order }, req, res);
  } catch (error) {
    return next(error);
  }
};

const updateOrderStatusByOrderId = async (req, res, next) => {
  try {
    const { customerId, orderId, status } = req.params;

    const validCustomerId = await getId.validate(customerId);
    const validOrderId = await getId.validate(orderId);
    const { status: validStatus } = await getListValidation.required().validate({ status });
    const customerOrder = await customerOrderService.updateOrderStatusByOrderId({
      account_id: req.headers.account_id,
      customer_id: validCustomerId,
      order_id: validOrderId,
      status: validStatus,
    });
    return successUtils.handler({ customer_order: customerOrder }, req, res);
  } catch (error) {
    return next(error);
  }
};

const updateOrderedProduct = async (req, res, next) => {
  const { orderId, productId } = req.params;
  try {
    const validOrderId = await getId.validate(orderId);
    const validProductId = await getId.validate(productId);
    const validReqBody = await updateOrderedProductValidation.validate(req.body);
    const orderedProduct = await customerOrderService.updateOrderedProduct({
      account_id: req.headers.account_id,
      customer_id: req.headers.customer_id,
      order_id: validOrderId,
      product_id: validProductId,
      ...validReqBody,
    });
    return successUtils.handler({ product: orderedProduct }, req, res);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getOrderStats,
  getAllCustomersOrder,
  initiateOrder,
  finaliseOrder,
  getCustomerOrders,
  getOrderItemListByCustomerId,
  getCustomerOrderByOrderId,
  updateOrderStatusByOrderId,
  updateOrderedProduct,
};
