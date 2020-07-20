const express = require('express');
const { authoriser } = require('../middlewares');
const customerAddressRoutes = require('./customer-address.routes');
const customerOrderRoutes = require('./customer-order.routes');
const { customerController } = require('../controllers');

const customerRoutes = express.Router({ mergeParams: true });

// customerRoutes.get('/count', customerController.getListCount);
// customerRoutes.get('/', customerController.getList);
// customerRoutes.get('/:customerId', customerController.getOne);
customerRoutes.post('/sign-up', customerController.signUp);
customerRoutes.post('/sign-in', customerController.signIn);
customerRoutes.post('/sign-out', authoriser, customerController.signOut);
customerRoutes.use('/addresses', customerAddressRoutes);
customerRoutes.use('/orders', customerOrderRoutes);

module.exports = customerRoutes;
