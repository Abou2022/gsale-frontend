import React from 'react';
// import superagent from 'superagent';
// import { isAscii } from 'validator';

// import Tooltip from '../helpers/tooltip';
// import { classToggler, renderIf } from '../../lib/util';

class GarageSaleEventForm extends React.Component {
  constructor(props) {
    super(props);
    // this.state = props.league
    //   ? this.props.league
    //   : {
    //       leagueName: '',
    //       privacy: 'public',
    //       password: '',
    //       image: '',
    //       motto: '',
    //       leagueNameError: null,
    //       poolSizeError: null,
    //       leagueNameAvailable: true,
    //       passwordError: null,
    //       error: null,
    //       focused: null,
    //       submitted: false,
    //     };
  }
  //   componentWillUnmount() {
  //     this.setState({ leagueName: '', privacy: 'public', password: '' });
  //   }
  //   validateInput = e => {
  //     let { name, value } = e.target;

  //     let errors = {
  //       passwordError: this.state.passwordError,
  //       leagueNameError: this.state.leagueNameError,
  //     };

  //     let setError = (name, error) => (errors[`${name}Error`] = error);
  //     let deleteError = name => (errors[`${name}Error`] = null);

  //     if (name === 'leagueName') {
  //       if (!value) setError(name, `${name} can not be empty`);
  //       else if (!isAscii(value))
  //         setError(name, 'password may only contain normal charachters');
  //       else deleteError(name);
  //     }

  //     // if(name === 'password') {
  //     //   if(!value && input[name='privacy'].value === 'private')
  //     //     setError(name, `${name} can not be empty`)
  //     //   else if(!isAscii(value))
  //     //     setError(name, 'password may only contain normal charachters')
  //     //   else
  //     //     deleteError(name)
  //     // }

  //     this.setState({
  //       ...errors,
  //       error: !!(errors.leagueNameError || errors.passwordError),
  //     });
  //   };
  //   handleFocus = e => this.setState({ focused: e.target.name });
  //   handleBlur = e => {
  //     let { name } = e.target;
  //     this.setState(state => ({
  //       focused: state.focused == name ? null : state.focused,
  //     }));
  //   };
  //   handleChange = e => {
  //     let { name, value } = e.target;
  //     this.validateInput({ ...e });

  //     this.setState({
  //       [name]: value,
  //     });

  //     if (!this.props.league && name === 'leagueName') {
  //       this.leagueNameCheckAvailable(value);
  //     }
  //   };
  //   leagueNameCheckAvailable = leagueName => {
  //     return superagent
  //       .get(`${process.env.API_URL}/api/leagueNames/${leagueName}`)
  //       .then(() => this.setState({ leagueNameAvailable: true }))
  //       .catch(() => this.setState({ leagueNameAvailable: false }));
  //   };
  //   handleSubmit = e => {
  //     e.preventDefault();
  //     if (!this.state.error) {
  //       this.props.onComplete(this.state).catch(err => {
  //         console.error(err);
  //         this.setState({
  //           error: err,
  //           submitted: true,
  //         });
  //       });
  //     }
  //     this.setState(state => ({
  //       submitted: true,
  //       leagueNameError:
  //         state.leagueNameError || state.leagueName ? null : 'required',
  //       passwordError: state.passwordError || state.password ? null : 'required',
  //     }));
  //   };
  render() {
    // let {
    //   focused,
    //   submitted,
    //   leagueName,
    //   passwordError,
    //   leagueNameError,
    //   leagueNameAvailable,
    // } = this.state;
    // let buttonText = this.props.league ? 'update' : 'create';
    return <div></div>;
  }
}

export default GarageSaleEventForm;

{
  /* <form
        onSubmit={this.handleSubmit}
        className={classToggler({
          'form league-form': true,
          error: this.state.error && this.state.submitted,
        })}
      >
        {renderIf(this.props.league, <h2>update.</h2>)}
        {renderIf(!this.props.league, <h2>create a league.</h2>)}
        <input
          className={classToggler({
            error: leagueNameError || !leagueNameAvailable,
          })}
          type="text"
          name="leagueName"
          placeholder="league name"
          value={this.state.leagueName}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        <Tooltip
          message={leagueNameError}
          show={focused === 'leagueName' || submitted}
        />
        {renderIf(
          leagueName,
          <div className="leagueName-availability-outer">
            <p className="leagueName-availability">
              {leagueName}{' '}
              {leagueNameAvailable ? 'is available' : 'is not available'}
            </p>
          </div>
        )}
        <input
          type="text"
          name="image"
          placeholder="image url"
          value={this.state.image}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        <input
          type="text"
          name="motto"
          placeholder="brief description"
          value={this.state.motto}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        <div className="radio-div">
          <p className="labelDesc">Privacy:</p>
          <div>
            <input
              type="radio"
              name="privacy"
              value="public"
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              checked={this.state.privacy === 'public' ? true : false}
            />
            <label>public</label>
            <span>Public leagues are open for anyone to join.</span>
          </div>
          <div className="radioPri">
            <input
              type="radio"
              name="privacy"
              value="private"
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              checked={this.state.privacy === 'private' ? true : false}
            />
            <label>private</label>
            <span>
              Set up within your office, or a group of family or friends.
            </span>
          </div>
        </div>
        {renderIf(
          this.state.privacy === 'private',
          <div>
            <input
              className={classToggler({ passwordError })}
              type="password"
              name="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
            />
            <Tooltip
              message={passwordError}
              show={focused === 'password' || submitted}
            />
          </div>
        )}
        <p className="textRight">
          <button className="red-button b-button" type="submit">
            {' '}
            {buttonText}{' '}
          </button>
        </p>
      </form> */
}
