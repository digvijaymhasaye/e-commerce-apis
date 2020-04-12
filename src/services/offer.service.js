const { Op } = require('sequelize');
const { OfferModel, ImageModel } = require('../managers').sequelizeManager;
const { STATUS, TYPE } = require('../consts');

const getListCount = async ({
  status, search, ids, start_date, end_date,
}) => {
  const where = {};

  if (start_date) {
    where.start_date = {
      [Op.lte]: start_date,
    };
  }

  if (end_date) {
    where.end_date = {
      [Op.gte]: end_date,
    };
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

  return OfferModel.count({
    where,
  });
};

const getList = async ({
  status, search, page_no, page_size, sort_by, sort_order, ids, start_date, end_date,
}) => {
  const limit = page_size;
  const offset = (page_no - 1) * limit;

  const where = {};

  if (start_date) {
    where.start_date = {
      [Op.lte]: start_date,
    };
  }

  if (end_date) {
    where.end_date = {
      [Op.gte]: end_date,
    };
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

  const order = [];
  order.push([sort_by, sort_order]);

  const include = {
    model: ImageModel,
    where: {
      type: TYPE.IMAGE_TYPE.OFFER,
    },
  };

  return OfferModel.findAll({
    where,
    include,
    order,
    offset,
    limit,
  });
};

const getOne = async ({ id }) => {
  const offer = await OfferModel.findOne({
    where: {
      id,
      start_date: {
        [Op.lte]: new Date(),
      },
      end_date: {
        [Op.gte]: new Date(),
      },
    },
    include: {
      model: ImageModel,
      where: {
        type: TYPE.IMAGE_TYPE.OFFER,
      },
    },
  });


  if (!offer) {
    const error = new Error('Offer not found');
    error.name = 'NotFound';
    throw error;
  }

  return offer;
};

const addOne = async ({
  name, description, image_id, start_date, end_date, type, type_id,
}) => OfferModel.create({
  name,
  description,
  image_id,
  start_date,
  end_date,
  type,
  type_id,
});

const enableOne = async ({ id }) => {
  const offer = await getOne({ id });

  if (offer.status === STATUS.ENABLED) {
    const error = new Error('Offer is already enabled');
    error.name = 'PreconditionFailed';
    throw error;
  }

  offer.status = STATUS.ENABLED;
  return offer.save();
};

const disableOne = async ({ id }) => {
  const offer = await getOne({ id });

  if (offer.status === STATUS.DISABLED) {
    const error = new Error('Offer is already disabled');
    error.name = 'PreconditionFailed';
    throw error;
  }

  offer.status = STATUS.DISABLED;
  return offer.save();
};

const updateOne = async ({
  id, name, description, start_date, end_date, type, type_id, image_id, enable,
}) => {
  if (enable !== undefined) {
    if (enable) {
      return enableOne({ id });
    }
    if (!enable) {
      return disableOne({ id });
    }
  }

  const offer = await getOne({ id });

  offer.name = name || offer.name;
  offer.description = description || offer.description;
  offer.start_date = start_date || offer.start_date;
  offer.end_date = end_date || offer.end_date;
  offer.type = type || offer.type;
  offer.type_id = type_id || offer.type_id;
  offer.image_id = image_id || offer.image_id;
  return offer.save();
};

const deleteOne = async ({ id }) => {
  const offer = await getOne({ id });

  if (offer.status === STATUS.ENABLED) {
    const error = new Error('Offer should be in disabled state to delete');
    error.name = 'PreconditionFailed';
    throw error;
  }

  return offer.destroy();
};

module.exports = {
  getListCount,
  getList,
  getOne,
  addOne,
  updateOne,
  deleteOne,
};
