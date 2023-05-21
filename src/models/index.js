const product = require('./product.model');
const category = require('./category.model');
const offer = require('./offer.model');
const image = require('./image.model');
const productImageMap = require('./product-image-map.model');
const coupon = require('./coupon.model');
const couponAudienceMap = require('./coupon-audience-map.model');
const userGroupUserMap = require('./customer-group-customer-map.model');
const userGroup = require('./customer-group.model');
const user = require('./user.model');
const cart = require('./cart.model');
const cartItem = require('./cart-item.model');
const order = require('./order.model');
const orderItem = require('./order-item.model');
const customerOrder = require('./customer-order.model');
const customerOrderItem = require('./customer-order-item.model');
const session = require('./session.model');
const customerOrderAddress = require('./customer-order-address.model');
const customer = require('./customer.model');
const customerDeviceInfo = require('./customer-device-info.model');
const customerAddress = require('./customer-address.model');
const payment = require('./payment.model');
const feedback = require('./feedback.model');
const unit = require('./unit.model');

module.exports = {
  product,
  category,
  offer,
  image,
  productImageMap,
  coupon,
  couponAudienceMap,
  userGroupUserMap,
  userGroup,
  user,
  cart,
  cartItem,
  order,
  orderItem,
  session,
  customerOrderAddress,
  customer,
  customerOrder,
  customerOrderItem,
  customerDeviceInfo,
  customerAddress,
  payment,
  feedback,
  unit,
};
