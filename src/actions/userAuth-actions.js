import superagent from 'superagent';

export const signIn = token => ({
  type: 'SIGN_IN',
  payload: token,
});

export const signOut = () => ({
  type: 'SIGN_OUT',
  payload: null,
});

export const signUpRequest = user => dispatch => {
  return superagent
    .post(`${process.env.REACT_APP_API_URL}/api/users`)
    .send(user)
    .then(res => {
      dispatch(signIn(res.body));
      localStorage.setItem('gSaleToken', JSON.stringify(res.body.token));
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
      localStorage.setItem('gSaleToken', JSON.stringify(res.body.token));
      return res.body;
    })
    .catch(err => {
      console.log('signInRequest Error: ', err);
      return err;
    });
};

export const tokenSignInRequest = () => dispatch => {
  const token = JSON.parse(localStorage.getItem('gSaleToken'));
  return superagent
    .get(`${process.env.REACT_APP_API_URL}/api/users/token/login`)
    .set('Authorization', `Bearer ${token}`)
    .then(res => {
      console.log('res.body: ', res.body);
      //   dispatch(signIn(res.body));
      //   localStorage.setItem('gSaleToken', JSON.stringify(res.body.token));
      return true;
    })
    .catch(err => {
      console.log('tokenSignIn err: ', err);
      dispatch(signOut());
      return null;
    });
};
