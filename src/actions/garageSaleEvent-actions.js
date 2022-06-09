import superagent from 'superagent';
// import { batch } from 'react-redux';
import {
  dateFilterHelper,
  locationFilterHelper,
  categoryFilterHelper,
} from '../lib/util';
import { unfilteredGarageSaleEventsFetch } from './unfilteredGarageSaleEvent-actions';

export const garageSaleEventFetch = garageSaleEvent => ({
  type: 'GARAGE_SALE_EVENT_FETCH',
  payload: garageSaleEvent,
});

export const garageSaleEventsFilter = garageSaleEvent => ({
  type: 'GARAGE_SALE_EVENTS_FILTER',
  payload: garageSaleEvent,
});

export const garageSaleEventsFetch = garageSaleEvents => ({
  type: 'GARAGE_SALE_EVENTS_FETCH',
  payload: garageSaleEvents,
});

export const garageSaleEventCreate = garageSaleEvent => ({
  type: 'GARAGE_SALE_EVENT_CREATE',
  payload: garageSaleEvent,
});

export const garageSaleEventUpdate = garageSaleEvent => ({
  type: 'GARAGE_SALE_EVENT_UPDATE',
  payload: garageSaleEvent,
});

export const garageSaleEventDelete = garageSaleEvent => ({
  type: 'GARAGE_SALE_EVENT_DELETE',
  payload: garageSaleEvent,
});

// let filter = {
//   startDate: '6/17/2022',
//   endDate: '6/19/2022',
//   lat: '41.031031',
//   lng: '-121.054765',
//   categories: ['antiques', 'furniture'],
// };

export const filterGarageSaleEvents = (data, filterObject) => dispatch => {
  console.log('filterGarageSaleEvents: ', filterObject);
  data = dateFilterHelper(data, filterObject);
  data = locationFilterHelper(data, filterObject);
  data = categoryFilterHelper(data, filterObject);
  dispatch(garageSaleEventsFilter({ gse: data, filter: filterObject }));
};

// requires end and start date
// eslint-disable-next-line
export const garageSaleEventsFilterRequest = filterObject => dispatch => {
  console.log('garageSaleEventsFilterRequest filter: ', filterObject);
  return superagent
    .get(`${process.env.REACT_APP_API_URL}/api/garageSaleEvents`)
    .then(res => {
      console.log('res.body: ', res.body);
      let data = dateFilterHelper(res.body, filterObject);
      console.log('data: ', data);
      data = locationFilterHelper(data, filterObject);
      data = categoryFilterHelper(data, filterObject);
      dispatch(unfilteredGarageSaleEventsFetch(res.body));
      dispatch(garageSaleEventsFilter({ gse: data, filter: filterObject }));
      //   batch(() => {
      //     dispatch(unfilteredGarageSaleEventsFetch(res.body));
      //     dispatch(garageSaleEventsFilter({ gse: data, filter: filterObject }));
      //   });
      return res.body;
    })
    .catch(err => {
      console.log('garageSaleEventsFilterRequest Error: ', err);
      return err;
    });
};

export const garageSaleEventFetchRequest = garageSaleEventID => dispatch => {
  return superagent
    .get(
      `${process.env.REACT_APP_API_URL}/api/garageSaleEvents/${garageSaleEventID}`
    )
    .then(res => {
      dispatch(garageSaleEventFetch(res.body));
      return res.body;
    })
    .catch(err => {
      console.log('garageSaleEventFetchRequest Error: ', err);
      return err;
    });
};

export const garageSaleEventsFetchRequest = () => dispatch => {
  return superagent
    .get(`${process.env.REACT_APP_API_URL}/api/garageSaleEvents`)
    .then(res => {
      dispatch(garageSaleEventsFetch(res.body));
      return res.body;
    })
    .catch(err => {
      console.log('garageSaleEventsFetchRequest Error: ', err);
      return err;
    });
};

export const garageSaleEventCreateRequest = garageSaleEvent => dispatch => {
  const token = localStorage.getItem('gSaleToken');
  return superagent
    .post(`${process.env.REACT_APP_API_URL}/api/garageSaleEvents`)
    .set('Authorization', `Bearer ${token}`)
    .send(garageSaleEvent)
    .then(res => {
      dispatch(garageSaleEventCreate(res.body));
      return res.body;
    })
    .catch(err => {
      console.log('garageSaleEventCreateRequest Error: ', err);
      return err;
    });
};

export const garageSaleEventDeleteRequest = garageSaleEventId => dispatch => {
  const token = localStorage.getItem('gSaleToken');
  return superagent
    .delete(
      `${process.env.REACT_APP_API_URL}/api/garageSaleEvents/${garageSaleEventId}`
    )
    .set('Authorization', `Bearer ${token}`)
    .then(res => {
      dispatch(garageSaleEventDelete(res.body));
      return res.body;
    })
    .catch(err => {
      console.log('garageSaleEventDeleteRequest Error: ', err);
      return err;
    });
};

export const garageSaleEventUpdateRequest = garageSaleEvent => dispatch => {
  const token = localStorage.getItem('gSaleToken');
  return superagent
    .put(
      `${process.env.REACT_APP_API_URL}/api/garageSaleEvents/${garageSaleEvent.id}`
    )
    .set('Authorization', `Bearer ${token}`)
    .send(garageSaleEvent)
    .then(res => {
      dispatch(garageSaleEventUpdate(res.body));
      return res.body;
    })
    .catch(err => {
      console.log('garageSaleEventUpdateRequest Error: ', err);
      return err;
    });
};
