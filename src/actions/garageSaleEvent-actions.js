import superagent from 'superagent';
import { distance } from '../lib/util';

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

export const categorySelection = (data, filterObject) => dispatch => {
  try {
    console.log('categorySelection data: ', data[0], data.length);
    if (filterObject.categories && filterObject.categories.length) {
      data = data.filter(gse => {
        let hasCategory = false;
        filterObject.categories.forEach(filterCategory => {
          console.log(
            'gse.category[filterCategory]: ',
            gse.category[filterCategory]
          );
          if (gse.category[filterCategory]) {
            hasCategory = true;
            return;
          }
        });
        return hasCategory;
      });
    }
    dispatch(garageSaleEventsFilter({ gse: data, filter: filterObject }));
  } catch (err) {
    console.log('err: ', err);
    dispatch(garageSaleEventsFilter({ gse: data, filter: filterObject }));
  }
};

export const categoryFilterHelper = (data, filterObject) => {
  if (filterObject.categories && filterObject.categories.length) {
    data = data.filter(gse => {
      let hasCategory = false;
      filterObject.categories.forEach(filterCategory => {
        console.log(
          'gse.category[filterCategory]: ',
          gse.category[filterCategory]
        );
        if (gse.category[filterCategory]) {
          hasCategory = true;
          return;
        }
      });
      return hasCategory;
    });
  }
  return data;
};

// garageSaleEventsFilterRequestHelper
export const locationFilterHelper = (data, filterObject, radius = 25) => {
  if (data && data.length && filterObject.lat && filterObject.lng) {
    data = data.filter(
      gse =>
        distance(gse.lat, gse.lng, filterObject.lat, filterObject.lng) < radius
    );
  }
  return data;
};

export const dateFilterHelper = (data, filterObject) => {
  const todaysDate = new Date();
  const filterEndDate = new Date(filterObject.endDate);
  const filterStartDate = new Date(filterObject.startDate);
  let filteredByDates = data.filter(gse => {
    const dataStartDate = new Date(gse.startDate);
    if (filterObject.endDate) {
      const dataEndDate = new Date(gse.endDate);
      return (
        (dataEndDate >= filterStartDate && dataEndDate <= filterEndDate) ||
        (dataStartDate >= filterStartDate && dataStartDate <= filterEndDate)
      );
    } else {
      return dataStartDate >= todaysDate;
    }
  });
  return filteredByDates;
};

// requires end and start date
// eslint-disable-next-line
export const garageSaleEventsFilterRequest = filterObject => dispatch => {
  console.log('garageSaleEventsFilterRequest filter: ', filterObject);
  return superagent
    .get(`${process.env.REACT_APP_API_URL}/api/garageSaleEvents`)
    .then(res => {
      let data = dateFilterHelper(res.body, filterObject);
      data = locationFilterHelper(data, filterObject);
      data = categoryFilterHelper(data, filterObject);
      dispatch(garageSaleEventsFilter({ gse: data, filter: filterObject }));
    })
    .catch(err => {
      console.log('garageSaleEventsFilterRequest Error: ', err);
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
