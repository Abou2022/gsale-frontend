import superagent from "superagent";
import { getZipsArray } from "../lib/util";

export const garageSaleEventFetch = (garageSaleEvent) => ({
  type: "GARAGE_SALE_EVENT_FETCH",
  payload: garageSaleEvent,
});

export const garageSaleEventsFilter = (garageSaleEvent) => ({
  type: "GARAGE_SALE_EVENTS_FILTER",
  payload: garageSaleEvent,
});

export const garageSaleEventsFetch = (garageSaleEvents) => ({
  type: "GARAGE_SALE_EVENTS_FETCH",
  payload: garageSaleEvents,
});

export const garageSaleEventCreate = (garageSaleEvent) => ({
  type: "GARAGE_SALE_EVENT_CREATE",
  payload: garageSaleEvent,
});

export const garageSaleEventUpdate = (garageSaleEvent) => ({
  type: "GARAGE_SALE_EVENT_UPDATE",
  payload: garageSaleEvent,
});

export const garageSaleEventDelete = (garageSaleEvent) => ({
  type: "GARAGE_SALE_EVENT_DELETE",
  payload: garageSaleEvent,
});

let filter = {
  startDate: "6/17/2022",
  endDate: "6/19/2022",
  lat: "41.031031",
  lng: "-121.054765",
  categories: ["antiques", "furniture"],
};

const garageSaleEventsFilterRequestHelper = async (data, filter) => {
  try {
    if (filter.lat && filter.lng) {
      const zipsArray = await getZipsArray(filter.lat, filter.lng);
      data = data.filter((gse) => zipsArray.indexOf(gse.zip) >= 0);
    }
    // myfunction(data,filter)
  } catch (err) {
    console.log("err: ", err);
    // myfunction(data,filter)
  }
};

export const garageSaleEventsFilterRequest = (filter) => (dispatch) => {
  return superagent
    .get(`${process.env.REACT_APP_API_URL}/api/garageSaleEvents`)
    .then((res) => {
      const filteredByDates = res.body.filter((data) => {
        if (filter.startDate) {
          const dataEndDate = new Date(data.endDate);
          const dataStartDate = new Date(data.startDate);
          const filterEndDate = new Date(filter.endDate);
          const filterStartDate = new Date(filter.startDate);
          return (
            (dataEndDate >= filterStartDate && dataEndDate <= filterEndDate) ||
            (dataStartDate >= filterStartDate && dataStartDate <= filterEndDate)
          );
        }
        return data;
      });
      garageSaleEventsFilterRequestHelper(filteredByDates, filter);
    })
    .catch((err) => {
      console.log("garageSaleEventsFilterRequest Error: ", err);
      garageSaleEventsFilterRequestHelper(res.body, filter);
    });
};

const categorySelection = async (data, filter) => {
  try {
    if (filter.categories) {
      data.filter((gse) => {
        let hasCategory = false;
        categories.forEach((category) => {
          if (gse.category) {
            hasCategory = true;
            return;
          }
        });
        return hasCategory;
      });
    } else {
      dispatch(garageSaleEventsFilter(data));
    }
  } catch (err) {
    console.log("err: ", err);
    dispatch(garageSaleEventsFilter(data));
  }
};

export const garageSaleEventFetchRequest =
  (garageSaleEventID) => (dispatch) => {
    return superagent
      .get(
        `${process.env.REACT_APP_API_URL}/api/garageSaleEvents/${garageSaleEventID}`
      )
      .then((res) => {
        dispatch(garageSaleEventFetch(res.body));
        return res.body;
      })
      .catch((err) => {
        console.log("garageSaleEventFetchRequest Error: ", err);
        return err;
      });
  };

export const garageSaleEventsFetchRequest = () => (dispatch) => {
  return superagent
    .get(`${process.env.REACT_APP_API_URL}/api/garageSaleEvents`)
    .then((res) => {
      dispatch(garageSaleEventsFetch(res.body));
      return res.body;
    })
    .catch((err) => {
      console.log("garageSaleEventsFetchRequest Error: ", err);
      return err;
    });
};

export const garageSaleEventCreateRequest = (garageSaleEvent) => (dispatch) => {
  const token = localStorage.getItem("gSaleToken");
  return superagent
    .post(`${process.env.REACT_APP_API_URL}/api/garageSaleEvents`)
    .set("Authorization", `Bearer ${token}`)
    .send(garageSaleEvent)
    .then((res) => {
      dispatch(garageSaleEventCreate(res.body));
      return res.body;
    })
    .catch((err) => {
      console.log("garageSaleEventCreateRequest Error: ", err);
      return err;
    });
};

export const garageSaleEventDeleteRequest =
  (garageSaleEventId) => (dispatch) => {
    const token = localStorage.getItem("gSaleToken");
    return superagent
      .delete(
        `${process.env.REACT_APP_API_URL}/api/garageSaleEvents/${garageSaleEventId}`
      )
      .set("Authorization", `Bearer ${token}`)
      .then((res) => {
        dispatch(garageSaleEventDelete(res.body));
        return res.body;
      })
      .catch((err) => {
        console.log("garageSaleEventDeleteRequest Error: ", err);
        return err;
      });
  };

export const garageSaleEventUpdateRequest = (garageSaleEvent) => (dispatch) => {
  const token = localStorage.getItem("gSaleToken");
  return superagent
    .put(
      `${process.env.REACT_APP_API_URL}/api/garageSaleEvents/${garageSaleEvent.id}`
    )
    .set("Authorization", `Bearer ${token}`)
    .send(garageSaleEvent)
    .then((res) => {
      dispatch(garageSaleEventUpdate(res.body));
      return res.body;
    })
    .catch((err) => {
      console.log("garageSaleEventUpdateRequest Error: ", err);
      return err;
    });
};
