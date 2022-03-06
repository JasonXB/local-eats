const a = [
  { is_overnight: false, start: "1200", end: "1900", day: 2 },
  { is_overnight: false, start: "1200", end: "1900", day: 3 },
  { is_overnight: false, start: "1200", end: "1900", day: 4 },
  { is_overnight: false, start: "1200", end: "1900", day: 5 },
  { is_overnight: false, start: "1200", end: "1900", day: 6 },
];

function makeHoursArray(origArray) {
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
  return hours;
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
