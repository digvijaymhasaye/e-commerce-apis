const express = require('express');
const { customerOrderController } = require('../controllers');

const customerOrderRoutes = express.Router({ mergeParams: true });

customerOrderRoutes.get('/products/count', customerOrderController.getOrderItemListByCustomerId);
customerOrderRoutes.get('/products', customerOrderController.getOrderItemListByCustomerId);

customerOrderRoutes.get('/stats', customerOrderController.getOrderStats);
customerOrderRoutes.get('/', customerOrderController.getAllCustomersOrder);
customerOrderRoutes.get('/', customerOrderController.getCustomerOrders);
customerOrderRoutes.get('/:orderId', customerOrderController.getCustomerOrderByOrderId);
customerOrderRoutes.put('/:orderId/status/:status', customerOrderController.updateOrderStatusByOrderId);
customerOrderRoutes.post('/initiate', customerOrderController.initiateOrder);
customerOrderRoutes.post('/:orderId/finalise', customerOrderController.finaliseOrder);


module.exports = customerOrderRoutes;
