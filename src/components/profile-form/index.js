import React from 'react';

class ProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.userProfile
      ? {
          category: {
            id: this.props.userProfile.category.id,
            babyAndKid: this.props.userProfile.category.babyAndKid,
            clothing: this.props.userProfile.category.clothing,
            electronics: this.props.userProfile.category.electronics,
            bath: this.props.userProfile.category.bath,
            furniture: this.props.userProfile.category.furniture,
            kitchenware: this.props.userProfile.category.kitchenware,
            pet: this.props.userProfile.category.pet,
            sporting: this.props.userProfile.category.sporting,
            toysAndGames: this.props.userProfile.category.toysAndGames,
            other: this.props.userProfile.category.other,
          },
          firstName: this.props.userProfile.firstName,
          lastName: this.props.userProfile.lastName,
          phoneNumber: this.props.userProfile.phoneNumber,
          imageURL: this.props.userProfile.imageURL,
        }
      : {
          category: {
            id: '',
            babyAndKid: false,
            clothing: false,
            electronics: false,
            bath: false,
            furniture: false,
            kitchenware: false,
            pet: false,
            sporting: false,
            toysAndGames: false,
            other: true,
          },
          firstName: '',
          lastName: '',
          phoneNumber: '',
          imageURL: '',
        };
  }
  componentDidMount() {
    if (this.props.userProfile && this.props.userProfile.category) {
      this.setState({
        category: {
          id: this.props.userProfile.category.id,
          babyAndKid: this.props.userProfile.category.babyAndKid,
          clothing: this.props.userProfile.category.clothing,
          electronics: this.props.userProfile.category.electronics,
          bath: this.props.userProfile.category.bath,
          furniture: this.props.userProfile.category.furniture,
          kitchenware: this.props.userProfile.category.kitchenware,
          pet: this.props.userProfile.category.pet,
          sporting: this.props.userProfile.category.sporting,
          toysAndGames: this.props.userProfile.category.toysAndGames,
          other: this.props.userProfile.category.other,
        },
        firstName: this.props.userProfile.firstName,
        lastName: this.props.userProfile.lastName,
        phoneNumber: this.props.userProfile.phoneNumber,
        imageURL: this.props.userProfile.imageURL,
      });
    }
  }

  componentWillUnmount() {
    this.setState({
      category: {
        id: '',
        babyAndKid: false,
        clothing: false,
        electronics: false,
        bath: false,
        furniture: false,
        kitchenware: false,
        pet: false,
        sporting: false,
        toysAndGames: false,
        other: true,
      },
      firstName: '',
      lastName: '',
      phoneNumber: '',
      imageURL: '',
    });
  }
  handleCategoryChange = e => {
    let { name } = e.target;
    this.setState(prevState => ({
      category: { ...prevState.category, [name]: !prevState.category[name] },
    }));
  };
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

          <div className="checkbox">
            <input
              type="checkbox"
              name="babyAndKid"
              checked={this.state.category.babyAndKid ? true : false}
              onChange={this.handleCategoryChange}
            />
            <label>Baby and Kids</label>

            <input
              type="checkbox"
              name="clothing"
              checked={this.state.category.clothing ? true : false}
              onChange={this.handleCategoryChange}
            />
            <label>Clothing</label>

            <input
              type="checkbox"
              name="electronics"
              checked={this.state.category.electronics ? true : false}
              onChange={this.handleCategoryChange}
            />
            <label>Electronics</label>

            <input
              type="checkbox"
              name="bath"
              checked={this.state.category.bath ? true : false}
              onChange={this.handleCategoryChange}
            />
            <label>Bath</label>

            <input
              type="checkbox"
              name="furniture"
              checked={this.state.category.furniture ? true : false}
              onChange={this.handleCategoryChange}
            />
            <label>Furniture</label>

            <input
              type="checkbox"
              name="kitchenware"
              checked={this.state.category.kitchenware ? true : false}
              onChange={this.handleCategoryChange}
            />
            <label>Kitchenware</label>

            <input
              type="checkbox"
              name="pet"
              checked={this.state.category.pet ? true : false}
              onChange={this.handleCategoryChange}
            />
            <label>Pet</label>

            <input
              type="checkbox"
              name="sporting"
              checked={this.state.category.sporting ? true : false}
              onChange={this.handleCategoryChange}
            />
            <label>sporting goods</label>

            <input
              type="checkbox"
              name="toysAndGames"
              checked={this.state.category.toysAndGames ? true : false}
              onChange={this.handleCategoryChange}
            />
            <label>toys And Games</label>

            <input
              type="checkbox"
              name="other"
              checked={this.state.category.other ? true : false}
              onChange={this.handleCategoryChange}
            />
            <label>Other</label>
          </div>
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
