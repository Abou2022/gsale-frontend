import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import GSaleLogo from '../../assets/GSale.png';
import searchIcon from '../../assets/images/search.svg';

import Modal from '../helpers/modal';
import UserAuthForm from '../userAuth-form';
import SearchLocationAutocomplete from '../searchLocationAutocomplete';
import DatePickerContainer from '../datePickerContainer';
import { renderIf } from './../../lib/util.js';
import {
  signUpRequest,
  signInRequest,
  signOut,
} from '../../actions/userAuth-actions.js';
import { searchCriteriaUpdate } from '../../actions/searchCriteria-actions.js';
import {
  garageSaleEventsFilterRequest,
  filterGarageSaleEvents,
} from '../../actions/garageSaleEvent-actions.js';

import './navbar.css';

function Navbar(props) {
  let [authFormAction, setAuthFormAction] = useState('Sign Up');
  let [formDisplay, setFormDisplay] = useState(false);

  const handleFormSubmit = e => {
    e.preventDefault();
    console.log('form submitted event: ', e);
  };

  const handleCreateEvent = e => {
    console.log('handleCreateEvent event: ', e);
  };

  const handleLoginSignUp = e => {
    console.log('handleLoginSignUp event: ', e);
    setFormDisplay(true);
  };

  const handleSignin = async e => {
    try {
      console.log('handleSignin: ', e);
      await props.signIn({ password: e.password, email: e.email });
      setFormDisplay(false);
    } catch (err) {
      console.log('signIn err: ', err);
    }
  };

  const handleSearchLocationAutocomplete = async (cityState, geoCoords) => {
    try {
      console.log('handleSearchLocationAutocomplete: ', cityState, geoCoords);
      let filter = {
        startDate: props.searchCriteria.startDate,
        endDate: props.searchCriteria.endDate,
        lat: geoCoords[0],
        lng: geoCoords[1],
        categories: props.searchCriteria.categories,
      };
      console.log('filter: ', filter);
      console.log('props.garageSaleEvent: ', props.garageSaleEvent);
      console.log(
        '11111111111111 handleSearchLocationAutocomplete here: ',
        filter
      );
      await props.garageSaleEventsFilter(filter);
    } catch (err) {
      console.log('Err handleSearchLocationAutocomplete: ', err);
    }
  };

  const handleSignup = async e => {
    try {
      console.log('handleSignup: ', e);
      await props.signUp({ password: e.password, email: e.email });
      setFormDisplay(false);
    } catch (err) {
      console.log('signUp err: ', err);
    }
  };

  const handleSignOut = () => {
    // localStorage.removeItem("gSaleToken");
    delete localStorage.gSaleToken;
    props.signOutRequest();
    props.history.push('/');
  };

  const handleDateRange = (dateRange) => {
    props.searchCriteriaUpdateRequest({
        startDate: dateRange[0] && !dateRange[1] ? null : dateRange[0],
        endDate: dateRange[1],
        lat: props.searchCriteria.lat,
        lng: props.searchCriteria.lng,
        categories: props.searchCriteria.categories,
    })
    console.log("handleDateRange: ", dateRange);
  };

  let handleComplete =
    authFormAction === 'Sign Up' ? handleSignup : handleSignin;
  let profileLink =
    props.userProfile && props.userProfile.id
      ? `/profile/${props.userProfile.id}`
      : '';
  return (
    <div>
      <div id="navbar" className="border-bottom">
        <div className="d-flex flex-row form-inline justify-content-between m-3 p-2">
          <div id="navGSaleLogoContainer">
            <Link to="/">
              <img id="navGSaleLogo" src={GSaleLogo} alt="gsale logo" />
            </Link>
          </div>
          <div id="searchFiltersContainer">
            <form
              className="d-flex flex-row form-inline my-2 my-lg-0 p-4"
              onSubmit={handleFormSubmit}
            >
              <SearchLocationAutocomplete
                handleSearchLocationAutocomplete={
                  handleSearchLocationAutocomplete
                }
              />
              <span className="spacer"></span>
              <DatePickerContainer handleDateRange={handleDateRange}/>
              <span className="spacer"></span>
              <input
                id="filterInput"
                type="text"
                placeholder="Filter"
                name="filter"
              ></input>
              <button id="">
                <img id="searchIcon" src={searchIcon} alt="search icon" />
              </button>
            </form>
          </div>
          {renderIf(
            props.userAuth,
            <button
              id="createEventButton"
              className="btn btn-outline-success my-2 my-sm-0 rounded-pill"
              onClick={handleCreateEvent}
            >
              {' '}
              Create Event
            </button>
          )}
          {renderIf(
            props.userProfile && props.userProfile.id,
            <Link to={profileLink}>Profile</Link>
          )}
          {renderIf(props.userAuth, <p onClick={handleSignOut}>Sign Out</p>)}
          {renderIf(
            !props.userAuth,
            <button
              id="loginSignUpButton"
              className="btn btn-outline-success my-2 my-sm-0 rounded-pill"
              onClick={handleLoginSignUp}
            >
              Login/Sign Up
            </button>
          )}
        </div>
      </div>
      <div>
        {renderIf(
          formDisplay,
          <div>
            <p>works</p>

            <Modal heading="G-Sale" close={() => setFormDisplay(false)}>
              <UserAuthForm
                authFormAction={authFormAction}
                onComplete={handleComplete}
              />

              <div className="userauth-buttons">
                {renderIf(
                  authFormAction === 'Sign In',
                  <button
                    className="b-button dark-button"
                    onClick={() => setAuthFormAction('Sign Up')}
                  >
                    Sign Up
                  </button>
                )}

                {renderIf(
                  authFormAction === 'Sign Up',
                  <button
                    className="b-button dark-button"
                    onClick={() => setAuthFormAction('Sign In')}
                  >
                    Sign In
                  </button>
                )}
              </div>
            </Modal>
          </div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  userAuth: state.userAuth,
  userProfile: state.userProfile,
  searchCriteria: state.searchCriteria,
  garageSaleEvent: state.garageSaleEvent,
});

const mapDispatchToProps = dispatch => ({
  signUp: user => dispatch(signUpRequest(user)),
  signIn: user => dispatch(signInRequest(user)),
  signOutRequest: () => dispatch(signOut()),
  searchCriteriaUpdateRequest: data => dispatch(searchCriteriaUpdate(data)),
  garageSaleEventsFilter: data => dispatch(garageSaleEventsFilterRequest(data)),
  filterGarageSaleEventsRequest: (data, filterObject) =>
    dispatch(filterGarageSaleEvents(data, filterObject)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
