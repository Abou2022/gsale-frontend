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
  console.log('distance: ', dist);
  return dist;
};

export const categoryFilterHelper = (data, filterObject) => {
  if (filterObject.categories && filterObject.categories.length) {
    data = data.filter(item => {
      let hasCategory = false;
      filterObject.categories.forEach(filterCategory => {
        console.log(
          'item.category[filterCategory]: ',
          item.category[filterCategory]
        );
        if (item.category[filterCategory]) {
          hasCategory = true;
          return;
        }
      });
      return hasCategory;
    });
  }
  return data;
};

export const locationFilterHelper = (data, filterObject, radius = 25) => {
  if (data && data.length && filterObject.lat && filterObject.lng) {
    data = data.filter(
      item =>
        distance(item.lat, item.lng, filterObject.lat, filterObject.lng) <
        radius
    );
  }
  return data;
};

export const dateFilterHelper = (data, filterObject) => {
  // date 2 weeks from now
  // new Date(Date.now() + 12096e5)
  const filterEndDate = filterObject.endDate
    ? new Date(filterObject.endDate)
    : new Date(Date.now() + 12096e5);
  const filterStartDate = filterObject.startDate
    ? new Date(filterObject.startDate)
    : new Date();
  let filteredByDates = data.filter(item => {
    const dataStartDate = new Date(item.startDate);
    const dataEndDate = new Date(item.endDate);
    return (
      (dataEndDate >= filterStartDate && dataEndDate <= filterEndDate) ||
      (dataStartDate >= filterStartDate && dataStartDate <= filterEndDate)
    );
  });
  return filteredByDates;
};

export const userValidation = async (props, navigate) => {
  try {
    if (props.userAuth) {
      return;
    }
    const token = JSON.parse(localStorage.getItem('gSaleToken'));
    return token ? props.tokenSignIn(token) : navigate('/');
  } catch (err) {
    return navigate('/');
  }
};
