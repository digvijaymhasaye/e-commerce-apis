const { v4: uuid } = require('uuid');
const crypto = require('crypto');
const { PaymentModel } = require('../managers').sequelizeManager;
const { errorUtils } = require('../utils');
const { PAYMENT_STATUS } = require('../consts');
const razorpayInstance = require('../managers').razorpay;
const config = require('../config');

const getPayment = async ({ account_id, customer_id, payment_id }) => {
  const payment = await PaymentModel.findOne({
    where: {
      account_id,
      customer_id,
      id: payment_id,
    },
  });

  if (!payment) {
    errorUtils.throwNotFoundError('Payment not found');
  }

  return payment;
};

const initiatePayment = async ({
  account_id, customer_id, amount,
}) => {
  const orderBody = {
    amount,
    currency: 'INR',
    receipt: uuid(),
    payment_capture: 0,
  };

  const razorpayOrder = await razorpayInstance.orders.create(orderBody);

  const payment = await PaymentModel.create({
    account_id,
    customer_id,
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
    notes: razorpayOrder.notes,
    rzp_created_at: razorpayOrder.created_at,
    status: PAYMENT_STATUS.AUTHORIZED,
  });

  return {
    id: payment.id,
    rzp_order_id: payment.rp_order_id,
    rzp_status: payment.rp_status,
    status: payment.status,
  };
};

const capturePayment = async ({
  account_id, customer_id, payment_id, rzp_order_id, rzp_payment_id, rzp_signature, amount,
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

  await razorpayInstance.payment.capture(rzp_payment_id, amount, payment.currency);

  payment.rzp_status = 'captured';
  payment.status = PAYMENT_STATUS.CAPTURED;
  await payment.save();
  return {
    id: payment.id,
    status: payment.status,
  };
};

module.exports = {
  initiatePayment,
  capturePayment,
};
