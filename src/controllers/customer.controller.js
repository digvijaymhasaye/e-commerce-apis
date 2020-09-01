const { successUtils } = require('../utils');
const {
  getId, getListValidation, addCustomerValidation, customerSignInValidation, // addUserValidation, updateNoteValidation,
} = require('../validations');
const { customerService } = require('../services');

// const getListCount = async (req, res, next) => {
//   try {
//     const validatedReqData = await getListValidation.validate(req.query);
//     const count = await userService.getListCount({
//       ...validatedReqData,
//     });
//     return successUtils.handler({ count }, req, res);
//   } catch (err) {
//     return next(err);
//   }
// };

const getList = async (req, res, next) => {
  const reqData = { ...req.query };
  if (reqData.ids) {
    reqData.ids = reqData.ids.split(';');
  }
  try {
    const validatedReqData = await getListValidation.validate(reqData);
    const customers = await customerService.getCustomerList({
      account_id: req.headers.account_id,
      ...validatedReqData,
    });
    return successUtils.handler({ customers }, req, res);
  } catch (err) {
    return next(err);
  }
};

const getCustomer = async (req, res, next) => {
  const { customerId } = req.params;
  try {
    const id = await getId.validate(customerId);
    const customer = await customerService.getOne({
      id,
      account_id: req.headers.account_id,
    });
    return successUtils.handler({ customer }, req, res);
  } catch (err) {
    return next(err);
  }
};

const signIn = async (req, res, next) => {
  const reqBody = req.body;
  try {
    // console.log(reqBody);
    const validatedReqData = await customerSignInValidation.validate(reqBody);
    const customer = await customerService.signIn({
      account_id: req.headers.account_id,
      user_agent: req.headers['user-agent'],
      app_version: req.headers['app-version'],
      ...validatedReqData,
    });
    return successUtils.handler({ customer }, req, res);
  } catch (err) {
    return next(err);
  }
};

const signUp = async (req, res, next) => {
  const reqBody = req.body;
  try {
    const validatedReqData = await addCustomerValidation.validate(reqBody);
    const customer = await customerService.signUp({
      account_id: req.headers.account_id,
      user_agent: req.headers['user-agent'],
      app_version: req.headers['app-version'],
      ...validatedReqData,
    });
    return successUtils.handler({ customer }, req, res);
  } catch (err) {
    return next(err);
  }
};

const signOut = async (req, res, next) => {
  try {
    const customer = await customerService.signOut({
      account_id: req.headers.account_id,
      customer_id: req.headers.customer_id,
      session_id: req.headers.session_id,
    });
    return successUtils.handler({ customer }, req, res);
  } catch (err) {
    return next(err);
  }
};

// const updateOne = async (req, res, next) => {
//   const { userId } = req.params;
//   const reqBody = req.body;
//   try {
//     const id = await getId.validate(userId);
//     const validatedReqData = await updateNoteValidation.validate(reqBody);
//     const user = await userService.updateOne({
//       id,
//       ...validatedReqData,
//     });
//     return successUtils.handler({ user }, req, res);
//   } catch (err) {
//     return next(err);
//   }
// };

// const deleteOne = async (req, res, next) => {
//   const { userId } = req.params;
//   try {
//     const id = await getId.validate(userId);
//     const user = await userService.deleteOne({
//       id,
//     });
//     return successUtils.handler({ user }, req, res);
//   } catch (err) {
//     return next(err);
//   }
// };

module.exports = {
  // getListCount,
  getList,
  getCustomer,
  signIn,
  signUp,
  signOut,
  // updateOne,
  // deleteOne,
};
