import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { currentGarageSaleEventFetchRequest } from '../../actions/currentGarageSaleEvent-actions';
import MapLeaflet from '../mapLeaflet';
import { renderIf } from '../../lib/util';

function GarageSaleEvent(props) {
  const { garageSaleEventId } = useParams();
  const [garageSaleEvent, setGarageSaleEvent] = useState({});
  let flag = 0;
  useEffect(() => {
    if (!flag) {
      flag++;
      props
        .currentGarageSaleEventFetch(garageSaleEventId)
        .then(gse => {
          setGarageSaleEvent(gse);
          console.log('gse: ', gse);
        })
        .catch(err => console.log('garageSaleEventFetch err: ', err));
    }
  }, [props.currentGarageSaleEventFetch, garageSaleEventId]);

  return (
    <div className="row justify-content-around">
      {renderIf(
        garageSaleEvent && garageSaleEvent.eventName,
        <div className="card text-center">
          <div className="card-header">Details</div>
          <div className="card-body">
            <h5 className="card-title text-muted">
              {garageSaleEvent.eventName}
              {garageSaleEvent.endTime}
            </h5>
            <p className="card-text">
              Just about everything must go! Electronics, Furniture,
              Kitchenware, Games, Sports Equipments, Bathroom Supplies, Clothes,
              and anything else that belongs in house that you can think of!
            </p>
            <h5 className="card-title text-muted">Address</h5>
            <p className="card-text">1234 Main St Seattle, WA 98125</p>
            <h5 className="card-title text-muted">Date</h5>
            <p className="card-text">06/13/2022</p>
            <h5 className="card-title text-muted">Time</h5>
            <p className="card-text">9AM - 6PM</p>
            <h5 className="card-title text-muted">Categories</h5>
            <p className="card-text">
              Kitchenware, Furniture, CLothing, Electronics, Games, Sports, Pet,
              Bath, Baby
            </p>
          </div>
          <div className="card-footer text-muted">Map</div>
        </div>
      )}

      <div>
        <MapLeaflet coords={[{ lat: 47.609974, lng: -122.325264 }]} />;
      </div>
    </div>
  );
}
const mapStateToProps = state => ({
  currentGarageSaleEvent: state.currentGarageSaleEvent,
});

const mapDispatchToProps = dispatch => ({
  currentGarageSaleEventFetch: garageSaleEventID =>
    dispatch(currentGarageSaleEventFetchRequest(garageSaleEventID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GarageSaleEvent);
