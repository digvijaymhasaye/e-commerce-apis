const { successUtils } = require('../utils');
const { otpService } = require('../services');

const sendOtp = async (req, res, next) => {
  const { mobileNo } = req.params;
  try {
    const otp = await otpService.send({
      account_id: req.headers.account_id,
      mobile_number: mobileNo,
    });
    console.info('OTP = ', otp);
    return successUtils.handler({ otp }, req, res);
  } catch (error) {
    return next(error);
  }
};
const resendOtp = async (req, res, next) => {
  const { mobileNo } = req.params;
  try {
    const otp = await otpService.resend({
      account_id: req.headers.account_id,
      mobile_number: mobileNo,
    });
    // console.info('OTP = ', otp);
    return successUtils.handler({ otp }, req, res);
  } catch (error) {
    return next(error);
  }
};
const verifyOtp = async (req, res, next) => {
  const { mobileNo } = req.params;
  const { otp } = req.body;
  try {
    const verifiedOtp = await otpService.verify({
      account_id: req.headers.account_id,
      mobile_number: mobileNo,
      otp,
    });
    // console.info('OTP = ', otp);
    return successUtils.handler({ otp: verifiedOtp }, req, res);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  sendOtp,
  resendOtp,
  verifyOtp,
};
