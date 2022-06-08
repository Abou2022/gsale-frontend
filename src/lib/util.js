import superagent from 'superagent';

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

export const getZipsArray = async (lat, lng, radius = 10) => {
  try {
    radius = (radius * 1.60934).toFixed(2);
    let zips = JSON.parse(
      localStorage.getItem(`gSaleZips-lat-${lat}-lng-${lng}-rad-${radius}`)
    );
    if (zips) {
      return zips;
    }
    const res = await superagent.get(
      `https://www.freemaptools.com/ajax/us/get-all-zip-codes-inside.php?radius=${radius}&lat=${lat}&lng=${lng}&rn=563&showPOboxes=false`
    );
    let arr = res.text.split('<postcode postcode="');
    zips = [];
    for (let i = 1; i < arr.length; i++) {
      zips.push(arr[i].substring(0, 5));
    }
    localStorage.setItem(
      `gSaleZips-lat-${lat}-lng-${lng}-rad-${radius}`,
      JSON.stringify(zips)
    );
    return zips;
  } catch (err) {
    console.log('getZipsArray error: ', err);
    return [];
  }
};
