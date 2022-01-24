import React, { useState, useRef, useReducer } from "react";
import { TextField, Autocomplete } from "@mui/material";
//# EXPLANATION
// MENU 1 DEFAULT: No options selected
// MENU 2 DEFAULT: Disabled dummy version

// Changing the Menu 1 value (USA state) will change the cities listed in menu 2
// If a proper state is not selected in menu 1, menu 2 will revert to its dummy disabled state
// We're not actually re-disabling it.
// We render a new version that is disabled by default
// We then replace it with a legitimate one when a proper state is selected

function reducerFN(state, action) {
  if (action.type === "CHOOSE_STATE") {
    // if(state.counter===0){

    // }
    return {
      chosenState: action.payload.chosenState,
      cityList: yelpCities[action.payload.chosenState],
      counter: state.counter + 1,
      menu2Disabled: false,
    };
  }
  if (action.type === "DISABLE_MENU2") {
    return { ...state, menu2Disabled: true, cityList: yelpCities["Arizona"] };
  }
  return state;
}

export default function TestError() {
  const cityRef = useRef();
  const [selection, dispatchFN] = useReducer(reducerFN, {
    chosenState: undefined,
    cityList: yelpCities["Arizona"],
    counter: 0,
    menu2Disabled: true,
  });

  const changeStateHandler = function (event, inputValue) {
    // If we have a valid input, enable menu 1 and update its list items
    if (yelpStates.includes(inputValue)) {
      dispatchFN({
        type: "CHOOSE_STATE",
        payload: { chosenState: inputValue },
      });
    }
    // If we have an invalid input, disable menu 2
    else dispatchFN({ type: "DISABLE_MENU2" });
  };

  return (
    <>
      <Autocomplete
        onChange={changeStateHandler}
        disablePortal
        id="combo-box-demo"
        options={yelpStates}
        sx={{ maxWidth: 350, mx: "auto", mt: 2, mb: 1 }}
        renderInput={(params) => <TextField {...params} label="Select state" />}
      />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={selection.cityList}
        disabled={selection.menu2Disabled}
        sx={{ maxWidth: 350, mx: "auto", mt: 2, mb: 1 }}
        renderInput={(params) => (
          <TextField {...params} label="Select city" ref={cityRef} />
        )}
      />
    </>
  );
}

const yelpStates = [
  "Arizona",
  "California",
  "Colorado",
  "Connecticut",
  "Florida",
  "Georgia",
  "Hawaii",
  "Iowa",
  "Idaho",
  "Illinois",
  "Indiana",
  "Kentucky",
  "Louisiana",
  "Massachusetts",
  "Maryland",
  "Michigan",
  "Minnesota",
  "Missouri",
  "North Carolina",
  "New Jersey",
  "New Mexico",
  "Nevada",
  "New York",
  "Ohio",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "Tennessee",
  "Texas",
  "Utah",
  "Virginia",
  "Vermont",
  "Washington",
  "Wisconsin",
];
const yelpCities = {
  // prettier-ignore
  Arizona: ["Phoenix", "Scottsdale", "Tempe", "Tucson"],
  California: [
    "Alameda",
    "Albany",
    "Alhambra",
    "Anaheim",
    "Belmont",
    "Berkeley",
    "Beverly Hills",
    "Big Sur",
    "Burbank",
    "Concord",
    "Costa Mesa",
    "Culver City",
    "Cupertino",
    "Daly City",
    "Davis",
    "Dublin",
    "Emeryville",
    "Foster City",
    "Fremont",
    "Glendale",
    "Hayward",
    "Healdsburg",
    "Huntington Beach",
    "Irvine",
    "La Jolla",
    "Livermore",
    "Long Beach",
    "Los Altos",
    "Los Angeles",
    "Los Gatos",
    "Marina del Rey",
    "Menlo Park",
    "Mill Valley",
    "Millbrae",
    "Milpitas",
    "Monterey",
    "Mountain View",
    "Napa",
    "Newark",
    "Newport Beach",
    "Oakland",
    "Orange County",
    "Palo Alto",
    "Park La Brea",
    "Pasadena",
    "Pleasanton",
    "Redondo Beach",
    "Redwood City",
    "Sacramento",
    "San Bruno",
    "San Carlos",
    "San Diego",
    "San Francisco",
    "San Jose",
    "San Leandro",
    "San Mateo",
    "San Rafael",
    "Santa Barbara",
    "Santa Clara",
    "Santa Cruz",
    "Santa Monica",
    "Santa Rosa",
    "Sausalito",
    "Sonoma",
    "South Lake Tahoe",
    "Stockton",
    "Studio City",
    "Sunnyvale",
    "Torrance",
    "Union City",
    "Venice",
    "Walnut Creek",
    "West Hollywood",
    "West Los Angeles",
    "Westwood",
    "Yountville",
  ],
  Colorado: ["Boulder", "Denver"],
  Connecticut: ["Hartford", "New Haven"],
  Florida: [
    "Fort Lauderdale",
    "Gainesville",
    "Miami",
    "Miami Beach",
    "Orlando",
    "Tampa",
  ],
  Georgia: ["Atlanta", "Savannah"],
  Hawaii: ["Honolulu", "Lahaina"],
  Iowa: ["Iowa City"],
  Idaho: ["Boise"],
  Illinois: ["Chicago", "Evanston", "Naperville", "Schaumburg", "Skokie"],
  Indiana: ["Bloomington", "Indianapolis"],
  Kentucky: ["Louisville"],
  Louisiana: ["New Orleans"],
  //  prettier-ignore
  Massachusetts: [ 'Allston', 'Boston', 'Brighton', 'Brookline', 'Cambridge', 'Somerville',],
  Maryland: ["Baltimore"],
  Michigan: ["Ann Arbor", "Detroit"],
  Minnesota: ["Minneapolis", "Saint Paul"],
  Missouri: ["Kansas City", "Saint Louis"],
  "North Carolina": ["Charlotte", "Durham", "Raleigh"],
  "New Jersey": ["Newark", "Princeton"],
  "New Mexico": ["Albuquerque", "Santa Fe"],
  Nevada: ["Las Vegas", "Reno"],
  "New York": ["Brooklyn", "Long Island City", "New York", "Flushing"],
  Ohio: ["Cincinnati", "Cleveland", "Columbus"],
  Oregon: ["Portland", "Salem"],
  Pennsylvania: ["Philadelphia", "Pittsburgh"],
  "Rhode Island": ["Providence"],
  "South Carolina": ["Charleston"],
  Tennessee: ["Memphis", "Nashville"],
  Texas: ["Austin", "Dallas", "Houston", "San Antonio"],
  Utah: ["Salt Lake City"],
  Virginia: ["Alexandria", "Arlington", "Richmond"],
  Vermont: ["Burlington"],
  Washington: ["Bellevue", "Redmond", "Seattle"],
  Wisconsin: ["Madison", "Milwaukee"],
};
