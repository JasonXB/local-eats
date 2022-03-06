import axios from "axios";

export async function getBusinessData(id) {
  const endpoint = `https://api.yelp.com/v3/businesses/${id}`;
  const authKey = process.env.YELP_API_KEY;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `bearer ${authKey}`,
  };

  try {
    // Make a request to get specific business data from Yelp's API
    const response = await axios.get(endpoint, { headers });
    const diff = response.hours[0].open; // hours object
    // Organize the data and remove info you don't need
    const relevantInfo = {
      companyID: response.id,
      name: response.name,
      rating: response.rating,
      priceLvl: response.price,
      mainImg: response.image_url,
      phoneNumber: response.display_phone,
      reviewQty: response.review_count,
      photos: response.photos,
      categories: response.categories.map((obj) => obj.title),
      yelpURL: response.url, // link to the business' dedicated page on Yelp
      address: {
        address: response.location.address1,
        city: response.location.city,
        state: response.location.state,
        country: response.location.country,
        zipCode: response.location.zip_code,
      },
      coordinates: {
        latitude: response.latitude,
        longitude: response.longitude,
      },
      // Take the string the API returns for open hours, then convert its format
      hours: {
        open_now: response.hours.is_open_now,
        Monday: [convertTime(diff[0].start), convertTime(diff[0].end)],
        Tuesday: [convertTime(diff[1].start), convertTime(diff[1].end)],
        Wednesday: [convertTime(diff[2].start), convertTime(diff[2].end)],
        Thursday: [convertTime(diff[3].start), convertTime(diff[3].end)],
        Friday: [convertTime(diff[4].start), convertTime(diff[4].end)],
        Saturday: [convertTime(diff[5].start), convertTime(diff[5].end)],
        Sunday: [convertTime(diff[6].start), convertTime(diff[6].end)],
      },
      
    };
    return { status: "success", info: relevantInfo };
  } catch (error) {
    return { status: "error", message: "Business not found" };
  }
}

export async function getBusinessReviews(id) {
  const endpoint = `https://api.yelp.com/v3/businesses/${id}/reviews`;
  const authKey = process.env.YELP_API_KEY;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `bearer ${authKey}`,
  };

  try {
    const response = await axios.get(endpoint, { headers });
    return response;
  } catch (error) {
    return { status: "Error", message: "Reviews not available at this time" };
  }
}

function convertTime(str) {
  let suffix, hour, min;
  // Return the following results if noon or midnight is the time
  if (str === "0000") return "12:00 AM";
  else if (str === "1200") return "12:00 PM";
  // Inspect the first 2 characters of the string and see if the time's AM or PM
  const first2Chars = str.slice(0, 2);
  // Decide the suffix
  switch (true) {
    case +first2Chars < 12:
      suffix = "AM";
      hour = str.slice(0, 2);
      min = str.slice(2);
      break;
    case +first2Chars >= 12:
      suffix = "PM";
      min = str.slice(2);
      const diff = +first2Chars - 12;
      if (diff === 0) hour = 12;
      else hour = diff;
      break;
    default:
      break;
  }
  return `${hour}:${min} ${suffix}`;
}
