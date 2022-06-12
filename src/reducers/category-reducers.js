let category = (state = {}, action) => {
  let { type, payload } = action;

  switch (type) {
    case 'CATEGORY_FETCH':
      return payload;
    case 'CATEGORY_CLEAR':
      return {};
    case 'SIGN_OUT':
      return {};
    default:
      return state;
  }
};

export default category;
