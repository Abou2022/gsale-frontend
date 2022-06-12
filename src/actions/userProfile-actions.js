import superagent from 'superagent';
import { categoryFetch } from './category-actions';

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
  const token = JSON.parse(localStorage.getItem('gSaleToken'));

  console.log('userProfileUpdateRequest: ', profile);
  console.log('token: ', token);
  console.log('userAuth: ', userAuth);
  return superagent
    .put(`https://gsale-backend.herokuapp.com/api/profiles/${userProfile.id}`)
    .set('Authorization', `Bearer ${userAuth}`)
    .send(profile)
    .then(res => {
      console.log('res.body: ', res.body);
      dispatch(userProfileUpdate(profile));
      dispatch(categoryFetch(profile.category));
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
    .get(`https://gsale-backend.herokuapp.com/api/profiles/${userProfile.id}`)
    .set('Authorization', `Bearer ${userAuth}`)
    .then(res => {
      dispatch(userProfileFetch(res.body));
      dispatch(categoryFetch(res.body.category));
      return res.body;
    })
    .catch(err => {
      console.log('userProfileFetchRequest Error: ', err);
      return err;
    });
};
