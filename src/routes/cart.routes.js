const express = require('express');
const { cartController } = require('../controllers');

const cartRoutes = express.Router();

cartRoutes.post('/products', cartController.addCartItem);
cartRoutes.get('/products/count', cartController.getCartItemsCount);
cartRoutes.get('/products', cartController.getCartItems);

module.exports = cartRoutes;
