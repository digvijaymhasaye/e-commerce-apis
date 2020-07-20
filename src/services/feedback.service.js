const { FeedBackModel } = require("../managers/sequelize.manager");

const addFeedback = async ({
  account_id, full_name, mobile_no, email_id, message,
}) => FeedBackModel.create({
  account_id,
  full_name,
  mobile_no,
  email_id,
  message,
});

module.exports = {
  addFeedback,
};
