import React from 'react';
import { isEmail, isAscii } from 'validator';
import './userAuth.css';

import Tooltip from '../helpers/tooltip';
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

    let setError = (name, error) => (errors[`${name}Error`] = error);
    let deleteError = name => (errors[`${name}Error`] = null);

    if (name === 'email') {
      if (!value) {
        setError(name, `${name} can not be empty`);
      } else if (!isEmail(value)) {
        setError(name, `${value} is not a valid email`);
      } else {
        deleteError(name);
      }
    }

    if (name === 'password') {
      if (!value) {
        setError(name, `${name} can not be empty`);
      } else if (!isAscii(value)) {
        setError(name, 'password may only contain normal charachters');
      } else {
        deleteError(name);
      }
    }

    this.setState({
      ...errors,
      error: !!(errors.emailError || errors.passwordError),
    });
  };
  handleFocus = e => this.setState({ focused: e.target.name });
  handleBlur = e => {
    let { name } = e.target;
    this.setState(state => ({
      focused: state.focused === name ? null : state.focused,
    }));
  };
  handleChange = e => {
    let { name, value } = e.target;
    this.validateInput({ ...e });

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (!this.state.error) {
      this.props.onComplete(this.state).catch(err => {
        this.setState({ submitted: true });
        console.log('handleSubmit err: ', err);
      });
    }
    this.setState(state => ({
      submitted: true,
      emailError: state.emailError || state.email ? null : 'required',
      passwordError: state.passwordError || state.password ? null : 'required',
    }));
  };
  render() {
    let { focused, submitted, emailError, passwordError } = this.state;
    return (
      <form
        onSubmit={this.handleSubmit}
        className={classToggler({
          'form userauth-form': true,
          error: this.state.error && this.state.submitted,
        })}
      >
        {renderIf(
          this.props.authFormAction === 'Sign Up',
          <div>
            <h2 className="title">Sign Up</h2>
          </div>
        )}
        {renderIf(
          this.props.authFormAction !== 'Sign Up',
          <div>
            <h2 className="title">Sign In</h2>
          </div>
        )}
        <input
          className={classToggler({ error: emailError })}
          id="loginContainer"
          type="text"
          name="email"
          placeholder="Email Address"
          value={this.state.email}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        <Tooltip message={emailError} show={focused === 'email' || submitted} />
        <input
          className={classToggler({ passwordError })}
          id="loginContainer"
          type="password"
          name="password"
          placeholder="Password"
          value={this.state.password}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        <Tooltip
          message={passwordError}
          show={focused === 'password' || submitted}
        />
        <button
          className="btn btn-outline-success btn-sm rounded-pill"
          type="submit"
        >
          {' '}
          {this.props.authFormAction}{' '}
        </button>
      </form>
    );
  }
}

export default UserAuthForm;
