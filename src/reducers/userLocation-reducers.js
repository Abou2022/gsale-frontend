let userLocation = (state = null, action) => {
  let { type, payload } = action;

  switch (type) {
    case 'USER_LOCATION_SET':
      return payload;
    case 'USER_LOCATION__CLEAR':
      return null;
    default:
      return state;
  }
};

export default userLocation;
