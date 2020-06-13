const { successUtils } = require('../utils');
const { customerAddressService } = require('../services');
const {
  getListValidation, getId, addCustomerAddressValidation, updateCustomerAddressValidation,
} = require('../validations');

// const getAddressCount = async (req, res, next) => {
//   try {
//     const validatedReqData = await getListValidation.validate(req.query);
//     const count = await customerAddressService.getAddressCount({
//       account_id: req.headers.address_id,
//       customer_id: req.headers.customer_id,
//       ...validatedReqData,
//     });
//     return successUtils.handler({ count }, req, res);
//   } catch (error) {
//     return next(error);
//   }
// };

const getAddressList = async (req, res, next) => {
  try {
    const validatedReqData = await getListValidation.validate(req.query);
    const customerAddresses = await customerAddressService.getAddressList({
      account_id: req.headers.address_id,
      customer_id: req.headers.customer_id,
      ...validatedReqData,
    });
    return successUtils.handler({ customer_addresses: customerAddresses }, req, res);
  } catch (error) {
    return next(error);
  }
};

const getAddress = async (req, res, next) => {
  // const { addressId } = req.params;
  try {
    // const validatedAddressId = await getId.validate(addressId);
    const customerAddress = await customerAddressService.getAddress({
      account_id: req.headers.address_id,
      customer_id: req.headers.customer_id,
      // address_id: validatedAddressId,
    });
    return successUtils.handler({ customer_address: customerAddress }, req, res);
  } catch (error) {
    return next(error);
  }
};

const addAddress = async (req, res, next) => {
  try {
    const validatedReqBody = await addCustomerAddressValidation.validate(req.body);
    const count = await customerAddressService.addAddress({
      account_id: req.headers.address_id,
      customer_id: req.headers.customer_id,
      ...validatedReqBody,
    });
    return successUtils.handler({ count }, req, res);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  // getAddressCount,
  getAddressList,
  getAddress,
  addAddress,
};
