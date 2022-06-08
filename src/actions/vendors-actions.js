import superagent from 'superagent';

export const vendorFetch = vendor => ({
  type: 'VENDOR_FETCH',
  payload: vendor,
});

export const vendorsFetch = vendors => ({
  type: 'VENDORS_FETCH',
  payload: vendors,
});

export const vendorCreate = vendor => ({
  type: 'VENDOR_CREATE',
  payload: vendor,
});

export const vendorUpdate = vendor => ({
  type: 'VENDOR_UPDATE',
  payload: vendor,
});

export const vendorDelete = vendor => ({
  type: 'VENDOR_DELETE',
  payload: vendor,
});

export const vendorFetchRequest = vendorID => dispatch => {
  return superagent
    .get(`${process.env.REACT_APP_API_URL}/api/vendors/${vendorID}`)
    .then(res => {
      dispatch(vendorFetch(res.body));
      return res.body;
    })
    .catch(err => {
      console.log('vendorFetchRequest Error: ', err);
      return err;
    });
};

export const vendorsFetchRequest = () => dispatch => {
  return superagent
    .get(`${process.env.REACT_APP_API_URL}/api/vendors`)
    .then(res => {
      dispatch(vendorsFetch(res.body));
      return res.body;
    })
    .catch(err => {
      console.log('vendorsFetchRequest Error: ', err);
      return err;
    });
};

export const vendorCreateRequest = vendor => dispatch => {
  const token = localStorage.getItem('gSaleToken');
  return superagent
    .post(`${process.env.REACT_APP_API_URL}/api/vendors`)
    .set('Authorization', `Bearer ${token}`)
    .send(vendor)
    .then(res => {
      dispatch(vendorCreate(res.body));
      return res.body;
    })
    .catch(err => {
      console.log('vendorCreateRequest Error: ', err);
      return err;
    });
};

export const vendorDeleteRequest = vendorId => dispatch => {
  const token = localStorage.getItem('gSaleToken');
  return superagent
    .delete(`${process.env.REACT_APP_API_URL}/api/vendors/${vendorId}`)
    .set('Authorization', `Bearer ${token}`)
    .then(res => {
      dispatch(vendorDelete(res.body));
      return res.body;
    })
    .catch(err => {
      console.log('vendorDeleteRequest Error: ', err);
      return err;
    });
};

export const vendorUpdateRequest = vendor => dispatch => {
  const token = localStorage.getItem('gSaleToken');
  return superagent
    .put(`${process.env.REACT_APP_API_URL}/api/vendors/${vendor.id}`)
    .set('Authorization', `Bearer ${token}`)
    .send(vendor)
    .then(res => {
      dispatch(vendorUpdate(res.body));
      return res.body;
    })
    .catch(err => {
      console.log('vendorUpdateRequest Error: ', err);
      return err;
    });
};
