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

CategoryModel.hasMany(ProductModel, { foreignKey: 'category_id' });
ProductModel.belongsTo(CategoryModel, { foreignKey: 'category_id' });

// OfferModel.hasOne(ProductModel, { foreignKey: 'type_id' });
// ProductModel.belongsTo(OfferModel, { foreignKey: 'type_id' });

ProductModel.belongsToMany(ImageModel, { through: ProductImageMapModel, foreignKey: 'product_id' });
ImageModel.belongsToMany(ProductModel, { through: ProductImageMapModel, foreignKey: 'image_id' });

// CategoryModel.hasMany(ImageModel, { foreignKey: 'type_id' });
// ImageModel.belongsTo(CategoryModel, { foreignKey: 'type_id' });

// OfferModel.hasMany(ImageModel, { foreignKey: 'type_id' });
// ImageModel.belongsTo(OfferModel, { foreignKey: 'type_id' });

CouponModel.hasOne(CouponAudienceModel, { foreignKey: 'coupon_id' });
CouponAudienceModel.belongsTo(CouponModel, { foreignKey: 'coupon_id' });

CouponAudienceModel.hasMany(UserGroupModel, { foreignKey: 'type_id' });
UserGroupModel.belongsTo(CouponAudienceModel, { foreignKey: 'type_id' });

// UserGroupModel.belongsToMany(UserModel, { through: UserGroupUserMapModel, foreignKey: 'user_group_id' });
// UserModel.belongsToMany(UserGroupModel, { through: UserGroupUserMapModel, foreignKey: 'user_id' });

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
};
