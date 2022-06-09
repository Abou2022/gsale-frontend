export const unfilteredGarageSaleEventsFetch = unfilteredGarageSaleEvents => ({
  type: 'UNFILTERED_GARAGE_SALE_EVENTS_FETCH',
  payload: unfilteredGarageSaleEvents,
});

export const unfilteredGarageSaleEventsClear = () => ({
  type: 'UNFILTERED_GARAGE_SALE_EVENTS_CLEAR',
  payload: null,
});
