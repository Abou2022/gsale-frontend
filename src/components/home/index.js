import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { garageSaleEventsFetchRequest } from '../../actions/garageSaleEvent-actions';
import { logError } from '../../lib/util';
import MapLeaflet from '../mapLeaflet';

function Home(props) {
  let garageSaleEventsFetchedFlag = false;

  useEffect(() => {
    if (!garageSaleEventsFetchedFlag) {
      garageSaleEventsFetchedFlag = true;
      props.garageSaleEventsFetch().catch(err => logError(err));
    }
  }, []);

  return (
    <div>
      <MapLeaflet coords={props.garageSaleEvent} />;
    </div>
  );
}

const mapStateToProps = state => ({
  garageSaleEvent: state.garageSaleEvent,
});

const mapDispatchToProps = dispatch => ({
  garageSaleEventsFetch: () => dispatch(garageSaleEventsFetchRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
