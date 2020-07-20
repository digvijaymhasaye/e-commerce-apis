const sequelizeManager = require('./sequelize.manager');
const razorpay = require('./razorpay.manager');
const firebaseManager = require('./firebase.manager');

module.exports = {
  sequelizeManager,
  firebaseManager,
  razorpay,
};
