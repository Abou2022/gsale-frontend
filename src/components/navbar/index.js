import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import GSaleLogo from '../../assets/GSale.png';
import searchIcon from '../../assets/images/search.svg';

import Modal from '../helpers/modal';
import UserAuthForm from '../userAuth-form';
import SearchLocationAutocomplete from '../searchLocationAutocomplete';
import { renderIf } from './../../lib/util.js';
import {
  signUpRequest,
  signInRequest,
  signOut,
} from '../../actions/userAuth-actions.js';
import { searchCriteriaUpdate } from '../../actions/searchCriteria-actions.js';
import {
  garageSaleEventsFilterRequestHelper,
  garageSaleEventsFilterRequest,
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

  // let filter = {
  //   startDate: '6/17/2022',
  //   endDate: '6/19/2022',
  //   lat: '41.031031',
  //   lng: '-121.054765',
  //   categories: ['antiques', 'furniture'],
  // };
  const handleSearchLocationAutocomplete = (cityState, geoCoords) => {
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
      if (!props.garageSaleEvent || !props.garageSaleEvent.length) {
        console.log(
          '11111111111111 handleSearchLocationAutocomplete here: ',
          filter
        );
        props.garageSaleEventsFilter(filter).catch(err => {
          console.log(' garageSaleEventsFilter err: ', err);
        });
      } else {
        console.log(
          '222222222222222 handleSearchLocationAutocomplete here: ',
          filter
        );
        props
          .garageSaleEventsFilterRequestHelperRequest(
            props.garageSaleEvent,
            filter
          )
          .catch(err => {
            console.log(
              ' garageSaleEventsFilterRequestHelperRequest err: ',
              err
            );
          });
      }
      // props.searchCriteriaUpdateRequest(filter)
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
    props.signOutRequest();
    props.history.push('/');
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
              <input
                id="dateInput"
                type="text"
                placeholder="Date"
                name="date"
              ></input>
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
  // attendees: state.attendess,
  // comments: state.comments,
  garageSaleEvent: state.garageSaleEvent,
  // vendors: state.vendors
});

let mapDispatchToProps = dispatch => {
  return {
    signUp: user => dispatch(signUpRequest(user)),
    signIn: user => dispatch(signInRequest(user)),
    signOutRequest: () => dispatch(signOut()),
    searchCriteriaUpdateRequest: data => dispatch(searchCriteriaUpdate(data)),
    garageSaleEventsFilterRequestHelperRequest: (gse, filterObject) =>
      dispatch(garageSaleEventsFilterRequestHelper(gse, filterObject)),
    garageSaleEventsFilter: data =>
      dispatch(garageSaleEventsFilterRequest(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
