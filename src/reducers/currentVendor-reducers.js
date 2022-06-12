const validateVendor = vendor => {
  if (
    !vendor.address ||
    !vendor.startTime ||
    !vendor.endTime ||
    !vendor.startDate ||
    !vendor.endDate ||
    !vendor.description ||
    !vendor.profile_id ||
    !vendor.garageSaleEvent_id
  ) {
    throw new Error(
      'VALIDATION ERROR: vendor requires a profile_id, garageSaleEvent_id, description, address, startTime, endTime, startDate and endDate.'
    );
  }
};

let currentVendor = (state = {}, action) => {
  let { type, payload } = action;

  switch (type) {
    case 'CURRENT_VENDOR_FETCH':
      return payload;
    case 'CURRENT_VENDOR_CREATE':
      validateVendor(payload);
      return payload;
    case 'CURRENT_VENDOR_UPDATE':
      if (state == {}) {
        throw new Error('USAGE ERROR: can not update VENDOR not in state');
      }
      console.log('payload: ', payload);
      return { ...state, ...payload };
    case 'CURRENT_VENDOR_DELETE':
      return {};
    case 'SIGN_OUT':
      return {};
    default:
      return state;
  }
};

export default currentVendor;
