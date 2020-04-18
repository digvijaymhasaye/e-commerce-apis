const Sequelize = require('sequelize');
const {
  product,
  category,
  offer,
  image,
  productImageMap,
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

CategoryModel.hasMany(ProductModel, { foreignKey: 'category_id' });
ProductModel.belongsTo(CategoryModel, { foreignKey: 'category_id' });

OfferModel.hasOne(ProductModel, { foreignKey: 'type_id' });
ProductModel.belongsTo(OfferModel, { foreignKey: 'type_id' });

ProductModel.belongsToMany(ImageModel, { through: ProductImageMapModel, foreignKey: 'product_id' });
ImageModel.belongsToMany(ProductModel, { through: ProductImageMapModel, foreignKey: 'image_id' });

CategoryModel.hasMany(ImageModel, { foreignKey: 'type_id' });
ImageModel.belongsTo(CategoryModel, { foreignKey: 'type_id' });

OfferModel.hasMany(ImageModel, { foreignKey: 'type_id' });
ImageModel.belongsTo(OfferModel, { foreignKey: 'type_id' });

module.exports = {
  sequelize,
  ProductModel,
  CategoryModel,
  OfferModel,
  ImageModel,
  ProductImageMapModel,
};
