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
};
