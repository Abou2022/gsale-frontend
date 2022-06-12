import React from 'react';
import { isAscii } from 'validator';

import Tooltip from '../helpers/tooltip';
import { classToggler, renderIf } from '../../lib/util';
import DateTimePickerContainer from '../dateTimePickerContainer';
import LocationAutocomplete from '../locationAutoComplete';

class VendorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.vendorData
      ? {
          category: {
            id: this.props.vendorData.category.id,
            babyAndKid: this.props.vendorData.category.babyAndKid,
            clothing: this.props.vendorData.category.clothing,
            electronics: this.props.vendorData.category.electronics,
            bath: this.props.vendorData.category.bath,
            furniture: this.props.vendorData.category.furniture,
            kitchenware: this.props.vendorData.category.kitchenware,
            pet: this.props.vendorData.category.pet,
            sporting: this.props.vendorData.category.sporting,
            toysAndGames: this.props.vendorData.category.toysAndGames,
            other: this.props.vendorData.category.other,
          },
          items: this.props.vendorData.items,
          description: this.props.vendorData.description,
          startDate: this.props.vendorData.startDate,
          endDate: this.props.vendorData.endDate,
          address: this.props.vendorData.address,
          lat: this.props.vendorData.lat,
          lng: this.props.vendorData.lng,
          descriptionError: null,
          startDateError: null,
          endDateError: null,
          addressError: null,
          error: null,
          focused: null,
          submitted: false,
        }
      : {
          category: {
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
          items: [],
          description: '',
          startDate: new Date(Date.now()),
          endDate: new Date(Date.now() + 86400000),
          address: '',
          lat: '',
          lng: '',
          descriptionError: null,
          startDateError: null,
          endDateError: null,
          addressError: null,
          error: null,
          focused: null,
          submitted: false,
        };
  }
  componentWillUnmount() {
    this.setState({
      category: {
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
      items: '',
      description: '',
      startDate: '',
      endDate: '',
      address: '',
      lat: '',
      lng: '',
    });
  }

  componentDidUpdate(prevProps) {
    console.log('componentDidUpdate: ', prevProps);
    if (this.props.vendorData !== prevProps.vendorData) {
      console.log('date type: ', typeof this.props.vendorData.endDate);
      this.setState({
        items: this.props.vendorData.items,
        description: this.props.vendorData.description,
        startDate: this.props.vendorData.startDate,
        endDate: this.props.vendorData.endDate,
        address: this.props.vendorData.address,
        lat: this.props.vendorData.lat,
        lng: this.props.vendorData.lng,
        descriptionError: null,
        startDateError: null,
        endDateError: null,
        addressError: null,
        error: null,
        focused: null,
        submitted: false,
      });
    }
    if (this.props.categoryData !== prevProps.categoryData) {
      this.setState({
        category: {
          id: this.props.categoryData.id,
          babyAndKid: this.props.categoryData.babyAndKid,
          clothing: this.props.categoryData.clothing,
          electronics: this.props.categoryData.electronics,
          bath: this.props.categoryData.bath,
          furniture: this.props.categoryData.furniture,
          kitchenware: this.props.categoryData.kitchenware,
          pet: this.props.categoryData.pet,
          sporting: this.props.categoryData.sporting,
          toysAndGames: this.props.categoryData.toysAndGames,
          other: this.props.categoryData.other,
        },
      });
    }
  }

  validateInput = e => {
    let { name, value } = e.target;

    let errors = {
      descriptionError: this.state.descriptionError,
      startDateError: this.state.startDateError,
      endDateError: this.state.endDateError,
      addressError: this.state.addressError,
    };

    let setError = (name, error) => (errors[`${name}Error`] = error);
    let deleteError = name => (errors[`${name}Error`] = null);

    if (name === 'description') {
      if (!value) setError(name, 'Event Description can not be empty.');
      else if (!isAscii(value))
        setError(
          name,
          'Event Description may only contain normal charachters.'
        );
      else deleteError(name);
    }
    if (name === 'address') {
      if (!value) setError(name, 'Address can not be empty.');
      else deleteError(name);
    }

    this.setState({
      ...errors,
      error: !!(
        errors.descriptionError ||
        errors.startDateError ||
        errors.endDateError ||
        errors.addressError
      ),
    });
  };
  handleFocus = e => this.setState({ focused: e.target.name });
  handleBlur = e =>
    this.setState(state => ({
      focused: state.focused === e.target.name ? null : state.focused,
    }));
  handleChange = e => {
    let { name, value } = e.target;
    this.validateInput({ ...e });
    this.setState({ [name]: value });
  };
  handleCategoryChange = e => {
    let { name } = e.target;
    this.setState(prevState => ({
      category: { ...prevState.category, [name]: !prevState.category[name] },
    }));
  };
  handleStartDateChange = date => {
    console.log('start date:', date);
    this.setState({ startDate: date });
  };
  handleEndDateChange = date => {
    console.log('end date:', date);
    this.setState({ endDate: date });
  };

  handleLocationAutocomplete = (cityState, geoCoords) => {
    console.log('cityState, geoCoords: ', cityState, geoCoords);
    this.setState({ address: cityState, lat: geoCoords[0], lng: geoCoords[1] });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (!this.state.error) {
      this.props.onComplete(this.state).catch(err => {
        console.error(err);
        this.setState({
          error: err,
          submitted: true,
        });
      });
    }
    this.setState(state => ({
      submitted: true,
      descriptionError:
        !state.descriptionError && state.description ? null : 'required',
      startDateError:
        !state.startDateError && state.startDate ? null : 'required',
      endDateError: !state.endDateError && state.endDate ? null : 'required',
      addressError: !state.addressError && state.address ? null : 'required',
    }));
  };
  render() {
    let buttonText = this.props.vendorData ? 'update' : 'create';
    return (
      <form
        onSubmit={this.handleSubmit}
        className={classToggler({
          'form currentGarageSaleEvent-form': true,
          error: this.state.error && this.state.submitted,
        })}
      >
        {renderIf(this.props.vendorData, <h2>update.</h2>)}
        {renderIf(!this.props.vendorData, <h2>Become a Vendor.</h2>)}
        <input
          className={classToggler({ error: this.state.descriptionError })}
          type="text"
          name="description"
          placeholder="event description"
          value={this.state.description}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        <Tooltip
          message={this.state.descriptionError}
          show={this.state.focused === 'description' || this.state.submitted}
        />

        <DateTimePickerContainer
          handleDate={this.handleStartDateChange}
          chosenDate={this.state.startDate}
        />
        <Tooltip
          message={this.state.startDateError}
          show={this.state.submitted}
        />

        <DateTimePickerContainer
          handleDate={this.handleEndDateChange}
          chosenDate={this.state.endDate}
        />
        <Tooltip
          message={this.state.endDateError}
          show={this.state.submitted}
        />

        <LocationAutocomplete
          handleLocationAutocomplete={this.handleLocationAutocomplete}
          address={this.state.address}
          autoCompleteTypeAddress={true}
        />
        <Tooltip
          message={this.state.addressError}
          show={this.state.submitted}
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
          <button className="red-button b-button" type="submit">
            {' '}
            {buttonText}{' '}
          </button>
        </p>
      </form>
    );
  }
}

export default VendorForm;
