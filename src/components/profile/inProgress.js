import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import profilePic from '../../assets/GSale.png';

import { userProfileUpdateRequest } from '../../actions/userProfile-actions.js';

// fetch profile data
// update state of value to profile data
// input values are equal to state
// when input value changes state updates
// on submit call userProfileUpdateRequest
function Profile(props) {
  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhoneNumber, setEditPhoneNumber] = useState('');
  const [editImageURL, setEditImageURL] = useState('');

  useEffect(() => {
    setEditFirstName(props.userProfile.firstName);
    setEditLastName(props.userProfile.lastName);
    setEditEmail(props.userProfile.email);
    setEditPhoneNumber(props.userProfile.phoneNumber);
    setEditImageURL(props.userProfile.imageURL);
  }, [null]);

  const firstNameHandler = () => {
    if (editFirstName) {
      setEditFirstName(false);
    } else {
      setEditFirstName(true);
    }
  };

  // const tempObject = {
  //     firstName: "Andrew",
  //     lastName: "Ryu",
  //     email: "email@email.com",
  //     phoneNumber: "123-456-7899",
  // };
  // const [tempData, setTempData] = useState(tempObject);
  // const firstNameOnChange = (e) => {
  //     setTempData({ ...tempData, [e.target.name]: e.target.value });
  // };
  const handleChange = e => {
    let { name, value } = e.target;

    if (name === 'email') {
      setEditEmail(value);
    } else if (name === 'firstName') {
      setEditFirstName(value);
    } else if (name === 'lastName') {
      setEditLastName(value);
    } else if (name === 'phoneNumber') {
      setEditPhoneNumber(value);
    } else if (name === 'imageURL') {
      setEditImageURL(value);
    }
    // else if (name === "firstName") {

    // }
  };

  return (
    <div className="container">
      <h2 className="my-4 py-2">Profile</h2>
      <div className="row">
        <div className="col-md-7">
          <div className="d-flex justify-content-between">
            <div className="">
              <p className="mb-0">First Name</p>
              <p className="text-muted mb-0">
                <input
                  type="text"
                  name="firstName"
                  value={editFirstName}
                  onChange={handleChange}
                />
                {/* how to access data */}
                {/* props.userProfile.firstName */}
              </p>
            </div>
            <button onClick={firstNameHandler} className="btn my-2 my-sm-0">
              <u>{editFirstName ? 'Save' : 'Edit'}</u>
            </button>
          </div>
          <div className="d-flex justify-content-between">
            <div>
              <p className="mt-3 mb-0">Last Name</p>
              <p className="text-muted mb-0">Ryu</p>
            </div>
            <button className="btn my-2 my-sm-0">
              <u>Edit</u>
            </button>
          </div>
          <div className="d-flex justify-content-between">
            <div>
              <p className="mt-3 mb-0">Email</p>
              <p className="text-muted mb-0">email@email.com</p>
            </div>
            <button className="btn my-2 my-sm-0">
              <u>Edit</u>
            </button>
          </div>
          <div className="d-flex justify-content-between">
            <div>
              <p className="mt-3 mb-0">Phone Number</p>
              <p className="text-muted mb-0">123-456-7890</p>
            </div>
            <button className="btn my-2 my-sm-0">
              <u>Edit</u>
            </button>
          </div>
          <div>
            <p className="mt-3 mb-1">Categories</p>
            <div className="row">
              <div className="">
                <div className="form-check form-check-inline col-md-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="kitchenware"
                    defaultValue="kitchenware"
                  />
                  <label className="form-check-label" htmlFor="kitchenware">
                    Kitchenware
                  </label>
                </div>
                <div className="form-check form-check-inline col-md-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="furniture"
                    defaultValue="furniture"
                  />
                  <label className="form-check-label" htmlFor="furniture">
                    Furniture
                  </label>
                </div>
                <div className="form-check form-check-inline col-md-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="clothing"
                    defaultValue="clothing"
                  />
                  <label className="form-check-label" htmlFor="clothing">
                    Clothing
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="">
                <div className="form-check form-check-inline col-md-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="electronic"
                    defaultValue="electronic"
                  />
                  <label className="form-check-label" htmlFor="electronic">
                    Electronic
                  </label>
                </div>
                <div className="form-check form-check-inline col-md-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="game"
                    defaultValue="game"
                  />
                  <label className="form-check-label" htmlFor="game">
                    Game
                  </label>
                </div>
                <div className="form-check form-check-inline col-md-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="sportsEquipment"
                    defaultValue="sportsEquipment"
                  />
                  <label className="form-check-label" htmlFor="sportsEquipment">
                    Sports Equipment
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-5">
          <img src={profilePic} alt="pic" />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  userAuth: state.userAuth,
  userProfile: state.userProfile,
  attendees: state.attendess,
  comments: state.comments,
  garageSaleEvent: state.garageSaleEvent,
  vendors: state.vendors,
});

let mapDispatchToProps = dispatch => {
  return {
    userProfileUpdate: user => dispatch(userProfileUpdateRequest(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
