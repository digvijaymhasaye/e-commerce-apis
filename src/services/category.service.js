const { Op } = require('sequelize');
const {
  CategoryModel, ImageModel,
} = require('../managers').sequelizeManager;
const { STATUS } = require('../consts');

const getListCount = async ({
  account_id, status, search, ids,
}) => {
  const where = {
    account_id,
  };

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
  account_id, page_no, page_size, sort_by, sort_order, status, search, ids,
}) => {
  const limit = page_size;
  const offset = (page_no - 1) * limit;

  const where = {
    account_id,
  };

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

  const include = [{
    model: ImageModel,
  }];

  return CategoryModel.findAll({
    where,
    include,
    order,
    offset,
    limit,
  });
};

const getOne = async ({ id, account_id }) => {
  const category = await CategoryModel.findOne({
    where: {
      id,
      account_id,
    },
    // include: {
    //   model: ImageModel,
    // },
  });

  // console.log(category);

  if (!category) {
    const error = new Error('Category not found');
    error.name = 'NotFound';
    throw error;
  }

  return category;
};

const addOne = async ({
  account_id, name, description, image_id,
}) => CategoryModel.create({
  account_id,
  name,
  description,
  image_id,
});

const enableOne = async ({ id, account_id }) => {
  const category = await getOne({ id, account_id });

  if (category.status === STATUS.ENABLED) {
    const error = new Error('Category is already enabled');
    error.name = 'PreconditionFailed';
    throw error;
  }

  category.status = STATUS.ENABLED;
  return category.save();
};

const disableOne = async ({ id, account_id }) => {
  const category = await getOne({ id, account_id });

  if (category.status === STATUS.DISABLED) {
    const error = new Error('Category is already disabled');
    error.name = 'PreconditionFailed';
    throw error;
  }

  category.status = STATUS.DISABLED;
  return category.save();
};

const updateOne = async ({
  id, account_id, name, description, image_id, enable,
}) => {
  if (enable !== undefined) {
    if (enable) {
      return enableOne({ id, account_id });
    }
    if (!enable) {
      return disableOne({ id, account_id });
    }
  }

  const category = await getOne({ id, account_id });

  category.name = name || category.name;
  category.description = description || category.description;
  category.image_id = image_id || category.image_id;
  return category.save();
};

const deleteOne = async ({ id, account_id }) => {
  const category = await getOne({ id, account_id });

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
