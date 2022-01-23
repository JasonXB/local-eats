import React, { useState } from "react";
import { TextField, Autocomplete } from "@mui/material";
//# EXPLANATION
// MENU 1 DEFAULT: No options selected
// MENU 2 DEFAULT: Disabled dummy version

// Changing the Menu 1 value (USA state) will change the cities listed in menu 2
// If a proper state is not selected in menu 1, menu 2 will revert to its dummy disabled state
// We're not actually re-disabling it.
// We render a new version that is disabled by default
// We then replace it with a legitimate one when a proper state is selected

export default function testError() {
  const [selectedState, setSelectedState] = useState("");
  const [cityList, setCityList] = useState(
    <Autocomplete
      disablePortal
      disabled
      id="combo-box-demo"
      options={yelpCoverageCities.Arizona}
      sx={{ maxWidth: 350, mx: "auto", mt: 2, mb: 1 }}
      renderInput={(params) => (
        <TextField {...params} label="Select state first" />
      )}
    />
  );

  const handler = function (event, value) {
    console.log(value);
    setSelectedState(value);
    // If a proper state is selected, render a menu with all the state's associated cities
    if (yelpCoverageStates.includes(value)) {
      setCityList(
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={yelpCoverageCities[value]}
          sx={{ maxWidth: 350, mx: "auto", mt: 2, mb: 1 }}
          renderInput={(params) => (
            <TextField {...params} label="Select city" />
          )}
        />
      );
    }
    // Render a disabled menu whenever a proper state isn't selected
    else
      setCityList(
        <Autocomplete
          disablePortal
          disabled
          id="combo-box-demo"
          options={yelpCoverageCities.Arizona}
          sx={{ maxWidth: 350, mx: "auto", mt: 2, mb: 1 }}
          renderInput={(params) => (
            <TextField {...params} label="Select state first" />
          )}
        />
      );
  };

  return (
    <>
      <Autocomplete
        onChange={handler}
        disablePortal
        id="combo-box-demo"
        options={yelpCoverageStates}
        sx={{ maxWidth: 350, mx: "auto", mt: 2, mb: 1 }}
        renderInput={(params) => <TextField {...params} label="Select state" />}
      />
      {cityList}
    </>
  );
}

const yelpCoverageStates = [
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
const yelpCoverageCities = {
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
