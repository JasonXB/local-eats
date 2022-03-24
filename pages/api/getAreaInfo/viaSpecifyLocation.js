import { removeWhiteSpace } from "../../../src/utility-functions/general/lengthNoSpaces"; // prettier-ignore
import { removeEmptyKVPs } from "../../../src/utility-functions/general/removeEmptyKVPs";

const axios = require("axios");

export default async function handler(req, res) {
  const { country, province, specifier, city, postalCode } = req.body;
  const convertCountryCode = (code) => {
    if (code == "CA") return "Canada";
    if (code == "US") return "United States";
  };

  // Return errors if certain mandatory fields are submitted empty
  if (!province) {
    return res.status(400).json({ message: "Province empty" });
  }
  if (specifier === "city" && !city) {
    return res.status(400).json({ message: "City empty" });
  }
  if (specifier === "postal_code" && !postalCode) {
    return res.status(400).json({ message: "Postal code empty" });
  }
  // Remove whitespace from inputs and replace them with + signs
  const editedProvince = removeWhiteSpace(province, "+");
  const editedCity = specifier === "city" ? removeWhiteSpace(city) : undefined;
  const editedPostalCode = specifier === "postal_code" ?  removeWhiteSpace(postalCode) : undefined; // prettier-ignore
  // Construct the MapQuest API string
  const frags = removeEmptyKVPs({
    city: editedCity,
    postalCode: editedPostalCode,
    key: process.env.MAPQUEST_API_KEY,
  }); // all undefined KVP's will be removed
  let apiString = `http://www.mapquestapi.com/geocoding/v1/address?country=${country}&state=${editedProvince}`;
  for (let key in frags) apiString = apiString + `&${key}=${frags[key]}`;

  try {
    // Request location data from Mapquest
    const response = await axios.get(apiString);
    const bestMatch = response.data.results[0].locations[0];

    // If the user's submission is not enough for Mapquest API to pinpoint a city, return an error
    if (!bestMatch.adminArea5 && specifier === "postal_code") {
      return res.status(400).json({ message: "Invalid postal code" });
    } else if (!bestMatch.adminArea5 && specifier === "city") {
      return res.status(400).json({ message: "Invalid city" });
    }

    // Organize the data that's required for the project locationObject
    const locationObj = removeEmptyKVPs({
      country: bestMatch.adminArea1,
      latitude: bestMatch.latLng.lat,
      longitude: bestMatch.latLng.lng,
      stateProvinceCode: bestMatch.adminArea3,
      city: bestMatch.adminArea5,
      locationString: `${bestMatch.adminArea5}, ${bestMatch.adminArea3}`,
      apiString: `${bestMatch.adminArea5}, ${province}, ${convertCountryCode(bestMatch.adminArea1)}`, // prettier-ignore
    });

    // Return the locationObject so we can save it to LocalStorage
    return res
      .status(200)
      .json({ message: "Location data secured", locationObj });
  } catch (error) {
    return res.status(408).json({ message: "Error encountered" });
  }
}
