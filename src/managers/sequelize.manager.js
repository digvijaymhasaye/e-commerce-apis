const Sequelize = require('sequelize');
const {
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
  otp,
} = require('../models');
const config = require('../config');


const sequelize = new Sequelize(config.MYSQL_DB_NAME, config.MYSQL_USERNAME, config.MYSQL_PASSWORD, {
  host: config.MYSQL_HOST,
  dialect: 'mysql',
  logging: true,
  dialectOptions: {
    charset: 'utf8mb4',
  },
  define: {
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true,
  },
});

sequelize.sync();

const ProductModel = product(sequelize, Sequelize);
const CategoryModel = category(sequelize, Sequelize);
const OfferModel = offer(sequelize, Sequelize);
const ImageModel = image(sequelize, Sequelize);
const ProductImageMapModel = productImageMap(sequelize, Sequelize);
const CouponModel = coupon(sequelize, Sequelize);
const CouponAudienceModel = couponAudienceMap(sequelize, Sequelize);
const UserGroupUserMapModel = userGroupUserMap(sequelize, Sequelize);
const UserGroupModel = userGroup(sequelize, Sequelize);
const UserModel = user(sequelize, Sequelize);
const CartModel = cart(sequelize, Sequelize);
const CartItemModel = cartItem(sequelize, Sequelize);
const OrderModel = order(sequelize, Sequelize);
const OrderItemModel = orderItem(sequelize, Sequelize);
const CustomerOrderModel = customerOrder(sequelize, Sequelize);
const CustomerOrderItemModel = customerOrderItem(sequelize, Sequelize);
const SessionModel = session(sequelize, Sequelize);
const CustomerOrderAddressModel = customerOrderAddress(sequelize, Sequelize);
const CustomerModel = customer(sequelize, Sequelize);
const OtpModel = otp(sequelize, Sequelize);

CategoryModel.hasMany(ProductModel, { foreignKey: 'category_id' });
ProductModel.belongsTo(CategoryModel, { foreignKey: 'category_id' });

// OfferModel.hasOne(ProductModel, { foreignKey: 'type_id' });
// ProductModel.belongsTo(OfferModel, { foreignKey: 'type_id' });

ProductModel.belongsToMany(ImageModel, { through: ProductImageMapModel, foreignKey: 'id' });
ImageModel.belongsToMany(ProductModel, { through: ProductImageMapModel, foreignKey: 'image_id' });

CategoryModel.belongsTo(ImageModel, { foreignKey: 'image_id' });
ImageModel.hasOne(CategoryModel, { foreignKey: 'image_id' });

// OfferModel.hasMany(ImageModel, { foreignKey: 'type_id' });
// ImageModel.belongsTo(OfferModel, { foreignKey: 'type_id' });

CouponModel.hasOne(CouponAudienceModel, { foreignKey: 'coupon_id' });
CouponAudienceModel.belongsTo(CouponModel, { foreignKey: 'coupon_id' });

CouponAudienceModel.hasMany(UserGroupModel, { foreignKey: 'type_id' });
UserGroupModel.belongsTo(CouponAudienceModel, { foreignKey: 'type_id' });

// UserGroupModel.belongsToMany(UserModel, { through: UserGroupUserMapModel, foreignKey: 'user_group_id' });
// UserModel.belongsToMany(UserGroupModel, { through: UserGroupUserMapModel, foreignKey: 'user_id' });

CustomerModel.hasOne(CartModel, { foreignKey: 'customer_id' });
CartModel.belongsTo(CustomerModel, { foreignKey: 'customer_id' });

CartModel.hasMany(CartItemModel, { foreignKey: 'cart_id' });
CartItemModel.belongsTo(CartModel, { foreignKey: 'cart_id' });

ProductModel.hasMany(CartItemModel, { foreignKey: 'product_id' });
CartItemModel.belongsTo(ProductModel, { foreignKey: 'product_id' });

CustomerModel.hasOne(CustomerOrderModel, { foreignKey: 'customer_id' });
CustomerOrderModel.belongsTo(CustomerModel, { foreignKey: 'customer_id' });

CustomerOrderModel.hasMany(CustomerOrderItemModel, { foreignKey: 'order_id' });
CustomerOrderItemModel.belongsTo(CustomerOrderModel, { foreignKey: 'order_id' });

OrderItemModel.belongsTo(ProductModel, { foreignKey: 'product_id' });
ProductModel.hasMany(OrderItemModel, { foreignKey: 'product_id' });

CustomerOrderModel.hasMany(CustomerOrderAddressModel, { foreignKey: 'order_id' });
CustomerOrderAddressModel.belongsTo(CustomerOrderModel, { foreignKey: 'order_id' });


module.exports = {
  sequelize,
  ProductModel,
  CategoryModel,
  OfferModel,
  ImageModel,
  ProductImageMapModel,
  CouponModel,
  CouponAudienceModel,
  UserGroupUserMapModel,
  UserGroupModel,
  UserModel,
  CartModel,
  CartItemModel,
  OrderModel,
  OrderItemModel,
  SessionModel,
  CustomerOrderModel,
  CustomerOrderItemModel,
  CustomerOrderAddressModel,
  CustomerModel,
  OtpModel,
};
