import superagent from 'superagent';
import moment from 'moment';

export const currentGarageSaleEventFetch = garageSaleEvent => ({
  type: 'CURRENT_GARAGE_SALE_EVENT_FETCH',
  payload: garageSaleEvent,
});

export const currentGarageSaleEventCreate = garageSaleEvent => ({
  type: 'CURRENT_GARAGE_SALE_EVENT_CREATE',
  payload: garageSaleEvent,
});

export const currentGarageSaleEventUpdate = garageSaleEvent => ({
  type: 'CURRENT_GARAGE_SALE_EVENT_UPDATE',
  payload: garageSaleEvent,
});

export const currentGarageSaleEventDelete = garageSaleEvent => ({
  type: 'CURRENT_GARAGE_SALE_EVENT_DELETE',
  payload: garageSaleEvent,
});

export const currentGarageSaleEventFetchRequest =
  garageSaleEventID => dispatch => {
    return superagent
      .get(
        `${process.env.REACT_APP_API_URL}/api/garageSaleEvents/${garageSaleEventID}`
      )
      .then(res => {
        dispatch(currentGarageSaleEventFetch(res.body.garageSaleEvent));
        return res.body.garageSaleEvent;
      })
      .catch(err => {
        console.log('currentGarageSaleEventFetch Error: ', err);
        return err;
      });
  };

export const currentGarageSaleEventCreateRequest =
  garageSaleEvent => dispatch => {
    const token = JSON.parse(localStorage.getItem('gSaleToken'));
    if (garageSaleEvent.startDate) {
      garageSaleEvent.startTime = moment(
        new Date(garageSaleEvent.startDate)
      ).format('hh:mm a');
    }
    if (garageSaleEvent.endDate) {
      garageSaleEvent.endTime = moment(
        new Date(garageSaleEvent.endDate)
      ).format('hh:mm a');
    }
    return superagent
      .post(`${process.env.REACT_APP_API_URL}/api/garageSaleEvents`)
      .set('Authorization', `Bearer ${token}`)
      .send(garageSaleEvent)
      .then(res => {
        console.log('currentGarageSaleEventCreateRequest: ', res.body);
        dispatch(currentGarageSaleEventCreate(res.body));
        return res.body;
      })
      .catch(err => {
        console.log('garageSaleEventCreateRequest Error: ', err);
        return err;
      });
  };

export const currentGarageSaleEventUpdateRequest =
  garageSaleEvent => dispatch => {
    const token = JSON.parse(localStorage.getItem('gSaleToken'));
    console.log('garagesaleevent: ', garageSaleEvent);
    if (garageSaleEvent.startDate) {
      garageSaleEvent.startTime = moment(
        new Date(garageSaleEvent.startDate)
      ).format('hh:mm a');
    }
    if (garageSaleEvent.endDate) {
      garageSaleEvent.endTime = moment(
        new Date(garageSaleEvent.endDate)
      ).format('hh:mm a');
    }
    return superagent
      .put(
        `${process.env.REACT_APP_API_URL}/api/garageSaleEvents/${garageSaleEvent.id}`
      )
      .set('Authorization', `Bearer ${token}`)
      .send(garageSaleEvent)
      .then(res => {
        console.log('res.body: ', res.body);
        dispatch(currentGarageSaleEventUpdate(garageSaleEvent));
        return res.body;
      })
      .catch(err => {
        console.log('garageSaleEventUpdateRequest Error: ', err);
        return err;
      });
  };

export const currentGarageSaleEventDeleteRequest =
  garageSaleEventId => dispatch => {
    const token = JSON.parse(localStorage.getItem('gSaleToken'));
    return superagent
      .delete(
        `${process.env.REACT_APP_API_URL}/api/garageSaleEvents/${garageSaleEventId}`
      )
      .set('Authorization', `Bearer ${token}`)
      .then(res => {
        dispatch(currentGarageSaleEventDelete(res.body));
        return res.body;
      })
      .catch(err => {
        console.log('garageSaleEventDeleteRequest Error: ', err);
        return err;
      });
  };
