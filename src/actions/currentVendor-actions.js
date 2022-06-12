import superagent from 'superagent';
import moment from 'moment';
import { categoryFetch } from './category-actions';

export const currentVendorFetch = vendor => ({
  type: 'CURRENT_VENDOR_FETCH',
  payload: vendor,
});

export const currentVendorCreate = vendor => ({
  type: 'CURRENT_VENDOR_CREATE',
  payload: vendor,
});

export const currentVendorUpdate = vendor => ({
  type: 'CURRENT_VENDOR_UPDATE',
  payload: vendor,
});

export const currentVendorDelete = vendor => ({
  type: 'CURRENT_VENDOR_DELETE',
  payload: vendor,
});

export const currentVendorFetchRequest = vendorID => dispatch => {
  return superagent
    .get(`${process.env.REACT_APP_API_URL}/api/vendors/${vendorID}`)
    .then(res => {
      dispatch(currentVendorFetch(res.body));
      dispatch(categoryFetch(res.body.category));
      return res.body;
    })
    .catch(err => {
      console.log('vendorFetchRequest Error: ', err);
      return err;
    });
};

export const currentVendorCreateRequest = vendor => dispatch => {
  const token = JSON.parse(localStorage.getItem('gSaleToken'));
  console.log('vendor: ', vendor);
  if (vendor.startDate) {
    vendor.startTime = moment(new Date(vendor.startDate)).format('hh:mm a');
  }
  if (vendor.endDate) {
    vendor.endTime = moment(new Date(vendor.endDate)).format('hh:mm a');
  }
  return superagent
    .post(`${process.env.REACT_APP_API_URL}/api/vendors`)
    .set('Authorization', `Bearer ${token}`)
    .send(vendor)
    .then(res => {
      console.log('res.body: ', res.body);
      res.body.vendor.category = res.body.category;
      dispatch(currentVendorCreate(res.body.vendor));
      dispatch(categoryFetch(res.body.category));
      return res.body.vendor;
    })
    .catch(err => {
      console.log('vendorCreateRequest Error: ', err);
      return err;
    });
};

export const currentVendorUpdateRequest = vendor => dispatch => {
  const token = JSON.parse(localStorage.getItem('gSaleToken'));
  console.log('vendor: ', vendor);
  if (vendor.startDate) {
    vendor.startTime = moment(new Date(vendor.startDate)).format('hh:mm a');
  }
  if (vendor.endDate) {
    vendor.endTime = moment(new Date(vendor.endDate)).format('hh:mm a');
  }
  return superagent
    .put(`${process.env.REACT_APP_API_URL}/api/vendors/${vendor.id}`)
    .set('Authorization', `Bearer ${token}`)
    .send(vendor)
    .then(res => {
      console.log('res.body: ', res.body);
      dispatch(currentVendorUpdate(vendor));
      dispatch(categoryFetch(vendor.category));
      return res.body;
    })
    .catch(err => {
      console.log('vendorUpdateRequest Error: ', err);
      return err;
    });
};

export const currentVendorDeleteRequest = vendorId => dispatch => {
  const token = JSON.parse(localStorage.getItem('gSaleToken'));
  return superagent
    .delete(`${process.env.REACT_APP_API_URL}/api/vendors/${vendorId}`)
    .set('Authorization', `Bearer ${token}`)
    .then(res => {
      dispatch(currentVendorDelete(res.body));
      return res.body;
    })
    .catch(err => {
      console.log('vendorDeleteRequest Error: ', err);
      return err;
    });
};
