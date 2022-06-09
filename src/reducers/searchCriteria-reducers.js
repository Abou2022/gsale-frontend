const initialState = {
  startDate: '',
  endDate: '',
  lat: 47.6062095,
  lng: -122.3320708,
  categories: [],
};
let searchCriteria = (state = initialState, action) => {
  let { type, payload } = action;

  switch (type) {
    case 'GARAGE_SALE_EVENTS_FILTER':
      return payload.filter;
    case 'SEARCH_CRITERIA_UPDATE':
      return payload;
    case 'SEARCH_CRITERIA_CLEAR':
      return initialState;
    default:
      return state;
  }
};

export default searchCriteria;
