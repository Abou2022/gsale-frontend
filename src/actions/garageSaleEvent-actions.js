import superagent from 'superagent';

export const garageSaleEventFetch = garageSaleEvent => ({
    type: 'GARAGE_SALE_EVENT_FETCH',
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

export const garageSaleEventFetchRequest = garageSaleEventID => (dispatch) => {
    return superagent.get(`${process.env.REACT_APP_API_URL}/api/garageSaleEvents/${garageSaleEventID}`)
        .then(res => {
            dispatch(garageSaleEventFetch(res.body));
            return res.body;
        })
        .catch(err => {
            console.log("garageSaleEventFetchRequest Error: ", err);
            return err;
        });
};

export const garageSaleEventsFetchRequest = () => (dispatch) => {
    return superagent.get(`${process.env.REACT_APP_API_URL}/api/garageSaleEvents`)
        .then(res => {
            dispatch(garageSaleEventsFetch(res.body));
            return res.body;
        })
        .catch(err => {
            console.log("garageSaleEventsFetchRequest Error: ", err);
            return err;
        });
};

export const garageSaleEventCreateRequest = garageSaleEvent => (dispatch) => {
    const token = localStorage.getItem("gSaleToken");
    return superagent.post(`${process.env.REACT_APP_API_URL}/api/garageSaleEvents`)
        .set('Authorization', `Bearer ${token}`)
        .send(garageSaleEvent)
        .then(res => {
            dispatch(garageSaleEventCreate(res.body));
            return res.body;
        })
        .catch(err => {
            console.log("garageSaleEventCreateRequest Error: ", err);
            return err;
        });
};

export const garageSaleEventDeleteRequest = garageSaleEventId => (dispatch) => {
    const token = localStorage.getItem("gSaleToken");
    return superagent.delete(`${process.env.REACT_APP_API_URL}/api/garageSaleEvents/${garageSaleEventId}`)
        .set('Authorization', `Bearer ${token}`)
        .then(res => {
            dispatch(garageSaleEventDelete(res.body));
            return res.body;
        })
        .catch(err => {
            console.log("garageSaleEventDeleteRequest Error: ", err);
            return err;
        });
};

export const garageSaleEventUpdateRequest = garageSaleEvent => (dispatch) => {
    const token = localStorage.getItem("gSaleToken");
    return superagent.put(`${process.env.REACT_APP_API_URL}/api/garageSaleEvents/${garageSaleEvent.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(garageSaleEvent)
        .then(res => {
            dispatch(garageSaleEventUpdate(res.body));
            return res.body;
        })
        .catch(err => {
            console.log("garageSaleEventUpdateRequest Error: ", err);
            return err;
        });
};