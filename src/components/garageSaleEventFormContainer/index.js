import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import GarageSaleEventForm from '../garageSaleEvent-form';
import {
  currentGarageSaleEventCreateRequest,
  currentGarageSaleEventUpdateRequest,
  currentGarageSaleEventFetchRequest,
} from '../../actions/currentGarageSaleEvent-actions';
import { tokenSignInRequest } from '../../actions/userAuth-actions';
import { logError, userValidation } from '../../lib/util.js';

function GarageSaleEventFormContainer(props) {
  const { garageSaleEventId } = useParams();
  let navigate = useNavigate();
  useEffect(() => {
    userValidation(props, navigate);
    if (garageSaleEventId) {
        props.currentGarageSaleEventFetch(garageSaleEventId)
            .catch(err => console.log("currentGarageSaleEventFetch err: ", err));
    }
  }, []);
  const handleOnComplete = data => {
    console.log("gse form container: ", data);
    if (garageSaleEventId) {
        return props.currentGarageSaleEventUpdate(data).catch(logError);
    } else {
        return props.currentGarageSaleEventCreate(data).catch(logError);
    }
  };
  let gseData = garageSaleEventId ? props.currentGarageSaleEvent : null; 
  return (
    <div>
    <GarageSaleEventForm
        onComplete={handleOnComplete}
        gse={gseData}
    />
    </div>
  );
}

const mapStateToProps = state => ({
  userAuth: state.userAuth,
  userProfile: state.userProfile,
  currentGarageSaleEvent: state.currentGarageSaleEvent,
});

const mapDispatchToProps = dispatch => ({
  currentGarageSaleEventCreate: garageSaleEvent =>
    dispatch(currentGarageSaleEventCreateRequest(garageSaleEvent)),
  currentGarageSaleEventUpdate: garageSaleEvent =>
    dispatch(currentGarageSaleEventUpdateRequest(garageSaleEvent)),
  currentGarageSaleEventFetch: garageSaleEventId =>
    dispatch(currentGarageSaleEventFetchRequest(garageSaleEventId)),
  tokenSignIn: token => dispatch(tokenSignInRequest(token)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GarageSaleEventFormContainer);
