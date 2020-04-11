const express = require('express');
const { categoryController, productController } = require('../controllers');

const categoryRoutes = express.Router({ mergeParams: true });

categoryRoutes.get('/count', categoryController.getListCount);
categoryRoutes.get('/', categoryController.getList);
categoryRoutes.post('/', categoryController.addOne);
categoryRoutes.get('/:categoryId', categoryController.getOne);
categoryRoutes.put('/:categoryId', categoryController.updateOne);
categoryRoutes.delete('/:categoryId', categoryController.deleteOne);

// categoryRoutes.get('/:categoryId/products', productController.getListByCategory);

module.exports = categoryRoutes;
