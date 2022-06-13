import React from 'react';
import { isAscii, isURL } from 'validator';
import { classToggler, renderIf } from '../../lib/util';
import DateTimePickerContainer from '../dateTimePickerContainer';
import LocationAutocomplete from '../locationAutoComplete';
import './garageSaleEvent-form.css';

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

  // componentDidUpdate(prevProps) {
  //   console.log('componentDidUpdate: ', prevProps);
  //   if (this.props.gse !== prevProps.gse) {
  //     console.log('date type: ', typeof this.props.gse.endDate);
  //     this.setState({
  //       eventName: this.props.gse.eventName,
  //       description: this.props.gse.description,
  //       startDate: this.props.gse.startDate,
  //       endDate: this.props.gse.endDate,
  //       address: this.props.gse.address,
  //       lat: this.props.gse.lat,
  //       lng: this.props.gse.lng,
  //       imageURL: this.props.gse.imageURL,
  //       eventNameError: null,
  //       descriptionError: null,
  //       startDateError: null,
  //       endDateError: null,
  //       addressError: null,
  //       latError: null,
  //       lngError: null,
  //       imageURLError: null,
  //       error: null,
  //       focused: null,
  //       submitted: false,
  //     });
  //   }
  // }

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
        (
          errors.eventNameError ||
          errors.descriptionError ||
          errors.startDateError ||
          // startTimeError ||
          errors.endDateError ||
          // endTimeError ||
          errors.addressError
        )
        // latError ||
        // lngError ||
        // errors.imageURLError
      ),
    });
  };
  handleFocus = e => this.setState({ focused: e.target.name });
  handleBlur = () => {
    // this.setState(state => ({
    //   focused: state.focused === e.target.name ? null : state.focused,
    // }));
    // this.validateInput(e);
  };

  handleChange = e => {
    let { name, value } = e.target;
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
      });
    }
    this.setState(state => ({
      submitted: true,
      eventNameError:
        !state.eventNameError && state.eventName
          ? null
          : 'Event name is required.',
      descriptionError:
        !state.descriptionError && state.description
          ? null
          : 'Description is required.',
      startDateError:
        !state.startDateError && state.startDate
          ? null
          : 'Start date is required.',
      //   startTimeError:
      //     !state.startTimeError && state.startTime ? null : 'required',
      endDateError:
        !state.endDateError && state.endDate ? null : 'End date is required',
      //   endTimeError: !state.endTimeError && state.endTime ? null : 'required',
      addressError:
        !state.addressError && state.address ? null : 'Address is required',
      //   latError: !state.latError && state.lat ? null : 'required',
      //   lngError: !state.lngError && state.lng ? null : 'required',
      // imageURLError: !state.imageURLError && state.imageURL ? null : 'required',
    }));
  };
  render() {
    let buttonText = this.props.gse ? 'update' : 'create';
    const errors = [
      this.state.addressError,
      this.state.descriptionError,
      this.state.endDateError,
      this.state.eventNameError,
      this.state.latError,
      this.state.lngError,
      this.state.startDateError,
    ].filter(val => !!val);
    return (
      <form
        onSubmit={this.handleSubmit}
        className={classToggler({
          'form currentGarageSaleEvent-form': true,
          error: this.state.error && this.state.submitted,
          garageSale__container: true,
        })}
      >
        {renderIf(this.props.gse, <h2>Update</h2>)}
        {renderIf(
          !this.props.gse,
          <h2 className="createGarageSale">Create a Garage Sale Event</h2>
        )}
        <div className="garageSale__content">
          {!!errors.length && (
            <ul>
              {errors.map((error, i) => (
                <li style={{ color: 'red' }} key={`error-${i}`}>
                  {error}
                </li>
              ))}
            </ul>
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
          <DateTimePickerContainer
            handleDate={this.handleStartDateChange}
            chosenDate={this.state.startDate}
          />

          <DateTimePickerContainer
            handleDate={this.handleEndDateChange}
            chosenDate={this.state.endDate}
          />
          <LocationAutocomplete
            handleLocationAutocomplete={this.handleLocationAutocomplete}
            address={this.state.address}
            autoCompleteTypeAddress={false}
          />

          <p className="textRight">
            <button
              className="btn btn-outline-success my-2 my-sm-1 rounded-pill"
              type="submit"
            >
              {' '}
              {buttonText}{' '}
            </button>
          </p>
        </div>
      </form>
    );
  }
}

export default GarageSaleEventForm;
