const validateGarageSaleEvent = garageSaleEvent => {
  if (
    !garageSaleEvent.eventName ||
    !garageSaleEvent.startTime ||
    !garageSaleEvent.endTime ||
    !garageSaleEvent.startDate ||
    !garageSaleEvent.endDate ||
    !garageSaleEvent.description
  ) {
    throw new Error(
      'VALIDATION ERROR: garageSaleEvent requires a eventName, startTime, endTime, startDate, endDate and description.'
    );
  }
};
let currentGarageSaleEvent = (state = {}, action) => {
  let { type, payload } = action;

  switch (type) {
    case 'CURRENT_GARAGE_SALE_EVENT_FETCH':
      return payload;
    case 'CURRENT_GARAGE_SALE_EVENT_CREATE':
      validateGarageSaleEvent(payload);
      return payload;
    case 'CURRENT_GARAGE_SALE_EVENT_UPDATE':
      validateGarageSaleEvent(payload);
      return payload;
    case 'CURRENT_GARAGE_SALE_EVENT_DELETE':
      return {};
    case 'SIGN_OUT':
      return {};
    default:
      return state;
  }
};

export default currentGarageSaleEvent;
