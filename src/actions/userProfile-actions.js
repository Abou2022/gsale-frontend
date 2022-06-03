import superagent from 'superagent';

export const userProfileCreate = userProfile => ({
  type: 'USERPROFILE_CREATE',
  payload: userProfile,
});

export const userProfileUpdate = userProfile => ({
  type: 'USERPROFILE_UPDATE',
  payload: userProfile,
});

export const userProfileFetch = userProfile => ({
  type: 'USERPROFILE_FETCH',
  payload: userProfile,
});

export const groupProfilesFetch = groupProfiles => ({
  type: 'GROUPPROFILES_FETCH',
  payload: groupProfiles,
});

export const userProfileCreateRequest = userProfile => (dispatch, getState) => {
  let { userAuth } = getState();
  return superagent.post(`${process.env.API_URL}/api/profile`)
    .set('Authorization', `Bearer ${userAuth}`)
    .field({username: userProfile.username, image: userProfile.image, country: userProfile.country, state: userProfile.state, birthdate: userProfile.birthdate, tags: userProfile.tags })
    .then( res => {
      dispatch(userProfileCreate(res.body));
      return res;
    });
};

export const userProfileUpdateRequest = profile => (dispatch, getState) => {
  let { userAuth, userProfile } = getState();
  
  return superagent.put(`${process.env.API_URL}/api/profile/${userProfile._id}`)
    .set('Authorization', `Bearer ${userAuth}`)
    .send(profile)
    .then( res => {
      dispatch(userProfileUpdate(res.body));
      return res;
    });
};

export const userProfileFetchRequest = ()  => (dispatch, getState) => {
  let { userAuth } = getState();
  return superagent.get(`${process.env.API_URL}/api/profiles/currentuser`)
    .set('Authorization', `Bearer ${userAuth}`)
    .then(res => {
      dispatch(userProfileFetch(res.body));
      return res;
    });
};

export const groupProfilesFetchRequest = profileIDs  => (dispatch, getState) => {
  let { userAuth } = getState();
  return superagent.post(`${process.env.API_URL}/api/profiles/group`)
    .set('Authorization', `Bearer ${userAuth}`)
    .send(profileIDs)
    .then(res => {
      dispatch(groupProfilesFetch(res.body));
      return res.body;
    });
};