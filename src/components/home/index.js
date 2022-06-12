import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { garageSaleEventsFilterRequest } from '../../actions/garageSaleEvent-actions';
import { logError, userValidation } from '../../lib/util';
import { userLocationSet } from '../../actions/userLocation-actions';
import { tokenSignInRequest } from '../../actions/userAuth-actions';
import MapLeaflet from '../mapLeaflet';

function Home(props) {
  let garageSaleEventsFetchedFlag = false;
  let navigate = useNavigate();
  useEffect(() => {
    userValidation(props, navigate, false);
    if (!garageSaleEventsFetchedFlag) {
      garageSaleEventsFetchedFlag = true;
      handleUserLocation();
    }
  }, []);

  const handleUserLocation = () => {
    if (!props.userLocation) {
      props
        .garageSaleEventsFilter(props.searchCriteria)
        .catch(err => logError(err));
      const token = JSON.parse(localStorage.getItem('gSaleUserLocation'));
      if (token) {
        props.userLocationSetRequest(token);
      } else {
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            function (position) {
              localStorage.setItem(
                'gSaleUserLocation',
                JSON.stringify({
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                })
              );
              props.userLocationSetRequest({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
            },
            function (err) {
              console.error('Error Code = ' + err.code + ' - ' + err.message);
            }
          );
        } else {
          console.log('no navigator in location');
        }
      }
    } else {
      const filterObject = {
        startDate: props.searchCriteria.startDate,
        endDate: props.searchCriteria.endDate,
        lat: props.userLocation.lat,
        lng: props.userLocation.lng,
        categories: props.searchCriteria.categories,
      };
      props.garageSaleEventsFilter(filterObject).catch(err => logError(err));
    }
  };

  return (
    <div>
      <MapLeaflet coords={props.garageSaleEvent} />;
    </div>
  );
}

const mapStateToProps = state => ({
  userAuth: state.userAuth,
  garageSaleEvent: state.garageSaleEvent,
  userLocation: state.userLocation,
  searchCriteria: state.searchCriteria,
});

const mapDispatchToProps = dispatch => ({
  garageSaleEventsFilter: filterObject =>
    dispatch(garageSaleEventsFilterRequest(filterObject)),
  userLocationSetRequest: userLocation =>
    dispatch(userLocationSet(userLocation)),
  tokenSignIn: token => dispatch(tokenSignInRequest(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home); // (, null)(GarageSaleEvent)
