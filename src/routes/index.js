const express = require('express');
const { authoriser } = require('../middlewares');
const userRoutes = require('./user.routes');
const productRoutes = require('./product.routes');
const categoryRoutes = require('./category.routes');
const offerRoutes = require('./offer.routes');
const cartRoutes = require('./cart.routes');
const imageRoutes = require('./image.routes');
const customerRoutes = require('./customer.routes');
const otpRoutes = require('./otp.routes');

const apiRoutes = express.Router();

apiRoutes.use('/users', userRoutes);
apiRoutes.use('/products', authoriser, productRoutes);
apiRoutes.use('/categories', authoriser, categoryRoutes);
apiRoutes.use('/offers', authoriser, offerRoutes);
apiRoutes.use('/images', imageRoutes);
apiRoutes.use('/carts', cartRoutes);
apiRoutes.use('/customers', customerRoutes);
apiRoutes.use('/otp', otpRoutes);

// apiRoutes.use('*', (req, res) => res.status(handlers.response.STATUS.NOT_FOUND)
//   .send(handlers.response.getErrorPayload('Route Not Found', handlers.response.STATUS.NOT_FOUND)));

module.exports = apiRoutes;
