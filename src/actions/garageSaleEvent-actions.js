import superagent from 'superagent';
import { getZipsArray } from '../lib/util';

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

const categorySelection = async (data, filter) => dispatch => {
  try {
    console.log('categorySelection data: ', data[0], data.length);
    if (filter.categories && filter.categories.length) {
      data = data.filter(gse => {
        let hasCategory = false;
        filter.categories.forEach(filterCategory => {
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
    dispatch(garageSaleEventsFilter(data));
  } catch (err) {
    console.log('err: ', err);
    dispatch(garageSaleEventsFilter(data));
  }
};

const garageSaleEventsFilterRequestHelper = async (data, filter) => {
  try {
    console.log(
      'garageSaleEventsFilterRequestHelper data: ',
      data[0],
      data.length
    );
    if (filter.lat && filter.lng) {
      const zipsArray = await getZipsArray(filter.lat, filter.lng);
      if (!Array.isArray(zipsArray) || !zipsArray.length) {
        categorySelection(data, filter);
        return;
      }
      data = data.filter(gse => zipsArray.indexOf(gse.zip) >= 0);
    }
    categorySelection(data, filter);
  } catch (err) {
    console.log('err: ', err);
    categorySelection(data, filter);
  }
};

// requires end and start date
export const garageSaleEventsFilterRequest = filter => {
  console.log('garageSaleEventsFilterRequest filter: ', filter);
  return superagent
    .get(`${process.env.REACT_APP_API_URL}/api/garageSaleEvents`)
    .then(res => {
      const todaysDate = new Date();
      var filteredByDates = res.body.filter(data => {
        const dataStartDate = new Date(data.startDate);
        if (filter.endDate) {
          const dataEndDate = new Date(data.endDate);
          const filterEndDate = new Date(filter.endDate);
          const filterStartDate = new Date(filter.startDate);
          return (
            (dataEndDate >= filterStartDate && dataEndDate <= filterEndDate) ||
            (dataStartDate >= filterStartDate && dataStartDate <= filterEndDate)
          );
        } else {
          return dataStartDate >= todaysDate;
        }
      });
      garageSaleEventsFilterRequestHelper(filteredByDates, filter);
    })
    .catch(err => {
      console.log('garageSaleEventsFilterRequest Error: ', err);
      if (res && res.body) {
        garageSaleEventsFilterRequestHelper(res.body, filter);
      }
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
