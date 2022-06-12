export const categoryFetch = category => ({
  type: 'CATEGORY_FETCH',
  payload: category,
});

export const categoryClear = category => ({
  type: 'CATEGORY_CLEAR',
  payload: category,
});
