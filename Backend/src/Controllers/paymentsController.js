const { Request, Response } = require('express');
const razorpayInstance = require('../service/razorpay.service');
const crypto = require('crypto');

const createOrder = async (req, res) => {
  const { amount, currency, receipt, payment_capture } = req.body;

  try {
    const options = {
      amount: amount * 100, // Amount in paise
      currency,
      receipt,
      payment_capture,
    };
    const order = await razorpayInstance.orders.create(options);
    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  try {
    const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generated_signature === razorpay_signature) {
      res.json({ status: 'success' });
    } else {
      res.status(400).json({ status: 'failure' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const fetchOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await razorpayInstance.orders.fetch(orderId);
    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const fetchPayment = async (req, res) => {
  const { paymentId } = req.params;

  try {
    const payment = await razorpayInstance.payments.fetch(paymentId);
    res.json(payment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const refundPayment = async (req, res) => {
  const { payment_id, amount } = req.body;

  try {
    const refund = await razorpayInstance.payments.refund(payment_id, { amount: amount * 100 });
    res.json(refund);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const fetchRefund = async (req, res) => {
  const { refundId } = req.params;

  try {
    const refund = await razorpayInstance.refunds.fetch(refundId);
    res.json(refund);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const listPayments = async (req, res) => {
  const { from, to, count, skip } = req.query;

  try {
    const payments = await razorpayInstance.payments.all({
      from,
      to,
      count: parseInt(count, 10),
      skip: parseInt(skip, 10),
    });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const listOrders = async (req, res) => {
  const { from, to, count, skip } = req.query;

  try {
    const orders = await razorpayInstance.orders.all({
      from,
      to,
      count: parseInt(count, 10),
      skip: parseInt(skip, 10),
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createSubscription = async (req, res) => {
  const { plan_id, customer_notify, total_count, quantity, start_at, expire_by } = req.body;

  try {
    const subscription = await razorpayInstance.subscriptions.create({
      plan_id,
      customer_notify,
      total_count,
      quantity,
      start_at,
      expire_by,
    });
    res.json(subscription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const fetchSubscription = async (req, res) => {
  const { subscriptionId } = req.params;

  try {
    const subscription = await razorpayInstance.subscriptions.fetch(subscriptionId);
    res.json(subscription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const cancelSubscription = async (req, res) => {
  const { subscriptionId } = req.params;

  try {
    const subscription = await razorpayInstance.subscriptions.cancel(subscriptionId);
    res.json(subscription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const webhookHandler = async (req, res) => {
  // Handle Razorpay webhook events here
  res.json({ status: 'ok' });
};

module.exports = {
  createOrder,
  verifyPayment,
  fetchOrder,
  fetchPayment,
  refundPayment,
  fetchRefund,
  listPayments,
  listOrders,
  createSubscription,
  fetchSubscription,
  cancelSubscription,
  webhookHandler,
};
