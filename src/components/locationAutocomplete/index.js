import React, { useState, useEffect, useRef } from "react";
import { getGeocode } from '../../lib/util';

let autoComplete;

const loadScript = (url, callback) => {
    console.log("13232");
    let script = document.createElement("script");
    script.type = "text/javascript";

    if (script.readyState) {
        script.onreadystatechange = function () {
            if (script.readyState === "loaded" || script.readyState === "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {
        script.onload = () => callback();
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
};

function handleScriptLoad(updateQuery, autoCompleteRef) {
    console.log("1223");
    autoComplete = new window.google.maps.places.Autocomplete(
        autoCompleteRef.current,
        { types: ["(cities)"], componentRestrictions: { country: "us" } }
        // { types: ["address"], componentRestrictions: { country: "us" } }
    );
    console.log("1ewfewf");
    autoComplete.setFields(["address_components", "formatted_address"]);
    autoComplete.addListener("place_changed", () => handlePlaceSelect(updateQuery));
    console.log("1eewfewfewffefewwfewf");
}

async function handlePlaceSelect(updateQuery) {
    console.log("1");
    const addressObject = autoComplete.getPlace();
    const query = addressObject.formatted_address;
    updateQuery(query);
    console.log("1wed");
    getGeocode(addressObject.formatted_address.split(' ').join('+'))
}

// function geocode(location) {
//     fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.REACT_APP_GOOGLE_API_KEY}&v=weekly&libraries=places`)
//         .then(res => res.json())
//         .then(res => console.log("geocode res: ", res.results[0].geometry.location))
//         .catch(err => console.log("err: ", err))
// }

function LocationAutocomplete() {
    console.log("1ewfef");
    const [query, setQuery] = useState("");
    const autoCompleteRef = useRef(null);

    useEffect(() => {
        loadScript(`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&v=3.49&libraries=places`, () => handleScriptLoad(setQuery, autoCompleteRef));
    }, []);

    return (
        <div className="search-location-input">
            <input style={{ height: "100%"}} id="locationInput" type="text" placeholder="Location city" name="location" ref={autoCompleteRef} onChange={e => setQuery(e.target.value)} value={query} />
        </div>
    );
}

export default LocationAutocomplete;

// https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.REACT_APP_GOOGLE_API_KEY}
// https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&v=weekly&libraries=places