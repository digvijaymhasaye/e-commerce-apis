const { Op } = require('sequelize');
const { ImageModel } = require('../managers').sequelizeManager;
const { errorUtils, aws } = require('../utils');
const { STATUS } = require('../consts');

const getCount = async () => ImageModel.count();

const getList = async ({
  account_id, page_no, page_size, sort_by, sort_order, status, search,
}) => {
  const where = {
    account_id,
  };

  const limit = page_size;
  const offset = (page_no - 1) * limit;

  if (status) {
    where.status = status;
  }

  if (search) {
    where.search = {
      [Op.like]: `%${search}%`,
    };
  }

  const order = [];
  order.push([sort_by, sort_order]);

  return ImageModel.findAll({
    where,
    order,
    limit,
    offset,
  });
};

const getOne = async ({ id }) => {
  const image = await ImageModel.findOne({
    where: {
      id,
    },
  });

  if (!image) {
    errorUtils.throwNotFoundError('Image not found');
  }

  return image;
};

const addOne = async ({
  account_id, file, type, description, user_id, is_copy,
}) => {
  const uploadedFile = await aws.upload({ file_path: file.path, owner_id: account_id });

  return ImageModel.create({
    account_id,
    type,
    description,
    is_copy,
    url: uploadedFile.Location,
    size: file.size,
    uploaded_by: user_id,
  });
};

const deleteOne = async ({ id, account_id }) => {
  const image = await getOne({ id, account_id });

  if (image.status === STATUS.ENABLED) {
    errorUtils.throwPreconditionFailed('Only inactive image can be deleted.');
  }

  return image.destroy();
};

module.exports = {
  getCount,
  getList,
  getOne,
  addOne,
  deleteOne,
};
