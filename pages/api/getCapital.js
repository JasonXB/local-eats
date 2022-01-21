const axios = require("axios");

export default async function handler(req, res) {
  const countryName = req.body.countryName;
  const restCountriesURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
  try {
    const request = await axios.get(restCountriesURL);
    const payload = {
      //  prettier-ignore
      //! TURN COUNTRY NAME INTO CODE USING ONE OF YOUR API'S
      locationString: `${request.data[0].capital[0]}, ${countryName}`,
      latitude: request.data[0].capitalInfo.latlng[0],
      longitude: request.data[0].capitalInfo.latlng[1],
    };

    res.status(200).json({ message: "Success", payload });
  } catch (err) {
    res.status(404).json({ message: "RESTCountries API error" });
  }
}
