import React from 'react';
import { Link } from "react-router-dom";
import GSaleLogo from '../../assets/GSale.png'
import searchIcon from '../../assets/images/search.svg';
import './navbar.css';

function Navbar(props) {
    const handleFormSubmit = e => {
        e.preventDefault();
        console.log("form submitted event: ", e);
    };

    const handleCreateEvent = e => {
        console.log("handleCreateEvent event: ", e);
    };

    const handleLoginSignUp = e => {
        console.log("handleLoginSignUp event: ", e);
    };

    return (
        <div id="navbar">
            <div>
                <div id="navGSaleLogoContainer">
                    <Link to="/"><img id="navGSaleLogo" src={GSaleLogo} alt="gsale logo" /></Link>
                </div>
                <div id="searchFiltersContainer">
                    <form className="d-flex flex-row form-inline my-2 my-lg-0 p-2" onSubmit={handleFormSubmit}>
                        <input id='locationInput' type="text" placeholder='Location' name='location'></input><span className="spacer"></span>
                        <input id='dateInput' type="text" placeholder='Date' name='date'></input><span className="spacer"></span>
                        <input id='filterInput' type="text" placeholder='Filter' name='filter'></input>
                        <button id=""><img id="searchIcon" src={searchIcon} alt="search icon" /></button>
                    </form>
                </div>
                <button id="createEventButton" className="btn btn-outline-success my-2 my-sm-0 rounded-pill" onClick={handleCreateEvent}> Create Event</button>
                <button id="loginSignUpButton" className="btn btn-outline-success my-2 my-sm-0 rounded-pill" onClick={handleLoginSignUp}>Login/Sign Up</button>
            </div>
        </div>
    );
};

export default Navbar;