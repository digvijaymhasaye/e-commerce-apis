/* eslint-disable prefer-destructuring */
const { v4: uuid } = require('uuid');
const crypto = require('crypto');
const sequelize = require('sequelize');
const { PaymentModel, CustomerModel } = require('../managers').sequelizeManager;
const { errorUtils } = require('../utils');
const { PAYMENT_STATUS, USER_TYPE } = require('../consts');
const razorpayInstance = require('../managers').razorpay;
const config = require('../config');

const { Op } = sequelize;

const getPaymentCount = async ({
  account_id, status,
}) => {
  const where = {
    account_id,
    payer_type: USER_TYPE.CUSTOMER,
  };

  if (status) {
    where.status = status;
  }

  return PaymentModel.count({
    where,
  });
};

const getPaymentStats = async ({ account_id }) => {
  const stats = {};

  const currentDateTime = new Date();
  const currentDate = currentDateTime.toISOString().split('T')[0];
  const dailyPayment = await PaymentModel.findOne({
    where: {
      account_id,
      created_at: {
        [Op.gte]: currentDate,
      },
    },
    attributes: [
      [sequelize.fn('sum', sequelize.col('amount')), 'daily_payment'],
    ],
    group: ['account_id'],
  });

  stats.daily_payment = dailyPayment ? dailyPayment.dataValues.daily_payment : 0;

  let dateWeekAgo = currentDateTime;
  dateWeekAgo.setDate(currentDateTime.getDate() - 7);
  dateWeekAgo = dateWeekAgo.toISOString().split('T')[0];

  const weeklyPayment = await PaymentModel.findOne({
    where: {
      account_id,
      created_at: {
        [Op.gte]: dateWeekAgo,
      },
    },
    attributes: [
      [sequelize.fn('sum', sequelize.col('amount')), 'weekly_payment'],
    ],
    group: ['account_id'],
  });

  stats.weekly_payment = weeklyPayment ? weeklyPayment.dataValues.weekly_payment : 0;

  const totalPayment = await PaymentModel.findOne({
    where: {
      account_id,
    },
    attributes: [
      [sequelize.fn('sum', sequelize.col('amount')), 'total_payment'],
    ],
    group: ['account_id'],
  });

  stats.total_payment = totalPayment ? totalPayment.dataValues.total_payment : 0;

  return stats;
};

const getPaymentList = async ({
  account_id, page_no, page_size, sort_by, sort_order, status, include_customer,
}) => {
  const limit = page_size;
  const offset = (page_no - 1) * limit;

  const where = {
    account_id,
    payer_type: USER_TYPE.CUSTOMER,
  };

  if (status) {
    where.status = status;
  }

  const include = [];

  if (include_customer) {
    include.push({
      model: CustomerModel,
    });
  }

  const order = [];
  order.push([sort_by, sort_order]);


  return PaymentModel.findAll({
    where,
    include,
    order,
    limit,
    offset,
  });
};

const getPayment = async ({ account_id, payment_id }) => {
  const payment = await PaymentModel.findOne({
    where: {
      account_id,
      id: payment_id,
    },
    include: {
      model: CustomerModel,
    },
  });

  if (!payment) {
    errorUtils.throwNotFoundError('Payment not found');
  }

  return payment;
};

const initiatePayment = async ({
  account_id, customer_id, amount, order_id, type,
}) => {
  const orderBody = {
    amount,
    currency: 'INR',
    receipt: uuid(),
    payment_capture: 0,
    notes: {
      order_id,
    },
  };

  const razorpayOrder = await razorpayInstance.orders.create(orderBody);

  console.info(razorpayOrder);
  const payment = await PaymentModel.create({
    account_id,
    payer_type: 1,
    payer_id: customer_id,
    order_id,
    rzp_payment_method: razorpayOrder.method,
    rzp_order_id: razorpayOrder.id,
    entity: razorpayOrder.entity,
    amount: razorpayOrder.amount,
    payment_capture: razorpayOrder.payment_capture,
    amount_paid: razorpayOrder.amount_paid,
    amount_due: razorpayOrder.amount_due,
    currency: razorpayOrder.currency,
    receipt: razorpayOrder.receipt,
    offer_id: razorpayOrder.offer_id,
    rzp_status: razorpayOrder.status,
    attempts: razorpayOrder.attempts,
    notes: JSON.stringify(razorpayOrder.notes),
    rzp_created_at: razorpayOrder.created_at,
    status: PAYMENT_STATUS.AUTHORIZED,
  });

  return {
    id: payment.id,
    rzp_order_id: payment.rzp_order_id,
    rzp_status: payment.rzp_status,
    status: payment.status,
  };
};

const capturePayment = async ({
  account_id, customer_id, payment_id, rzp_order_id, rzp_payment_id, rzp_signature,
}) => {
  const payment = await getPayment({ account_id, customer_id, payment_id });

  if (payment.status === PAYMENT_STATUS.CAPTURED) {
    errorUtils.throwPreconditionFailed('Payment is already captured');
  }

  const generatedSignature = crypto.createHmac('sha256', config.RAZORPAY_KEY_SECRET)
    .update(`${rzp_order_id}|${rzp_payment_id}`)
    .digest('hex');

  if (generatedSignature !== rzp_signature) {
    errorUtils.throwPreconditionFailed('Invalid signature');
  }

  await razorpayInstance.payments.capture(rzp_payment_id, payment.amount, payment.currency);

  payment.rzp_status = 'captured';
  payment.rzp_payment_id = rzp_payment_id;
  payment.status = PAYMENT_STATUS.CAPTURED;
  await payment.save();
  return {
    id: payment.id,
    order_id: payment.order_id,
    status: payment.status,
  };
};

module.exports = {
  getPaymentCount,
  getPaymentStats,
  getPaymentList,
  getPayment,
  initiatePayment,
  capturePayment,
};
