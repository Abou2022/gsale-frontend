import React, { useState } from 'react';
import profilePic from '../../assets/GSale.png';
import './createEvent.css';

function CreateEvent() {
  const [editEventName, setEditEventName] = useState(false);
  const eventNameHandler = () => {
    if (editEventName) {
      setEditEventName(false);
    } else {
      setEditEventName(true);
    }
  };
  const [editStartTime, setEditStartTime] = useState(false);
  const startTimeHandler = () => {
    if (editStartTime) {
      setEditStartTime(false);
    } else {
      setEditStartTime(true);
    }
  };
  const [editEndTime, setEditEndTime] = useState(false);
  const endTimeHandler = () => {
    if (editEndTime) {
      setEditEndTime(false);
    } else {
      setEditEndTime(true);
    }
  };
  const [editStartDate, setEditStartDate] = useState(false);
  const startDateHandler = () => {
    if (editStartDate) {
      setEditStartDate(false);
    } else {
      setEditStartDate(true);
    }
  };
  const [editEndDate, setEditEndDate] = useState(false);
  const endDateHandler = () => {
    if (editEndDate) {
      setEditEndDate(false);
    } else {
      setEditEndDate(true);
    }
  };
  const [editLocation, setEditLocation] = useState(false);
  const locationHandler = () => {
    if (editLocation) {
      setEditLocation(false);
    } else {
      setEditLocation(true);
    }
  };
  const [editDescription, setEditDescription] = useState(false);
  const descriptionHandler = () => {
    if (editDescription) {
      setEditDescription(false);
    } else {
      setEditDescription(true);
    }
  };

  const tempObject = {
    eventName: 'Garage Sale',
    startTime: '10 AM',
    endTime: '05 PM',
    startDate: '6/17/2022',
    endDate: '6/19/2022',
    location: '98125',
    description: "we're moving",
  };
  const [tempData, setTempData] = useState(tempObject);
  const eventInfoOnChange = e => {
    setTempData({ ...tempData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container create__container">
      <h1 className="my-4 py-2">Create Event</h1>
      <div className="row create__container-1">
        <div className="col-md-7 create__container-content">
          <div className="d-flex justify-content-between">
            <div className="">
              <p className="mb-0 text-muted mb-1">Event Name</p>
              <p className="mb-2">
                {editEventName ? (
                  <input
                    type="text"
                    name="eventName"
                    value={tempData.eventName}
                    onChange={eventInfoOnChange}
                  />
                ) : (
                  tempData.eventName
                )}
              </p>
            </div>
            <button onClick={eventNameHandler} className="btn my-2 my-sm-0">
              <u className="text-success">{editEventName ? 'Save' : 'Edit'}</u>
            </button>
          </div>

          <div className="d-flex justify-content-between">
            <div>
              <p className="text-muted mt-3 mb-1">Start Time</p>
              <p className="mb-2">
                {editStartTime ? (
                  <input
                    type="string"
                    name="startTime"
                    value={tempData.startTime}
                    onChange={eventInfoOnChange}
                  />
                ) : (
                  tempData.startTime
                )}
              </p>
            </div>
            <button onClick={startTimeHandler} className="btn my-2 my-sm-0">
              <u className="text-success">{editStartTime ? 'Save' : 'Edit'}</u>
            </button>
          </div>

          <div className="d-flex justify-content-between">
            <div>
              <p className="text-muted mt-3 mb-1">End Time</p>
              <p className="mb-2">
                {editEndTime ? (
                  <input
                    type="string"
                    name="endTime"
                    value={tempData.endTime}
                    onChange={eventInfoOnChange}
                  />
                ) : (
                  tempData.endTime
                )}
              </p>
            </div>
            <button onClick={endTimeHandler} className="btn my-2 my-sm-0">
              <u className="text-success">{editEndTime ? 'Save' : 'Edit'}</u>
            </button>
          </div>

          <div className="d-flex justify-content-between">
            <div>
              <p className="text-muted mt-3 mb-1">Start Date</p>
              <p className="mb-2">
                {editStartDate ? (
                  <input
                    type="string"
                    name="startDate"
                    value={tempData.startDate}
                    onChange={eventInfoOnChange}
                  />
                ) : (
                  tempData.startDate
                )}
              </p>
            </div>
            <button onClick={startDateHandler} className="btn my-2 my-sm-0">
              <u className="text-success">{editStartDate ? 'Save' : 'Edit'}</u>
            </button>
          </div>

          <div className="d-flex justify-content-between">
            <div>
              <p className="text-muted mt-3 mb-1">End Date</p>
              <p className="mb-2">
                {editEndDate ? (
                  <input
                    type="string"
                    name="endDate"
                    value={tempData.endDate}
                    onChange={eventInfoOnChange}
                  />
                ) : (
                  tempData.endDate
                )}
              </p>
            </div>
            <button onClick={endDateHandler} className="btn my-2 my-sm-0">
              <u className="text-success">{editEndDate ? 'Save' : 'Edit'}</u>
            </button>
          </div>

          <div className="d-flex justify-content-between">
            <div>
              <p className="text-muted mt-3 mb-1">Location</p>
              <p className="mb-2">
                {editLocation ? (
                  <input
                    type="string"
                    name="location"
                    value={tempData.location}
                    onChange={eventInfoOnChange}
                  />
                ) : (
                  tempData.location
                )}
              </p>
            </div>
            <button onClick={locationHandler} className="btn my-2 my-sm-0">
              <u className="text-success">{editLocation ? 'Save' : 'Edit'}</u>
            </button>
          </div>

          <div className="d-flex justify-content-between">
            <div>
              <p className="text-muted mt-3 mb-1">Description</p>
              <p className="mb-2">
                {editDescription ? (
                  <input
                    type="string"
                    name="description"
                    value={tempData.description}
                    onChange={eventInfoOnChange}
                  />
                ) : (
                  tempData.description
                )}
              </p>
            </div>
            <button onClick={descriptionHandler} className="btn my-2 my-sm-0">
              <u className="text-success">
                {editDescription ? 'Save' : 'Edit'}
              </u>
            </button>
          </div>
        </div>
        <div className="col-md-5 create__image">
          <img src={profilePic} alt="pic" />
        </div>
      </div>
    </div>
  );
}

export default CreateEvent;
