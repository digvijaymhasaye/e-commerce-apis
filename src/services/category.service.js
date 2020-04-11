const { Op } = require('sequelize');
const {
  ProductModel, CategoryModel, OfferModel, CouponModel,
} = require('../managers').sequelizeManager;
const { STATUS } = require('../consts');

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

  return CategoryModel.count({
    where,
  });
};

const getList = async ({
  page_no, page_size, sort_by, sort_order, status, search, ids,
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

  const order = [];
  order.push([sort_by, sort_order]);


  return CategoryModel.findAll({
    where,
    order,
    offset,
    limit,
  });
};

const getOne = async ({ id }) => {
  const category = await CategoryModel.findOne({
    where: {
      id,
    },
  });

  // console.log(category);

  if (!category) {
    const error = new Error('Category not found');
    error.name = 'NotFound';
    throw error;
  }

  return category;
};

const addOne = async ({ name, description }) => CategoryModel.create({
  name,
  description,
});

const enableOne = async ({ id }) => {
  const category = await getOne({ id });

  if (category.status === STATUS.ENABLED) {
    const error = new Error('Category is already enabled');
    error.name = 'PreconditionFailed';
    throw error;
  }

  category.status = STATUS.ENABLED;
  return category.save();
};

const disableOne = async ({ id }) => {
  const category = await getOne({ id });

  if (category.status === STATUS.DISABLED) {
    const error = new Error('Category is already disabled');
    error.name = 'PreconditionFailed';
    throw error;
  }

  category.status = STATUS.DISABLED;
  return category.save();
};

const updateOne = async ({
  id, name, description, enable,
}) => {
  if (enable !== undefined) {
    if (enable) {
      return enableOne({ id });
    }
    if (!enable) {
      return disableOne({ id });
    }
  }

  const category = await getOne({ id });

  category.name = name || category.name;
  category.description = description || category.description;
  return category.save();
};

const deleteOne = async ({ id }) => {
  const category = await getOne({ id });

  if (category.status === STATUS.ENABLED) {
    const error = new Error('Category should be in disabled state to delete');
    error.name = 'PreconditionFailed';
    throw error;
  }

  return category.destroy();
};

module.exports = {
  getListCount,
  getList,
  getOne,
  addOne,
  updateOne,
  deleteOne,
};
