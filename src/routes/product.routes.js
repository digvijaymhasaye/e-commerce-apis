const express = require('express');
const { productController } = require('../controllers');

const productRoutes = express.Router({ mergeParams: true });

productRoutes.get('/count', productController.getListCount);
productRoutes.get('/', productController.getList);
productRoutes.post('/', productController.addOne);
productRoutes.get('/:productId', productController.getOne);
productRoutes.put('/:productId', productController.updateOne);
productRoutes.delete('/:productId', productController.deleteOne);

module.exports = productRoutes;
