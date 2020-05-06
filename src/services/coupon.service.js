const { Op } = require('sequelize');
const { CouponModel } = require('../managers').sequelizeManager;
const { errorUtils } = require('../utils');

const getCount = async ({ status, search }) => {
  const where = {};

  if (status) {
    where.status = status;
  }

  if (search) {
    where.search = {
      [Op.like]: `%${search}%`,
    };
  }

  return CouponModel.count({ where });
};

const getList = async ({
  page_no, page_size, sort_by, sort_order, status, search, start_date, end_date,
}) => {
  const limit = page_size;
  const offset = (page_no - 1) * limit;

  const where = {};

  if (status) {
    where.status = status;
  }

  if (search) {
    where.search = {
      [Op.like]: `%${search}%`,
    };
  }

  if (start_date) {
    where.start_date = {
      [Op.gte]: start_date,
    };
  }

  if (end_date) {
    where.end_date = {
      [Op.lte]: end_date,
    };
  }

  const order = [];
  order.push([sort_by, sort_order]);

  return CouponModel.findAll({
    where,
    order,
    limit,
    offset,
  });
};

const getOne = async ({ id }) => {
  const coupon = await CouponModel.findOne({
    where: {
      id,
    },
    // include: [{
    //   model:
    // }]
  });

  if (!coupon) {
    errorUtils.throwNotFoundError('Coupon not found');
  }

  return coupon;
};

const addOne = async () => {

};

const updateOne = async () => {

};

const deleteOne = async () => {

};

const validateOneById = async () => {

};

const validateOneByCode = async () => {

};

module.exports = {
  getCount,
  getList,
  getOne,
  addOne,
  updateOne,
  deleteOne,
  validateOneById,
  validateOneByCode,
};
