const { Router } = require('express');
const {
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
} = require('../Controllers/paymentsController');
const { isAuthenticated } = require('../Middleware/auth');

const paymentRouter = Router();

paymentRouter.post('/create-order', isAuthenticated, createOrder);
paymentRouter.post('/verify-payment', isAuthenticated, verifyPayment);
paymentRouter.get('/order/:orderId', isAuthenticated, fetchOrder);
paymentRouter.get('/payment/:paymentId', isAuthenticated, fetchPayment);
paymentRouter.post('/refund', isAuthenticated, refundPayment);
paymentRouter.get('/refund/:refundId', isAuthenticated, fetchRefund);
paymentRouter.get('/payments', isAuthenticated, listPayments);
paymentRouter.get('/orders', isAuthenticated, listOrders);
paymentRouter.post('/subscription', isAuthenticated, createSubscription);
paymentRouter.get('/subscription/:subscriptionId', isAuthenticated, fetchSubscription);
paymentRouter.post('/subscription/:subscriptionId/cancel', isAuthenticated, cancelSubscription);
paymentRouter.post('/webhook', webhookHandler);

module.exports = paymentRouter;
