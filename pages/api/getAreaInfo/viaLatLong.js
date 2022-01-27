const axios = require("axios");

export default async function handler(req, res) {
  // Gather required data for your request to the Mapqiuest API
  const lat = req.body.latitude;
  const long = req.body.longitude;
  const requestURL = `http://www.mapquestapi.com/geocoding/v1/reverse?key=${process.env.MAPQUEST_API_KEY}&location=${lat},${long}`;
  const requestData = await fetchLocationData(lat, long, requestURL);
  if (requestData !== null)
    res.status(200).json({ message: "Data fetched successfully", requestData });
  else res.status(402).json({ message: "MapquestAPI error" });
}

async function fetchLocationData(latitude, longitude, requestURL) {
  try {
    // Request data from mapquest then organize the response data
    const response = await axios.get(requestURL); // autoparsed to JS
    // Organize request data
    const countryCode = response.data.results[0].locations[0].adminArea1;
    const stateProvinceCode = response.data.results[0].locations[0].adminArea3; // prettier-ignore
    const city = response.data.results[0].locations[0].adminArea5;
    if (countryCode == "US") {
      return {
        country: "United States",
        stateProvinceCode,
        city,
        locationString: `${city}, ${stateProvinceCode}`,
        apiString: `${city}, ${getFullStateName(stateProvinceCode)}, USA`,
        latitude,
        longitude,
      };
    }
    if (countryCode == "CA") {
      return {
        country: "Canada",
        stateProvinceCode,
        city,
        locationString: `${city}, ${stateProvinceCode}`,
        apiString: `${city}, ${getFullProvinceName(stateProvinceCode)}, Canada`,
        latitude,
        longitude,
      };
    }
    return undefined;
  } catch (error) {
    // Axios will auto-throw an error if the request gets rejected or returns an error code
    return null;
  }
}

function getFullProvinceName(abbrev) {
  const conversion = {
    NL: "Newfoundland and Labrador",
    PE: "Prince Edward Island",
    NS: "Nova Scotia",
    NB: "New Brunswick",
    QC: "Quebec",
    ON: "Ontario",
    MB: "Manitoba",
    SK: "Saskatchewan",
    AB: "Alberta",
    BC: "British Columbia",
    YT: "Yukon",
    NT: "Northwest Territories",
    NU: "Nunavut",
  };
  return conversion[abbrev];
}

function getFullStateName(abbrev) {
  const conversion = {
    AL: "Alabama",
    AK: "Alaska",
    AS: "American Samoa",
    AZ: "Arizona",
    AR: "Arkansas",
    CA: "California",
    CO: "Colorado",
    CT: "Connecticut",
    DE: "Delaware",
    DC: "District Of Columbia",
    FM: "Federated States Of Micronesia",
    FL: "Florida",
    GA: "Georgia",
    GU: "Guam",
    HI: "Hawaii",
    ID: "Idaho",
    IL: "Illinois",
    IN: "Indiana",
    IA: "Iowa",
    KS: "Kansas",
    KY: "Kentucky",
    LA: "Louisiana",
    ME: "Maine",
    MH: "Marshall Islands",
    MD: "Maryland",
    MA: "Massachusetts",
    MI: "Michigan",
    MN: "Minnesota",
    MS: "Mississippi",
    MO: "Missouri",
    MT: "Montana",
    NE: "Nebraska",
    NV: "Nevada",
    NH: "New Hampshire",
    NJ: "New Jersey",
    NM: "New Mexico",
    NY: "New York",
    NC: "North Carolina",
    ND: "North Dakota",
    MP: "Northern Mariana Islands",
    OH: "Ohio",
    OK: "Oklahoma",
    OR: "Oregon",
    PW: "Palau",
    PA: "Pennsylvania",
    PR: "Puerto Rico",
    RI: "Rhode Island",
    SC: "South Carolina",
    SD: "South Dakota",
    TN: "Tennessee",
    TX: "Texas",
    UT: "Utah",
    VT: "Vermont",
    VI: "Virgin Islands",
    VA: "Virginia",
    WA: "Washington",
    WV: "West Virginia",
    WI: "Wisconsin",
    WY: "Wyoming",
  };
  return conversion[abbrev];
}
