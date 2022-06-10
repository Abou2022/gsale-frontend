import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { garageSaleEventFetchRequest } from '../../actions/garageSaleEvent-actions';
import MapLeaflet from '../mapLeaflet';
import { renderIf } from '../../lib/util';

function GarageSaleEvent({ garageSaleEvent, garageSaleEventFetch }) {
  const { garageSaleEventId } = useParams();
  let flag = 0;
  useEffect(() => {
    if (!flag) {
      flag++;
      garageSaleEventFetch(garageSaleEventId)
        .then(gse => console.log('gse: ', gse))
        .catch(err => console.log('garageSaleEventFetch err: ', err));
    }
    // console.log("garageSaleEventId: ", garageSaleEventId);
  }, [garageSaleEventFetch, garageSaleEventId]);

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
  garageSaleEvent: state.garageSaleEvent,
});

const mapDispatchToProps = dispatch => ({
  garageSaleEventFetch: garageSaleEventID =>
    dispatch(garageSaleEventFetchRequest(garageSaleEventID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GarageSaleEvent);
