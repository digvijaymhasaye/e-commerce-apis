const axios = require('axios');
const config = require('../config');
const { OtpModel } = require('../managers').sequelizeManager;
const { OTP_STATUS } = require('../consts');
const { errorUtils } = require('../utils');

const getByMobileNo = async ({ account_id, mobile_no }) => OtpModel.findOne({
  where: {
    mobile_no,
    account_id,
  },
  order: [
    ['updated_at', 'desc'],
  ],
});

const checkEligibility = async ({ account_id, mobile_no, status }) => {
  const lastOtp = await getByMobileNo({ mobile_no, account_id });

  if (!lastOtp) {
    return true;
  }

  console.info('Last OTP = ', lastOtp.status);
  if (lastOtp.status === OTP_STATUS.VERIFIED
    || lastOtp.status === OTP_STATUS.EXPIRED
    || (status && status !== lastOtp.status)) {
    return true;
  }

  const lastOtpUpdatedAt = new Date(lastOtp.dataValues.updated_at);
  const expiry = new Date();
  expiry.setMinutes(expiry.getMinutes() - 5);

  if (lastOtpUpdatedAt < expiry) {
    return true;
  }


  return false;
};

const updateStatusByMobileNo = async ({ account_id, mobile_no, status }) => {
  const otp = await getByMobileNo({ account_id, mobile_no });

  otp.dataValues.status = status || otp.status;
  return otp.save();
};

const send = async ({ account_id, mobile_number }) => {
  const isEligible = await checkEligibility({ account_id, mobile_no: mobile_number });

  if (!isEligible) {
    errorUtils.throwPreconditionFailed('OTP already sent');
  }

  const url = `https://api.msg91.com/api/v5/otp?authkey=${config.MSG91_AUTH_KEY}&template_id=${config.MSG91_OTP_TEMPLATE_ID}&mobile=91${mobile_number}
    &invisible=1&otp_expiry=5`;

  await axios.get(url);

  return OtpModel.create({
    account_id,
    mobile_no: mobile_number,
    status: OTP_STATUS.SENT,
  });
};

const resend = async ({ account_id, mobile_number }) => {
  const isEligible = await checkEligibility({ account_id, mobile_no: mobile_number, status: OTP_STATUS.RESENT });

  if (!isEligible) {
    errorUtils.throwPreconditionFailed('OTP already sent. It can take upto 2 minutes to get deliver OTP.');
  }

  const url = `https://api.msg91.com/api/v5/otp/retry?mobile=91${mobile_number}&authkey=${config.MSG91_AUTH_KEY}&retrytype=text`;

  await axios.post(url);

  return updateStatusByMobileNo({ account_id, mobile_no: mobile_number, status: OTP_STATUS.RESENT });
};

const verify = async ({ account_id, mobile_number, otp }) => {
  try {
    const url = `https://api.msg91.com/api/v5/otp/verify?mobile=91${mobile_number}&otp=${otp}&authkey=${config.MSG91_AUTH_KEY}`;

    await axios.post(url);
  } catch (error) {
    if (error.message === 'otp_expired') {
      await OtpModel.update({
        status: OTP_STATUS.EXPIRED,
      }, {
        returning: true,
        where: {
          account_id,
          mobile_no: mobile_number,
        },
      });
      errorUtils.throwPreconditionFailed('OTP expired');
    }
  }

  return updateStatusByMobileNo({ account_id, mobile_no: mobile_number, status: OTP_STATUS.VERIFIED });
};

module.exports = {
  send,
  resend,
  verify,
};
