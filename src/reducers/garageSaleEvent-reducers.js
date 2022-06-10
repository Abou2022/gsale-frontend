let garageSaleEvent = (state = [], action) => {
  let { type, payload } = action;

  switch (type) {
    case 'GARAGE_SALE_EVENTS_FETCH':
      return payload;
    case 'GARAGE_SALE_EVENTS_FILTER':
      return payload.gse;
    case 'SIGN_OUT':
      return [];
    default:
      return state;
  }
};

export default garageSaleEvent;
