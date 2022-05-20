const { FeedBackModel } = require('../managers/sequelize.manager');
const { errorUtils } = require('../utils');

const getFeedbackCount = async ({
  account_id, status, search,
}) => {
  const where = {
    account_id,
  };

  if (status) {
    where.status = status;
  }

  // if (search) {
  //   where[[Op.or]] = [{
  //     first_name: {
  //       [Op.like]: `%${search}%`,
  //     },
  //   }, {
  //     last_name: {
  //       [Op.like]: `%${search}%`,
  //     },
  //   }, {
  //     email_id: {
  //       [Op.like]: `%${search}%`,
  //     },
  //   }];
  // }

  return FeedBackModel.count({
    where,
  });
};

const getFeedbackList = async ({
  account_id, page_no, page_size, sort_by, sort_order, status, search,
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

  // if (ids) {
  //   where.id = {
  //     [Op.in]: ids,
  //   };
  // }

  const order = [];
  order.push([sort_by, sort_order]);


  return FeedBackModel.findAll({
    where,
    order,
    offset,
    limit,
  });
};

const addFeedback = async ({
  account_id, full_name, mobile_no, email_id, message,
}) => FeedBackModel.create({
  account_id,
  full_name,
  mobile_no,
  email_id,
  message,
});

const getFeedback = async ({ account_id, feedback_id }) => {
  const feedback = await FeedBackModel.findOne({
    where: {
      account_id,
      id: feedback_id,
    },
  });

  if (!feedback) {
    errorUtils.throwNotFoundError('Feedback not found');
  }

  return feedback;
};

module.exports = {
  getFeedbackCount,
  getFeedbackList,
  addFeedback,
  getFeedback,
};
