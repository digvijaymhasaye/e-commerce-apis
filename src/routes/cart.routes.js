const express = require('express');
const { cartController } = require('../controllers');

const cartRoutes = express.Router({ mergeParams: true });

cartRoutes.post('/products', cartController.addCartItem);
cartRoutes.get('/products/count', cartController.getCartItemsCount);
cartRoutes.get('/products', cartController.getCartItems);
cartRoutes.get('/products/:productId', cartController.getCartProduct);
cartRoutes.delete('/products/:productId', cartController.removeCartProduct);

module.exports = cartRoutes;
