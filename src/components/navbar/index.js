import React, { useState } from 'react';
import { connect } from 'react-redux';
import SearchLocationAutocomplete from '../searchLocationAutocomplete';
import { Link, useNavigate } from 'react-router-dom';

import GSaleLogo from '../../assets/GSale.png';
import Modal from '../helpers/modal';
import UserAuthForm from '../userAuth-form';
import GarageSaleEventForm from '../garageSaleEvent-form';
import FilterBar from '../filterBar';
import DatePickerContainer from '../datePickerContainer';
import { renderIf, logError } from './../../lib/util.js';
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
import { currentGarageSaleEventCreateRequest } from '../../actions/currentGarageSaleEvent-actions';
import './navbar.css';

function Navbar(props) {
  const [authFormAction, setAuthFormAction] = useState('Sign Up');
  const [authFormDisplay, setAuthFormDisplay] = useState(false);
  const [gseFormDisplay, setGseFormDisplay] = useState(false);
  let navigate = useNavigate();

  const handleSignin = async user => {
    try {
      await props.signIn({ password: user.password, email: user.email });
      setAuthFormDisplay(false);
    } catch (err) {
      logError(err);
    }
  };

  // eslint-disable-next-line
  const handleSearchLocationAutocomplete = async (cityState, geoCoords) => {
    try {
      const filter = {
        startDate: props.searchCriteria.startDate,
        endDate: props.searchCriteria.endDate,
        lat: geoCoords[0],
        lng: geoCoords[1],
        categories: props.searchCriteria.categories,
      };
      await props.garageSaleEventsFilter(filter);
    } catch (err) {
      logError(err);
    }
  };

  const handleDateRange = async dateRange => {
    try {
      const filter = {
        startDate: dateRange[0] && !dateRange[1] ? null : dateRange[0],
        endDate: dateRange[1],
        lat: props.searchCriteria.lat,
        lng: props.searchCriteria.lng,
        categories: props.searchCriteria.categories,
      };
      if (dateRange[0] && dateRange[1]) {
        await props.garageSaleEventsFilter(filter);
      } else if (!dateRange[0] && !dateRange[1]) {
        const to = setTimeout(() => {
          if (!dateRange[0] && !dateRange[1]) {
            clearTimeout(to);
            props.garageSaleEventsFilter(filter);
          } else {
            props.searchCriteriaUpdateRequest(filter);
          }
        }, 1500);
      }
    } catch (err) {
      logError(err);
    }
  };

  const handleSignup = async user => {
    try {
      await props.signUp({ password: user.password, email: user.email });
      setAuthFormDisplay(false);
    } catch (err) {
      logError(err);
    }
  };

  const handleSignOut = () => {
    // localStorage.removeItem("gSaleToken");
    delete localStorage.gSaleToken;
    props.signOutRequest();
    navigate('/');
  };

  let handleComplete =
    authFormAction === 'Sign Up' ? handleSignup : handleSignin;
  let profileLink =
    props.userProfile && props.userProfile.id
      ? `/profile/${props.userProfile.id}`
      : '';

  const handleGseCreate = async gse => {
    try {
      await props.currentGarageSaleEventCreate({
        password: gse.password,
        email: gse.email,
      });
      setGseFormDisplay(false);
    } catch (err) {
      logError(err);
    }
  };
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
              onSubmit={e => e.preventDefault()}
            >
              <SearchLocationAutocomplete
                handleSearchLocationAutocomplete={
                  handleSearchLocationAutocomplete
                }
              />
              <span className="spacer"></span>
              <DatePickerContainer handleDateRange={handleDateRange} />
            </form>
          </div>
          {renderIf(
            props.userAuth,
            <button
              id="createEventButton"
              className="btn btn-outline-success my-2 my-sm-0 rounded-pill"
              onClick={() => setGseFormDisplay(false)}
            >
              {' '}
              Create Event
            </button>
          )}
          {renderIf(
            props.userProfile && props.userProfile.id,
            <Link to={profileLink}>Profile</Link>
          )}
          <Link to="/garagesale/1">GSE 1</Link>
          {renderIf(
            props.userAuth,
            <p onClick={() => handleSignOut()}>Sign Out</p>
          )}
          {renderIf(
            !props.userAuth,
            <button
              id="loginSignUpButton"
              className="btn btn-outline-success my-2 my-sm-0 rounded-pill"
              onClick={() => setAuthFormDisplay(true)}
            >
              Login/Sign Up
            </button>
          )}
        </div>
      </div>
      <div>
        {renderIf(
          authFormDisplay,
          <Modal heading="G-Sale" close={() => setAuthFormDisplay(false)}>
            <UserAuthForm
              authFormAction={authFormAction}
              onComplete={handleComplete}
            />
            <div className="userauth-buttons">
              {renderIf(
                authFormAction === 'Sign In',
                <button
                  id="navSignUpButton"
                  className="b-button dark-button"
                  onClick={() => setAuthFormAction('Sign Up')}
                >
                  Sign Up
                </button>
              )}
              {renderIf(
                authFormAction === 'Sign Up',
                <button
                  id="navSignInButton"
                  className="b-button dark-button"
                  onClick={() => setAuthFormAction('Sign In')}
                >
                  Sign In
                </button>
              )}
            </div>
          </Modal>
        )}
        {renderIf(
          gseFormDisplay,
          <div>
            <Modal
              heading="Create Garage Sale"
              close={() => setGseFormDisplay(false)}
            >
              <GarageSaleEventForm onComplete={handleGseCreate} />
            </Modal>
          </div>
        )}
      </div>
      <FilterBar />
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
  currentGarageSaleEventCreate: gse =>
    dispatch(currentGarageSaleEventCreateRequest(gse)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
