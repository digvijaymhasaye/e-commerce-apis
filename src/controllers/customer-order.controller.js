const { successUtils } = require('../utils');
const { customerOrderService } = require('../services');
const { getId } = require('../validations');

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

const initiateOrder = async (req, res, next) => {
  try {
    const order = await customerOrderService.initiateOrder({
      account_id: req.headers.account_id,
      customer_id: req.headers.customer_id,
      ...req.body,
    });
    return successUtils.handler({ order }, req, res);
  } catch (error) {
    return next(error);
  }
};

const finaliseOrder = async (req, res, next) => {
  const { orderId } = req.params;
  try {
    const validatedOrderId = getId.validate(orderId);
    const order = await customerOrderService.finaliseOrder({
      account_id: req.headers.account_id,
      customer_id: req.headers.customer_id,
      order_id: validatedOrderId, 
    });
    return successUtils.handler({ order }, req, res);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  initiateOrder,
  finaliseOrder,
  getCustomerOrders,
};