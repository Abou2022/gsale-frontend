export const searchCriteriaUpdate = data => ({
  type: 'SEARCH_CRITERIA_UPDATE',
  payload: data,
});
export const searchCriteriaClear = () => ({
  type: 'SEARCH_CRITERIA_CLEAR',
  payload: null,
});
