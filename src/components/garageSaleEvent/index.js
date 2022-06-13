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
            </h5>
            <p className="card-text">{garageSaleEvent.description}</p>
            <h5 className="card-title text-muted">Address</h5>
            <p className="card-text">{garageSaleEvent.address}</p>
            <h5 className="card-title text-muted">Date</h5>
            <p className="card-text">
              {garageSaleEvent.startDate} - {garageSaleEvent.endDate}
            </p>
            <h5 className="card-title text-muted">Time</h5>
            <p className="card-text">
              {garageSaleEvent.startTime} - {garageSaleEvent.endTime}
            </p>
            {/* <h5 className="card-title text-muted">Categories</h5>
            <p className="card-text">
              Kitchenware, Furniture, CLothing, Electronics, Games, Sports, Pet,
              Bath, Baby
            </p> */}
          </div>
          <div className="card-footer text-muted">Map</div>
        </div>
      )}

      <div>
        <MapLeaflet
          isDetailPage
          coords={[{ lat: garageSaleEvent.lat, lng: garageSaleEvent.lng }]}
        />
        ;
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
