import superagent from 'superagent';

import {
  dateFilterHelper,
  locationFilterHelper,
  categoryFilterHelper,
  mapItemsToVendors,
} from '../lib/util';

export const vendorsFilter = vendors => ({
  type: 'VENDORS_FILTER',
  payload: vendors,
});

export const vendorsFetch = vendors => ({
  type: 'VENDORS_FETCH',
  payload: vendors,
});

// eslint-disable-next-line
export const vendorsFilterRequest = filterObject => dispatch => {
  return superagent
    .get(`https://gsale-backend.herokuapp.com/api/vendors`)
    .then(res => {
      let data = mapItemsToVendors(res.body.vendor, res.body.item);
      data = dateFilterHelper(data, filterObject);
      data = locationFilterHelper(data, filterObject);
      data = categoryFilterHelper(data, filterObject);
      // to do map data aka filtered vendors  map the res.body.item to these vendors
      dispatch(vendorsFilter({ vendors: data, filter: filterObject }));
      return res.body;
    })
    .catch(err => {
      console.log('garageSaleEventsFilterRequest Error: ', err);
      return err;
    });
};

export const vendorsFetchRequest = () => dispatch => {
  return superagent
    .get(`https://gsale-backend.herokuapp.com/api/vendors`)
    .then(res => {
      // to do map data aka filtered vendors  map the res.body.item to these vendors
      const vendors = mapItemsToVendors(res.body.vendor, res.body.item);
      dispatch(vendorsFetch(vendors));
      return vendors;
    })
    .catch(err => {
      console.log('vendorsFetchRequest Error: ', err);
      return err;
    });
};
