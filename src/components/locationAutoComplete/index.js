import React, { useState, useEffect, useRef } from 'react';

let autoComplete;

function handleLoad(updateQuery, autoCompleteRef, updateGeoCoords) {
  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    { types: ['(cities)'], componentRestrictions: { country: 'us' } }
    // { types: ["address"], componentRestrictions: { country: "us" } }
  );

  autoComplete.setFields([
    'address_components',
    'formatted_address',
    'geometry',
  ]);
  autoComplete.addListener('place_changed', () =>
    handlePlaceSelect(updateQuery, updateGeoCoords)
  );
}

async function handlePlaceSelect(updateQuery, updateGeoCoords) {
  const addressObject = autoComplete.getPlace();
  const query = addressObject.formatted_address;
  updateQuery(query);
  updateGeoCoords([
    addressObject.geometry.location.lat(),
    addressObject.geometry.location.lng(),
  ]);
}

function LocationAutocomplete({ handleLocationAutocomplete, address }) {
  const [query, setQuery] = useState(address);
  const [geoCoords, setGeoCoords] = useState('');
  const autoCompleteRef = useRef(null);
  let handleLoadFlag = false;

  useEffect(() => {
    if (!handleLoadFlag) {
      handleLoadFlag = true;
      handleLoad(setQuery, autoCompleteRef, setGeoCoords);
    }
  }, []);

  useEffect(() => {
    if (geoCoords && geoCoords.length) {
      handleLocationAutocomplete(query, geoCoords);
    }
  }, [geoCoords]);

  return (
    <div className="search-location-input">
      <input
        type="text"
        name="location"
        ref={autoCompleteRef}
        onChange={e => setQuery(e.target.value)}
        placeholder="Enter a City"
        value={query}
        style={{ height: '100%' }}
      />
    </div>
  );
}

export default LocationAutocomplete;
