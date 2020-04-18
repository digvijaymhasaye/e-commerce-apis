const { Op } = require('sequelize');
const {
  ProductModel, CategoryModel, OfferModel, CouponModel,
  ImageModel,
} = require('../managers').sequelizeManager;
const { STATUS, TYPE } = require('../consts');
const { getOne: getCategory } = require('./category.service');

const getListCount = async ({
  status, search, ids,
}) => {
  const where = {};

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
  page_no, page_size, sort_by, sort_order, status, search, ids, include_category, include_offer, include_coupons,
}) => {
  const limit = page_size;
  const offset = (page_no - 1) * limit;

  const where = {};

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
    through: [],
    where: {
      type: TYPE.IMAGE_TYPE.PRODUCT,
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

const getOne = async ({ id }) => {
  const product = await ProductModel.findOne({
    where: {
      id,
    },
  });

  if (!product) {
    const error = new Error('Product not found');
    error.name = 'NotFound';
    throw error;
  }

  return product;
};

const addOne = async ({
  name, description, is_taxable, price, quantity, unit, category_id,
}) => {
  await getCategory({ id: category_id });

  return ProductModel.create({
    name,
    description,
    price,
    quantity,
    unit,
    category_id,
    is_taxable,
  });
};

const enableOne = async ({ id }) => {
  const product = await getOne({ id });

  if (product.status === STATUS.ENABLED) {
    const error = new Error('Product is already enabled');
    error.name = 'PreconditionFailed';
    throw error;
  }

  product.status = STATUS.ENABLED;
  return product.save();
};

const disableOne = async ({ id }) => {
  const product = await getOne({ id });

  if (product.status === STATUS.DISABLED) {
    const error = new Error('Product is already disabled');
    error.name = 'PreconditionFailed';
    throw error;
  }

  product.status = STATUS.DISABLED;
  return product.save();
};

const updateOne = async ({
  id, category_id, name, description, price, quantity, unit, is_taxable, enable,
}) => {
  if (enable !== undefined) {
    if (enable) {
      return enableOne({ id });
    }
    if (!enable) {
      return disableOne({ id });
    }
  }

  const product = await getOne({ id });

  product.category_id = category_id || product.category_id;
  product.name = name || product.name;
  product.description = description || product.description;
  product.price = price || product.price;
  product.quantity = quantity || product.quantity;
  product.unit = unit || product.unit;
  product.is_taxable = is_taxable || product.is_taxable;
  return product.save();
};

const deleteOne = async ({ id }) => {
  const product = await getOne({ id });

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
