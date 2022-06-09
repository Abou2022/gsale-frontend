export const log = (...args) => console.log(...args);
export const logError = (...args) => console.error(...args);
export const renderIf = (test, component) => (test ? component : undefined);
export const classToggler = options =>
  Object.keys(options)
    .filter(key => !!options[key])
    .join(' ');

export const checkAndAdd = (payload, state) => {
  var found = state.some(function (el) {
    return el.id === payload.id;
  });
  if (!found) {
    state.push(payload);
  }
  return state;
};

export const distance = (lat1, lon1, lat2, lon2) => {
  console.log(lat1, lon1, lat2, lon2);
  console.log(typeof lat1, typeof lon1, typeof lat2, typeof lon2);
  var radlat1 = (Math.PI * lat1) / 180;
  var radlat2 = (Math.PI * lat2) / 180;
  var theta = lon1 - lon2;
  var radtheta = (Math.PI * theta) / 180;
  var dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  console.log('dist: ', dist);
  return dist;
};
