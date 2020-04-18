const express = require('express');
const productRoutes = require('./product.routes');
const categoryRoutes = require('./category.routes');
const offerRoutes = require('./offer.routes');
const bannerRoutes = require('./banner.routes.js');
const imageRoutes = require('./image.routes.js');

const apiRoutes = express.Router();

apiRoutes.use('/products', productRoutes);
apiRoutes.use('/categories', categoryRoutes);
apiRoutes.use('/offers', offerRoutes);
apiRoutes.use('/banners', bannerRoutes);
apiRoutes.use('/images', imageRoutes);

// apiRoutes.use('*', (req, res) => res.status(handlers.response.STATUS.NOT_FOUND)
//   .send(handlers.response.getErrorPayload('Route Not Found', handlers.response.STATUS.NOT_FOUND)));

module.exports = apiRoutes;
