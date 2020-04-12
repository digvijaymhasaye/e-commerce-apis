const express = require('express');
const { offerController } = require('../controllers');

const offerRoutes = express.Router({ mergeParams: true });

offerRoutes.get('/count', offerController.getListCount);
offerRoutes.get('/', offerController.getList);
offerRoutes.post('/', offerController.addOne);
offerRoutes.get('/:offerId', offerController.getOne);
offerRoutes.put('/:offerId', offerController.updateOne);
offerRoutes.delete('/:offerId', offerController.deleteOne);

module.exports = offerRoutes;
