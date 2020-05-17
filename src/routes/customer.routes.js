const express = require('express');
const { customerController } = require('../controllers');

const customerRoutes = express.Router();

customerRoutes.get('/count', customerController.getListCount);
customerRoutes.get('/', customerController.getList);
customerRoutes.get('/:customerId', customerController.getOne);
customerRoutes.post('/sign-up', customerController.signUp);
customerRoutes.post('/sign-in', customerController.signIn);

module.exports = customerRoutes;
