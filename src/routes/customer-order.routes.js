const express = require('express');
const { customerOrderController } = require('../controllers');

const customerOrderRoutes = express.Router({ mergeParams: true });

customerOrderRoutes.get('/', customerOrderController.getCustomerOrders);
customerOrderRoutes.post('/initiate', customerOrderController.initiateOrder);
customerOrderRoutes.post('/:orderId/finalise', customerOrderController.finaliseOrder);

module.exports = customerOrderRoutes;
