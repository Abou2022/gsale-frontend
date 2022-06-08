import React, { Component } from 'react';
import { connect } from 'react-redux';
import { vendorsFetchRequest } from '../../actions/vendors-actions';
import { logError } from '../../lib/util';
import MapLeaflet from '../mapLeaflet';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.vendorsFetch().catch(err => logError(err));
  }

  // eslint-disable-next-line
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.vendors !== this.props.vendors;
  }
  render() {
    return <MapLeaflet coords={this.props.vendors} />;
  }
}

const mapStateToProps = state => ({
  vendors: state.vendors,
});

const mapDispatchToProps = dispatch => {
  return {
    vendorsFetch: () => dispatch(vendorsFetchRequest()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);

// componentDidMount() {
//     if ("geolocation" in navigator) {
//         navigator.geolocation.getCurrentPosition(
//             function (position) {
//                 getZipsArray(position.coords.latitude, position.coords.longitude);
//                 console.log("position: ", position);
//                 console.log("Latitude is :", position.coords.latitude);
//                 console.log("Longitude is :", position.coords.longitude);
//             },
//             function (error) {
//                 console.error("Error Code = " + error.code + " - " + error.message);
//             }
//         );
//     } else {
//         console.log("no navigator in location");
//     }
// }
