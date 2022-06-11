import superagent from 'superagent';

// to do: cases 'ADD_VENDOR' and 'ADD_ATTENDEE' in reducer are not accounted for

export const userProfileUpdate = userProfile => ({
  type: 'USERPROFILE_UPDATE',
  payload: userProfile,
});

export const userProfileFetch = userProfile => ({
  type: 'USERPROFILE_FETCH',
  payload: userProfile,
});

export const userProfileUpdateRequest = profile => (dispatch, getState) => {
  const { userAuth, userProfile } = getState();
  return superagent
    .put(`${process.env.REACT_APP_API_URL}/api/profiles/${userProfile.id}`)
    .set('Authorization', `Bearer ${userAuth}`)
    .send(profile)
    .then(res => {
      dispatch(userProfileUpdate(profile));
      return res.body;
    })
    .catch(err => {
      console.log('userProfileUpdateRequest Error: ', err);
      return err;
    });
};

export const userProfileFetchRequest = () => (dispatch, getState) => {
  const { userAuth, userProfile } = getState();
  return superagent
    .get(`${process.env.REACT_APP_API_URL}/api/profiles/${userProfile.id}`)
    .set('Authorization', `Bearer ${userAuth}`)
    .then(res => {
      dispatch(userProfileFetch(res.body));
      return res.body;
    })
    .catch(err => {
      console.log('userProfileFetchRequest Error: ', err);
      return err;
    });
};
