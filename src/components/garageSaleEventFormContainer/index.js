import React, { useEffect, useState } from 'react';
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
  const [garageSaleEvent, setGarageSaleEvent] = useState(null);
  let navigate = useNavigate();
  let flag = 0;
  useEffect(() => {
    if (!flag) {
      flag++;
      userValidation(props, navigate);
      if (garageSaleEventId) {
        props
          .currentGarageSaleEventFetch(garageSaleEventId)
          .then(gse => {
            setGarageSaleEvent(gse);
            console.log('gse: ', gse);
          })
          .catch(err => console.log('currentGarageSaleEventFetch err: ', err));
      }
    }
  }, []);
  const handleOnComplete = data => {
    console.log('gse form container: ', data);
    // if (garageSaleEventId) {
    //   data.id = garageSaleEventId;
    //   return props.currentGarageSaleEventUpdate(data).catch(logError);
    // } else {
    return props
      .currentGarageSaleEventCreate(data)
      .then(gse => navigate(`/garagesale/${gse.id}`))
      .catch(logError);
    // }
  };
  //   let gseData = garageSaleEventId ? garageSaleEvent : null;
  return (
    <div>
      <GarageSaleEventForm
        onComplete={handleOnComplete}
        gse={garageSaleEvent}
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
  tokenSignIn: () => dispatch(tokenSignInRequest()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GarageSaleEventFormContainer);
