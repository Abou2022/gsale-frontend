import React from 'react';
import { isAscii, isURL } from 'validator';

import Tooltip from '../helpers/tooltip';
import { classToggler, renderIf } from '../../lib/util';
import DateTimePickerContainer from '../dateTimePickerContainer';
import LocationAutocomplete from '../locationAutoComplete';

class GarageSaleEventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.gse
      ? {
          eventName: this.props.gse.eventName,
          description: this.props.gse.description,
          startDate: this.props.gse.startDate,
          //   startTime: this.props.gse.startTime,
          endDate: this.props.gse.endDate,
          //   endTime: this.props.gse.endTime,
          address: this.props.gse.address,
          lat: this.props.gse.lat,
          lng: this.props.gse.lng,
          imageURL: this.props.gse.imageURL,
          eventNameError: null,
          descriptionError: null,
          startDateError: null,
          //   startTimeError: null,
          endDateError: null,
          //   endTimeError: null,
          addressError: null,
          latError: null,
          lngError: null,
          imageURLError: null,
          error: null,
          focused: null,
          submitted: false,
        }
      : {
          eventName: '',
          description: '',
          startDate: new Date(Date.now()),
          //   startTime: '',
          endDate: new Date(Date.now() + 86400000),
          //   endTime: '',
          address: '',
          lat: '',
          lng: '',
          imageURL: '',
          eventNameError: null,
          descriptionError: null,
          startDateError: null,
          //   startTimeError: null,
          endDateError: null,
          //   endTimeError: null,
          addressError: null,
          latError: null,
          lngError: null,
          imageURLError: null,
          error: null,
          focused: null,
          submitted: false,
        };
  }
  componentWillUnmount() {
    this.setState({
      eventName: '',
      description: '',
      startDate: '',
      //   startTime: '',
      endDate: '',
      //   endTime: '',
      address: '',
      lat: '',
      lng: '',
      imageURL: '',
    });
  }
  validateInput = e => {
    let { name, value } = e.target;

    let errors = {
      eventNameError: this.state.eventNameError,
      descriptionError: this.state.descriptionError,
      startDateError: this.state.startDateError,
      //   startTimeError: this.state.startTimeError,
      endDateError: this.state.endDateError,
      //   endTimeError: this.state.endTimeError,
      addressError: this.state.addressError,
      latError: this.state.latError,
      lngError: this.state.lngError,
      imageURLError: this.state.imageURLError,
    };

    let setError = (name, error) => (errors[`${name}Error`] = error);
    let deleteError = name => (errors[`${name}Error`] = null);

    if (name === 'eventName') {
      if (!value) setError(name, 'Event Name can not be empty.');
      else if (!isAscii(value))
        setError(name, 'Event Name may only contain normal charachters.');
      else deleteError(name);
    }
    if (name === 'description') {
      if (!value) setError(name, 'Event Description can not be empty.');
      else if (!isAscii(value))
        setError(
          name,
          'Event Description may only contain normal charachters.'
        );
      else deleteError(name);
    }
    // if (name === 'startDate') {
    //   if (!value) setError(name, 'Event Start Date can not be empty.');
    //   else if (!isDate(value))
    //     setError(name, 'Event Start Date must be a valid date.');
    //   else deleteError(name);
    // }
    // if (name === 'endDate') {
    //   if (!value) setError(name, 'Event End Date can not be empty.');
    //   else if (!isDate(value))
    //     setError(name, 'Event End Date must be a valid date.');
    //   else deleteError(name);
    // }
    // if (name === 'startTime') {
    //   if (!value) setError(name, 'Event Start Time can not be empty.');
    //   else deleteError(name);
    // }
    // if (name === 'endTime') {
    //   if (!value) setError(name, 'Event End Time can not be empty.');
    //   else deleteError(name);
    // }
    if (name === 'address') {
      if (!value) setError(name, 'Address can not be empty.');
      else deleteError(name);
    }
    // if (name === 'lat') {
    //   if (!value) setError(name, 'Lat can not be empty.');
    //   else deleteError(name);
    // }
    // if (name === 'lng') {
    //   if (!value) setError(name, 'Lng can not be empty.');
    //   else deleteError(name);
    // }
    if (name === 'imageURL') {
      if (value && !isURL(value))
        setError(name, 'The Event Image must be a valid URL.');
      else deleteError(name);
    }

    this.setState({
      ...errors,
      error: !!(
        errors.eventNameError ||
        errors.descriptionError ||
        errors.startDateError ||
        // startTimeError ||
        errors.endDateError ||
        // endTimeError ||
        errors.addressError ||
        // latError ||
        // lngError ||
        errors.imageURLError
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
    // to do set start time
  };
  handleEndDateChange = date => {
    console.log('end date:', date);
    this.setState({ endDate: date });
    // to do set end time
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
      eventNameError:
        !state.eventNameError && state.eventName ? null : 'required',
      descriptionError:
        !state.descriptionError && state.description ? null : 'required',
      startDateError:
        !state.startDateError && state.startDate ? null : 'required',
      //   startTimeError:
      //     !state.startTimeError && state.startTime ? null : 'required',
      endDateError: !state.endDateError && state.endDate ? null : 'required',
      //   endTimeError: !state.endTimeError && state.endTime ? null : 'required',
      addressError: !state.addressError && state.address ? null : 'required',
      //   latError: !state.latError && state.lat ? null : 'required',
      //   lngError: !state.lngError && state.lng ? null : 'required',
      imageURLError: !state.imageURLError && state.imageURL ? null : 'required',
    }));
  };
  render() {
    let buttonText = this.props.gse ? 'update' : 'create';
    return (
      <form
        onSubmit={this.handleSubmit}
        className={classToggler({
          'form currentGarageSaleEvent-form': true,
          error: this.state.error && this.state.submitted,
        })}
      >
        {renderIf(this.props.gse, <h2>update.</h2>)}
        {renderIf(
          !this.props.gse,
          <h2>create a Garage Sale Event.</h2>
        )}
        <input
          className={classToggler({ error: this.state.eventNameError })}
          type="text"
          name="eventName"
          placeholder="event name"
          value={this.state.eventName}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        <Tooltip
          message={this.state.eventNameError}
          show={this.state.focused === 'eventName' || this.state.submitted}
        />
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

        <input
          className={classToggler({ error: this.state.imageURLError })}
          type="text"
          name="imageURL"
          placeholder="event image url"
          value={this.state.imageURL}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        <Tooltip
          message={this.state.imageURLError}
          show={this.state.focused === 'imageURL' || this.state.submitted}
        />
        <DateTimePickerContainer
          handleDate={this.handleStartDate}
          chosenDate={this.state.startDate}
        />
        <Tooltip
          message={this.state.startDateError}
          show={this.state.submitted}
        />

        <DateTimePickerContainer
          handleDate={this.handleEndDate}
          chosenDate={this.state.endDate}
        />
        <Tooltip
          message={this.state.endDateError}
          show={this.state.submitted}
        />

        <LocationAutocomplete
          handleLocationAutocomplete={this.handleLocationAutocomplete}
          address={this.state.address}
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

export default GarageSaleEventForm;
