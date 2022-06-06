import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import GSaleLogo from "../../assets/GSale.png";
import searchIcon from "../../assets/images/search.svg";

import Modal from "../helpers/modal";
import UserAuthForm from "../userAuth-form";
import { renderIf } from "./../../lib/util.js";
import {
  signUpRequest,
  signInRequest,
} from "../../actions/userAuth-actions.js";

import "./navbar.css";

function Navbar(props) {
  let [authFormAction, setAuthFormAction] = useState("Sign Up");
  let [formDisplay, setFormDisplay] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted event: ", e);
  };

  const handleCreateEvent = (e) => {
    console.log("handleCreateEvent event: ", e);
  };

  const handleLoginSignUp = (e) => {
    console.log("handleLoginSignUp event: ", e);
  };

  return (
    <div id="navbar" className="border-bottom">
      <div className="d-flex flex-row form-inline justify-content-between m-3 p-2">
        <div id="navGSaleLogoContainer">
          <Link to="/">
            <img id="navGSaleLogo" src={GSaleLogo} alt="gsale logo" />
          </Link>
        </div>
        <div id="searchFiltersContainer">
          <form
            className="d-flex flex-row form-inline my-2 my-lg-0 p-2"
            onSubmit={handleFormSubmit}
          >
            <input
              id="locationInput"
              type="text"
              placeholder="Location"
              name="location"
            ></input>
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
        <button
          id="createEventButton"
          className="btn btn-outline-success my-2 my-sm-0 rounded-pill"
          onClick={handleCreateEvent}
        >
          {" "}
          Create Event
        </button>
        <button
          id="loginSignUpButton"
          className="btn btn-outline-success my-2 my-sm-0 rounded-pill"
          onClick={handleLoginSignUp}
        >
          Login/Sign Up
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  userAuth: state.userAuth,
  userProfile: state.userProfile,
  attendees: state.attendess,
  comments: state.comments,
  garageSaleEvent: state.garageSaleEvent,
  vendors: state.vendors,
});

let mapDispatchToProps = (dispatch) => {
  return {
    signUp: (user) => dispatch(signUpRequest(user)),
    signIn: (user) => dispatch(signInRequest(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
