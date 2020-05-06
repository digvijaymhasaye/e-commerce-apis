const express = require('express');
const { orderController } = require('../controllers');

const orderRoutes = express.Router({ mergeParams: true });

orderRoutes.get('/', orderController.getList);
orderRoutes.post('/', orderController.addOne);

