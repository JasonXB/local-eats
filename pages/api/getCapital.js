const axios = require("axios");
const lookup = require("country-code-lookup");

export default async function handler(req, res) {
  const countryName = req.body.countryName;
  // const countryCode = lookup.byCountry(countryName);
  const restCountriesURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
  try {
    const request = await axios.get(restCountriesURL);
    const capitalCity = request.data[0].capital[0];
    const countryCode = request.data[0].cca2;
    const payload = {
      latitude: request.data[0].capitalInfo.latlng[0],
      longitude: request.data[0].capitalInfo.latlng[1],
      city: capitalCity,
      nation: countryName,
      locationString: `${capitalCity}, ${countryCode}`,
    };

    res.status(200).json({ message: "Success", payload });
  } catch (err) {
    res.status(404).json({ message: "RESTCountries API error" });
  }
}
