import React from 'react';
import superagent from 'superagent';
import { isEmail, isAlphanumeric, isAscii } from 'validator';

// import Tooltip from '../helpers/tooltip';
import { classToggler, renderIf } from '../../lib/util';

class UserAuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailError: null,
      passwordError: null,
      error: null,
      focused: null,
      submitted: false,
    };
  }
  componentWillUnmount() {
    this.setState({ email: '', password: '' });
  }
  validateInput = e => {
    let { name, value } = e.target;

    let errors = {
      emailError: this.state.emailError,
      passwordError: this.state.passwordError,
    };

    let setError = (name, error) => errors[`${name}Error`] = error;
    let deleteError = name => errors[`${name}Error`] = null;

    if(name === 'email') {
      if(!value)
        setError(name, `${name} can not be empty`)
      else if(!isEmail(value))
        setError(name, `${value} is not a valid email`)
      else
        deleteError(name)
    }

    if(name === 'password') {
      if(!value)
        setError(name, `${name} can not be empty`)
      else if(!isAscii(value))
        setError(name, 'password may only contain normal charachters')
      else 
        deleteError(name)
    }

    this.setState({
      ...errors, error: !!(errors.emailError || errors.passwordError),
    })
  };
  handleFocus = e => this.setState({ focused: e.target.name});
  handleBlur = e => {
    let { name } = e.target;
    this.setState(state => ({
      focused: state.focused == name ? null : state.focused,
    }))
  };
  handleChange = e => {
    let { name, value } = e.target;
    this.validateInput({...e});

    this.setState({
      [name]: value,
    });

  };

  handleSubmit = e => {
    e.preventDefault();
    if(!this.state.error) {
      this.props.onComplete(this.state)
        .catch(err => {
          this.setState({ 
            submitted: true,
        });
      });
    }
    this.setState(state => ({
      submitted: true,
      emailError: state.emailError || state.email ? null : 'required',
      passwordError: state.passwordError || state.password ? null : 'required',
    }))
  };
  render() {
    let { focused, submitted, username, emailError, passwordError, usernameError, usernameAvailable } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className={classToggler({
        'form userauth-form': true,
        'error': this.state.error && this.state.submitted,
      })}>
        {renderIf(this.props.authFormAction === 'Sign Up',
          <div>
            <h2 className='title'>sign up.</h2>
            <input
              className={classToggler({error: emailError})}
              type='text'
              name='email'
              placeholder='Email Address'
              value={this.state.email}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
            />
            {/* <Tooltip message={emailError} show={focused === 'email' || submitted} /> */}
          </div>
        )}
        {renderIf(this.props.authFormAction !== 'Sign Up',
          <div>
            <h2 className='title'>sign in.</h2>
          </div>
        )}
        {/* <Tooltip message={usernameError} show={focused === 'username' || submitted}/> */}
        {renderIf(username && this.props.authFormAction=== 'Sign Up',
          <div className='username-availability-outer'>
            <p className='username-availability'>
              {username} {usernameAvailable ? 'is available': 'is not available'}
            </p>
          </div>
        )}
        <input
          className={classToggler({passwordError})}
          type='password'
          name='password'
          placeholder='Password (case sensitive)'
          value={this.state.password}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        {/* <Tooltip message={passwordError} show={ focused === 'password' || submitted}/> */}
        <button className='red-button b-button float-right ml20' type='submit'> {this.props.authFormAction} </button>
      </form>
    );
  }
}

export default UserAuthForm;