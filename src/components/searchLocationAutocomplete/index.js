import React, { useState, useEffect, useRef } from 'react';

let autoComplete, geocoder;

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

  //   types: ['address'],
  //   componentRestrictions: {
  //     country: 'us'
  //   }

  autoComplete.setFields([
    'address_components',
    'formatted_address',
    'geometry',
  ]);
  autoComplete.addListener('place_changed', () =>
    handlePlaceSelect(updateQuery, updateGeoCoords)
  );
  geocoder = new window.google.maps.Geocoder();
}

async function handlePlaceSelect(updateQuery, updateGeoCoords) {
  const addressObject = autoComplete.getPlace();
  console.log('addressObject: ', addressObject);
  const query = addressObject.formatted_address;
  updateQuery(query);
  updateGeoCoords(
    geocode(addressObject.formatted_address.split(' ').join('+'))
  );
}

async function geocode(address) {
  return new Promise(function (resolve, reject) {
    geocoder.geocode({ address: address }, function (results, status) {
      if (status === 'OK') {
        console.log(
          results[0].geometry.location.lat(),
          results[0].geometry.location.lng()
        );
        console.log('RESULTS: ', results);
        resolve([
          results[0].geometry.location.lat(),
          results[0].geometry.location.lng(),
        ]);
      } else {
        console.log('err: ', status);
        reject(new Error("Couldnt't find the location " + address));
      }
    });
  });
}

function SearchLocationAutocomplete({ handleSearchLocationAutocomplete }) {
  const [query, setQuery] = useState('');
  const [geoCoords, setGeoCoords] = useState('');
  const autoCompleteRef = useRef(null);
  let count = 0;

  useEffect(() => {
    console.log('inside use effect');
    if (!count) {
      count++;
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places,visualization&v=weekly`,
        () => handleScriptLoad(setQuery, autoCompleteRef, setGeoCoords)
      );
    } else if (geoCoords) {
      console.log('ELSE');
      handleSearchLocationAutocomplete(query, geoCoords);
    }
  }, [geoCoords, handleSearchLocationAutocomplete]);

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

export default SearchLocationAutocomplete;
