const express = require('express');
const customerAddressRoutes = require('./customer-address.routes');
const { customerController } = require('../controllers');

const customerRoutes = express.Router({ mergeParams: true });

// customerRoutes.get('/count', customerController.getListCount);
// customerRoutes.get('/', customerController.getList);
// customerRoutes.get('/:customerId', customerController.getOne);
customerRoutes.post('/sign-up', customerController.signUp);
// customerRoutes.post('/sign-in', customerController.signIn);
customerRoutes.get('/addresses', customerAddressRoutes);

module.exports = customerRoutes;
