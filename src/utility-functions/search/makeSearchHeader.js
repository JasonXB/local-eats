import { lengthNoSpaces } from "../../utility-functions/general/lengthNoSpaces";
// Create the search header text above all our Restaurant cards
// End result is dependent on the query parameters of the URL

export function makeSearchHeader(queryObj) {
  // The query obj is empty on initial render cycles- end the function early when that's the case
  if (Object.keys(queryObj).length === 0) return;
  console.log(queryObj);
  // Convert certain strings into Boolean values.  Ex. turn "false" string into Boolean
  const i = {};
  for (let key in queryObj) {
    const queryValue = queryObj[key];
    if (queryValue === "false") i[key] = false;
    else if (queryValue === "undefined") i[key] = undefined;
    else i[key] = queryValue;
  }
  // Capitalizes first letter of string then lowercases the rest, plus replaces _ with a space
  const formalString = (str) => {
    if (!str) return "";
    const capitalized =
      str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    return capitalized.replace(/_/g, " ");
  };
  switch (true) {
    case i.price && typeof i.term === "undefined":
      if (i.price == "1" || i.price == "2") return "Affordable Restaurants near"; // prettier-ignore
      if (i.price == "3" || i.price == "4") return "Pricy Restaurants near";
      break;
    default:
      const formal = formalString(i.term);
      if (typeof i.term === "undefined" || !lengthNoSpaces(formal)) {
        return "Search results for";
      } else return `${formal} near`;
  }
}
