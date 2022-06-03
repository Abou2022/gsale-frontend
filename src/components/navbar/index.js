import React from 'react';
import GSale from '../../assets/GSale.png'
import img from '../../style/Navbar.css'

function Navbar(props) {
    const clickHandler = (event) => {
        const id = event.target.id;
        props.setPage(id);
    }
    return (
      <ul className="nav nav-pills nav-fill p-2 border border-success">
        <li className="nav-item p-2">
          {/* <a className="nav-link active" aria-current="page" href="#">
            Active
          </a> */}
          <img src={GSale} alt="gsale" />
        </li>
        <form className="d-flex flex-row form-inline my-2 my-lg-0 p-2">
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Location
          </button>
        </form>
        <li className="nav-item p-2">
          <a className="nav-link" href="#">
            Date
          </a>
        </li>
        <li className="nav-item p-2">
          <a className="nav-link disabled">Filter</a>
        </li>
        <form className="d-flex form-inline my-2 my-lg-0 p-2">
          <input
            className="form-control mr-sm-2 rounded-pill"
            type="search"
            placeholder="Location"
            aria-label="Search"
          />
          <button
            className={
              props.page === "search"
                ? "nav-link active"
                : "btn btn-outline-success my-2 my-sm-0 rounded-pill"
            }
            type="submit"
          >
            Search
          </button>
        </form>
        <form className="d-flex flex-row form-inline my-2 my-lg-0 p-2">
          <button
            className="btn btn-outline-success my-2 my-sm-0 rounded-pill"
            type="submit"
          >
            Create Event
          </button>
        </form>
        <form className="d-flex flex-row form-inline my-2 my-lg-0 p-2">
          <button
            className="btn btn-outline-success my-2 my-sm-0 rounded-pill"
            type="submit"
          >
            Login/Sign Up
          </button>
        </form>
      </ul>
    );
};

export default Navbar;