export const userLocationSet = userLocation => ({
  type: 'USER_LOCATION_SET',
  payload: userLocation,
});

export const userLocationClear = () => ({
  type: 'USER_LOCATION__CLEAR',
  payload: null,
});
