const { Op } = require('sequelize');
const {
  ProductModel, CategoryModel, OfferModel, CouponModel,
  ImageModel, ProductImageMapModel,
} = require('../managers').sequelizeManager;
const { STATUS } = require('../consts');
const { getOne: getCategory } = require('./category.service');

const getListCount = async ({
  account_id, status, search, ids, category_id,
}) => {
  const where = {
    account_id,
  };

  if (category_id) {
    where.category_id = category_id;
  }

  if (status) {
    where.status = status;
  }

  if (search) {
    where.name = {
      [Op.like]: `%${search}%`,
    };
  }

  if (ids) {
    where.id = {
      [Op.in]: ids,
    };
  }

  return ProductModel.count({
    where,
  });
};

const getList = async ({
  account_id, category_id, page_no, page_size, sort_by, sort_order, status, search, ids,
  include_category, include_offer, include_coupons,
}) => {
  const limit = page_size;
  const offset = (page_no - 1) * limit;

  const where = {
    account_id,
  };

  if (category_id) {
    where.category_id = category_id;
  }

  if (status) {
    where.status = status;
  }

  if (search) {
    where.name = {
      [Op.like]: `%${search}%`,
    };
  }

  if (ids) {
    where.id = {
      [Op.in]: ids,
    };
  }

  const include = [{
    model: ImageModel,
    through: {
      attributes: [],
    },
  }];

  if (include_category) {
    include.push({
      model: CategoryModel,
    });
  }

  if (include_offer) {
    // TODO Add condition for validity and offer type
    include.push({
      model: OfferModel,
    });
  }

  if (include_coupons) {
    // TODO Add condition for validity and coupon type
    include.push({
      model: CouponModel,
    });
  }

  const order = [];
  order.push([sort_by, sort_order]);


  return ProductModel.findAll({
    where,
    include,
    order,
    offset,
    limit,
  });
};

const getOne = async ({ id, account_id }) => {
  const product = await ProductModel.findOne({
    where: {
      id,
      account_id,
    },
    include: [{
      model: ImageModel,
      through: {
        attributes: [],
      },
    }, {
      model: CategoryModel,
    }],
  });

  if (!product) {
    const error = new Error('Product not found');
    error.name = 'NotFound';
    throw error;
  }

  return product;
};

const addOne = async ({
  account_id, name, description, is_taxable, price, quantity, unit, category_id, base_quantity, image_ids,
}) => {
  await getCategory({ id: category_id, account_id });

  const product = await ProductModel.create({
    account_id,
    name,
    description,
    price,
    base_quantity,
    quantity,
    unit,
    category_id,
    is_taxable,
  });

  const images = [];
  const image = {
    product_id: product.id,
  };

  console.info(`1. Image ids => ${image_ids}`);
  image_ids.forEach((eachImageId) => {
    image.image_id = eachImageId;
    console.info(`Each image object => ${image}`);
    images.push(image);
    console.info(`Images after each iteration => ${images}`);
  });

  console.info(`Images for product => ${images}`);

  await ProductImageMapModel.bulkCreate(images);

  return getOne({ id: product.id, account_id });
};

const enableOne = async ({ id, account_id }) => {
  const product = await getOne({ id, account_id });

  if (product.status === STATUS.ENABLED) {
    const error = new Error('Product is already enabled');
    error.name = 'PreconditionFailed';
    throw error;
  }

  product.status = STATUS.ENABLED;
  return product.save();
};

const disableOne = async ({ id, account_id }) => {
  const product = await getOne({ id, account_id });

  if (product.status === STATUS.DISABLED) {
    const error = new Error('Product is already disabled');
    error.name = 'PreconditionFailed';
    throw error;
  }

  product.status = STATUS.DISABLED;
  return product.save();
};

const updateOne = async ({
  id, account_id, category_id, name, description, price, quantity, unit, is_taxable, enable, base_quantity,
}) => {
  if (enable !== undefined) {
    if (enable) {
      return enableOne({ id, account_id });
    }
    if (!enable) {
      return disableOne({ id, account_id });
    }
  }

  const product = await getOne({ id, account_id });

  product.category_id = category_id || product.category_id;
  product.name = name || product.name;
  product.description = description || product.description;
  product.price = price || product.price;
  product.quantity = quantity || product.quantity;
  product.base_quantity = base_quantity || product.base_quantity;
  product.unit = unit || product.unit;
  product.is_taxable = is_taxable || product.is_taxable;
  return product.save();
};

const deleteOne = async ({ id, account_id }) => {
  const product = await getOne({ id, account_id });

  // TODO Add check for product in orders and cart. If product is already available in cart or in orders list.
  // Throw error and restrict user from deletion.

  return product.destroy();
};

module.exports = {
  getListCount,
  getList,
  getOne,
  addOne,
  updateOne,
  deleteOne,
};
