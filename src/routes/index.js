const express = require('express');
const productRoutes = require('./product.routes');
const categoryRoutes = require('./category.routes');
const offerRoutes = require('./offer.routes');

const apiRoutes = express.Router();

apiRoutes.use('/products', productRoutes);
apiRoutes.use('/categories', categoryRoutes);
apiRoutes.use('/offers', offerRoutes);
// apiRoutes.use('*', (req, res) => res.status(handlers.response.STATUS.NOT_FOUND)
//   .send(handlers.response.getErrorPayload('Route Not Found', handlers.response.STATUS.NOT_FOUND)));

module.exports = apiRoutes;
