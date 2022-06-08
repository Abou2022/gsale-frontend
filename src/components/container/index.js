import React from 'react';
import UserAuthForm from '../userAuth-form';
import superagent from 'superagent';

function Container() {
  // const [authFormAction, setauthFormAction] = useState('Sign Up');

  const handleSignup = (user, errCB) => {
    return superagent
      .post(`http://localhost:3001/api/users/signup`)
      .send(user)
      .then(res => {
        console.log('res: ', res);
        return res;
      });
  };
  return (
    <div>
      <UserAuthForm authFormAction="Sign Up" onComplete={handleSignup} />
    </div>
  );
}

export default Container;
