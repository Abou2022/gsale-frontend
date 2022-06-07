import React, { Component } from 'react';
import { connect } from 'react-redux';
import Leaflet from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './map.css';

Leaflet.Icon.Default.imagePath = '../node_modules/leaflet';

delete Leaflet.Icon.Default.prototype._getIconUrl;

Leaflet.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

// import {  } from '../../actions/userAuth-actions.js';

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        // this.handleStatusChange = this.handleStatusChange.bind(this);
    }

    componentDidMount() {
        console.log(this.props.userAuth);
    };

    componentDidUpdate(prevProps, prevState) {
        // if (prevState.count !== this.state.count) {
        //     document.title = `You clicked ${this.state.count} times`;
        // }
    }

    componentWillUnmount() {

    };

    render() {
        return (
            <div id="map">
                <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[51.505, -0.09]}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    userAuth: state.userAuth,
    userProfile: state.userProfile,
    attendees: state.attendess,
    comments: state.comments,
    garageSaleEvent: state.garageSaleEvent,
    vendors: state.vendors
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Map);