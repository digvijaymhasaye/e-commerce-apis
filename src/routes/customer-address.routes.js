const express = require('express');
const { customerAddressController } = require('../controllers');

const customerAddressRoutes = express.Router({ mergeParams: true });

// customerAddressRoutes.get('/count', customerAddressController.getAddressCount);
customerAddressRoutes.get('/', customerAddressController.getAddress);
// customerAddressRoutes.get('/:addressId', customerAddressController.getAddress);
customerAddressRoutes.post('/', customerAddressController.addAddress);
// customerAddressRoutes.put('/:addressId', customerAddressController.updateAddress);

module.exports = customerAddressRoutes;
