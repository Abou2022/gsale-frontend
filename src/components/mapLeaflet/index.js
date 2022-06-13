import React, { useEffect, useRef } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  Popup,
  useMapEvent,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const icon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png',
});

const group = L.featureGroup();

function Bounds({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (!map) {
      return;
    }
    group.clearLayers();
    if (coords && coords.length) {
      coords.forEach(marker =>
        group.addLayer(L.marker([marker.lat, marker.lng]))
      );
      map.fitBounds(group.getBounds());
    }
  }, [map, coords]);

  return null;
}

function SetViewOnClick({ animateRef }) {
  const map = useMapEvent('click', e => {
    map.setView(e.latlng, map.getZoom(), {
      animate: animateRef.current || false,
    });
  });

  return null;
}

// coords={[{ lat: 47.609974, lng: -122.325264 }]}
export default function MapLeaflet({ coords, isDetailPage }) {
  const animateRef = useRef(false);
  return (
    <MapContainer zoom={13} style={{ height: '90vh' }}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {coords.length > 0 &&
        coords.map(({ lat, lng, address, description, id }, index) => {
          const myLink = `/garagesale/${id}`;
          return (
            <Marker key={index} position={[lat, lng]} icon={icon}>
              {!isDetailPage && (
                <Popup>
                  {address} <br /> {description}
                  <a href={myLink}>View Details</a>
                </Popup>
              )}
            </Marker>
          );
        })}
      <Bounds coords={coords} />
      <SetViewOnClick animateRef={animateRef} />
    </MapContainer>
  );
}
