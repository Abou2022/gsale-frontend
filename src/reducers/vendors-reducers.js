let vendors = (state = [], action) => {
  let { type, payload } = action;

  switch (type) {
    case 'VENDORS_FETCH':
      return payload;
    case 'VENDORS_FILTER':
      return payload.vendors;
    case 'SIGN_OUT':
      return [];
    default:
      return state;
  }
};

export default vendors;
