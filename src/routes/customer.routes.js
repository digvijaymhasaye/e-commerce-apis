const express = require('express');
const { authoriser } = require('../middlewares');
const customerAddressRoutes = require('./customer-address.routes');
const customerOrderRoutes = require('./customer-order.routes');
const { customerController } = require('../controllers');

const customerRoutes = express.Router({ mergeParams: true });

customerRoutes.use('/:customerId/addresses', authoriser, customerAddressRoutes);
customerRoutes.use('/orders', authoriser, customerOrderRoutes);
customerRoutes.use('/:customerId/orders', customerOrderRoutes);
customerRoutes.get('/stats', authoriser, customerController.getCustomerStats);
customerRoutes.get('/count', customerController.getListCount);
customerRoutes.get('/', customerController.getList);
customerRoutes.get('/:customerId', customerController.getCustomer);
customerRoutes.post('/sign-up', customerController.signUp);
customerRoutes.post('/sign-in', customerController.signIn);
customerRoutes.post('/sign-out', customerController.signOut);

module.exports = customerRoutes;
