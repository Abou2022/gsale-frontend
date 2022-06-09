let unfilteredGarageSaleEvent = (state = [], action) => {
  let { type, payload } = action;

  switch (type) {
    case 'UNFILTERED_GARAGE_SALE_EVENTS_FETCH':
      return payload;
    case 'UNFILTERED_GARAGE_SALE_EVENTS_CLEAR':
      return [];
    case 'SIGN_OUT':
      return [];
    default:
      return state;
  }
};

export default unfilteredGarageSaleEvent;
