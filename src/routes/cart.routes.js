const express = require('express');
const { cartController } = require('../controllers');

const cartRoutes = express.Router();

cartRoutes.post('/', cartController.addCartItem);
cartRoutes.get('/:cartId/items/count', cartController.getCartItemsCount);
cartRoutes.get('/:cartId/items', cartController.getCartItems);

module.exports = cartRoutes;
