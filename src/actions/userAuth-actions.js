import superagent from 'superagent';

export const signIn = token => ({
  type: 'SIGN_IN',
  payload: token,
});

export const signOut = () => {
  delete localStorage.token;
  return { type: 'SIGN_OUT' };
};

export const signUpRequest = user => dispatch => {
  return superagent.post(`${process.env.API_URL}/api/signup`)
    // .withCredentials()
    .send(user)
    .then( res => {
      dispatch(signIn(res.text));
      localStorage.token = res.text;
      return res;
    });
};

export const signInRequest = user => dispatch => {
  return superagent.get(`${process.env.API_URL}/api/signin`)
    // .withCredentials()
    .auth(user.username, user.password)
    .then( res => {
      dispatch(signIn(res.text));
      localStorage.token = res.text;
      return res;
    });
};

export const tokenSignInRequest = token => dispatch => {
  return superagent.get(`${process.env.API_URL}/api/signin/token`)
    .set('Authorization', `Bearer ${token}`)
    .then( res => {
      dispatch(signIn(res.text));
      localStorage.token = res.text;
      return res;
    });
};