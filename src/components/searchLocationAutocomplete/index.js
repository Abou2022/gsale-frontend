import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { appendScript } from '../../actions/appendedScript-actions.js';

let autoComplete;

const loadScript = (url, callback) => {
  let script = document.createElement('script');
  script.type = 'text/javascript';

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === 'loaded' || script.readyState === 'complete') {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }
  script.src = url;
  document.getElementsByTagName('head')[0].appendChild(script);
};

function handleScriptLoad(updateQuery, autoCompleteRef, updateGeoCoords) {
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

function SearchLocationAutocomplete({
  handleSearchLocationAutocomplete,
  appendedScript,
  appendScriptRequest,
}) {
  const [query, setQuery] = useState('');
  const [geoCoords, setGeoCoords] = useState('');
  const autoCompleteRef = useRef(null);
  let appendedScriptFlag = false;

  useEffect(() => {
    if (!appendedScript && !appendedScriptFlag) {
      appendedScriptFlag = true;
      appendScriptRequest();
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places,visualization`,
        () => handleScriptLoad(setQuery, autoCompleteRef, setGeoCoords)
      );
    }
  }, []);

  useEffect(() => {
    if (geoCoords && geoCoords.length) {
      handleSearchLocationAutocomplete(query, geoCoords);
    }
  }, [geoCoords]);

  return (
    <div className="search-location-input">
      <input
        id="locationInput"
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

const mapStateToProps = state => ({ appendedScript: state.appendedScript });
const mapDispatchToProps = dispatch => ({
  appendScriptRequest: () => dispatch(appendScript()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchLocationAutocomplete);
