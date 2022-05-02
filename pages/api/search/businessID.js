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
    const r = await axios.get(endpoint, { headers });
    const response = r.data;
    // Organize the data and remove info you don't need
    const relevantInfo = {
      storeID: response.id,
      name: response.name,
      price: response.price || "???",
      rating: response.rating || "?",
      mainImg: response.image_url || "/images/noIMG.png",
      phoneNumber: response.display_phone || "# unavailable",
      // reviewQty: response.review_count,
      photos: response.photos,
      categories: response.categories
        ? response.categories.map((obj) => obj.title)
        : null,
      yelpURL: response.url, // link to the business' dedicated page on Yelp
      address: {
        address: response.location.address1,
        mapsDestination: `${response.location.address1}, ${response.location.city}, ${response.location.country}`,
        city: response.location.city,
        state: response.location.state,
        country: response.location.country,
        zipCode: response.location.zip_code,
      },
      // coordinates: `${response.coordinates.latitude},${response.coordinates.longitude}`,
      coords: [response.coordinates.latitude, response.coordinates.longitude],

      // Take the string the API returns for open hours, then convert its format
      // open_now: response.hours ? response.hours[0].is_open_now : null,
      hours: response.hours ? makeHoursObject(response.hours[0].open) : null,
    };
    return { status: "success", info: relevantInfo };
  } catch (error) {
    return { status: "error", message: "Business not found" };
  }
}

// UTILITY FUNCTIONS FOR SORTING OUR RESPONSE DATA
function makeHoursObject(origArray) {
  const hours = {
    Monday: "",
    Tuesday: "",
    Wednesday: "",
    Thursday: "",
    Friday: "",
    Saturday: "",
    Sunday: "",
  };
  // Check which days the restaurant is closed
  [0, 1, 2, 3, 4, 5, 6].forEach((val, ind) => {
    const hoursAvail = origArray.find((obj) => obj["day"] === ind);
    // If the array has no object dedicated to a day, the restaurant is closed that day
    if (!hoursAvail) hours[integerDay(ind)] = "closed";
  });
  // Create open hours strings for each day the restaurant is not closed
  origArray.forEach((obj, ind) => {
    const start = convertTime(obj.start);
    const end = convertTime(obj.end);
    const day = integerDay(obj.day);
    hours[day] = [start, end];
  });
  // Now, the data is in the form { Monday : ["8:00 AM", "11:00 PM"], ...etc}
  // Concatenate each array into 1 string
  let final = {};
  for (let key in hours) {
    if (hours[key] === "closed") final[key] = "closed";
    else final[key] = hours[key].join(" - ");
  }
  return final;
}

function integerDay(num) {
  const conv = {
    0: "Monday",
    1: "Tuesday",
    2: "Wednesday",
    3: "Thursday",
    4: "Friday",
    5: "Saturday",
    6: "Sunday",
  };
  return conv[num];
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
