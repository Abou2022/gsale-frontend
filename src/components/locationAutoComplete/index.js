import React, { useState, useEffect, useRef } from 'react';

let autoComplete;

function handleLoad(
  updateQuery,
  autoCompleteRef,
  updateGeoCoords,
  autoCompleteTypeAddress
) {
  const type = autoCompleteTypeAddress ? 'address' : '(cities)';
  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    { types: [type], componentRestrictions: { country: 'us' } }
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

function LocationAutocomplete({
  handleLocationAutocomplete,
  address,
  autoCompleteTypeAddress,
}) {
  const [query, setQuery] = useState(address);
  const [geoCoords, setGeoCoords] = useState('');
  const autoCompleteRef = useRef(null);
  let handleLoadFlag = false;

  useEffect(() => {
    if (!handleLoadFlag) {
      handleLoadFlag = true;
      if (!window.google || !window.google.maps || !window.google.maps.places) {
        setTimeout(function () {
          handleLoad(
            setQuery,
            autoCompleteRef,
            setGeoCoords,
            autoCompleteTypeAddress
          );
        }, 3000);
      } else {
        handleLoad(
          setQuery,
          autoCompleteRef,
          setGeoCoords,
          autoCompleteTypeAddress
        );
      }
    }
    setQuery(address);
  }, [address]);

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
