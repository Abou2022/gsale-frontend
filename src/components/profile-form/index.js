import React from 'react';

class ProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.userProfile
      ? { ...props.userProfile }
      : {
          //   email: '',
          firstName: '',
          lastName: '',
          phoneNumber: '',
          imageURL: '',
        };
  }
  componentWillReceiveProps(props) {
    if (props.userProfile) {
      this.setState(props.userProfile);
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    return this.props.onComplete(this.state);
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    return (
      <section className="profile-form">
        <form className="form" onSubmit={this.handleSubmit}>
          <h2 className="title">{this.props.profileAction} your profile.</h2>
          {/* <label htmlFor='email' className='profileFormLabel'>Email: </label>
          <input 
            type="text" 
            placeholder="Email" 
            value={this.state.email || ''}
            name="email"
            onChange={this.handleChange}/> */}
          <label htmlFor="firstName" className="profileFormLabel">
            First Name:{' '}
          </label>
          <input
            type="text"
            placeholder="firstName"
            value={this.state.firstName || ''}
            name="firstName"
            onChange={this.handleChange}
          />
          <label htmlFor="lastName" className="profileFormLabel">
            Last Name:{' '}
          </label>
          <input
            type="text"
            placeholder="lastName"
            value={this.state.lastName || ''}
            name="lastName"
            onChange={this.handleChange}
          />
          <label htmlFor="phoneNumber" className="profileFormLabel">
            PhoneNumber:{' '}
          </label>
          <input
            type="text"
            placeholder="phoneNumber"
            value={this.state.phoneNumber || ''}
            name="phoneNumber"
            onChange={this.handleChange}
          />
          <label htmlFor="imageURL" className="profileFormLabel">
            Profile img URL:{' '}
          </label>
          <input
            type="text"
            placeholder="img url"
            value={this.state.imageURL || ''}
            name="imageURL"
            onChange={this.handleChange}
          />
          <p className="textRight">
            <button className="primary-button b-button" type="submit">
              Submit
            </button>
          </p>
        </form>
      </section>
    );
  }
}

export default ProfileForm;
