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
          category: this.props.vendorData.category,
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
          category: {},
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
      category: '',
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
        category_id: this.props.vendorData.category_id,
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
