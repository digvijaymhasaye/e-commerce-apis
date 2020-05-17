const express = require('express');
const { imageController } = require('../controllers');

const imageRoutes = express.Router();

imageRoutes.get('/count', imageController.getCount);
imageRoutes.get('/', imageController.getList);
imageRoutes.get('/:imageId', imageController.getOne);
imageRoutes.post('/', imageController.addOne);
imageRoutes.delete('/:imageId', imageController.deleteOne);

module.exports = imageRoutes;
