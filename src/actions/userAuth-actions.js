import superagent from 'superagent';

export const signIn = token => ({
  type: 'SIGN_IN',
  payload: token,
});

export const signOut = () => {
  delete localStorage.gSaleToken;
  // localStorage.removeItem("gSaleToken");
  return { type: 'SIGN_OUT' };
};

export const signUpRequest = user => dispatch => {
  return superagent
    .post(`${process.env.REACT_APP_API_URL}/api/users`)
    .send(user)
    .then(res => {
      console.log('signUpRequest res: ', res);
      dispatch(signIn(res.body));
      localStorage.setItem('gSaleToken', res.body.token);
      return res.body;
    })
    .catch(err => {
      console.log('signUpRequest Error: ', err);
      return err;
    });
};

export const signInRequest = user => dispatch => {
  return superagent
    .post(`${process.env.REACT_APP_API_URL}/api/users/login`)
    .send(user)
    .then(res => {
      console.log(' signInRequest res: ', res);
      dispatch(signIn(res.body));
      localStorage.setItem('gSaleToken', res.body.token);
      return res.body;
    })
    .catch(err => {
      console.log('signInRequest Error: ', err);
      return err;
    });
};

export const tokenSignInRequest = token => dispatch => {
  return superagent
    .get(`${process.env.REACT_APP_API_URL}/api/users/token/login`)
    .set('Authorization', `Bearer ${token}`)
    .then(res => {
      dispatch(signIn(res.body));
      localStorage.setItem('gSaleToken', res.body.token);
      return res.body;
    })
    .catch(err => {
      console.log('tokenSignInRequest Error: ', err);
      return err;
    });
};
