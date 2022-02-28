export function getSearchHeader(queryObject) {
  // Create an object full of query parameters extracted from our URL
  const queryParams = {
    price: queryObject.price, // may equal undefined (could be removed)
    term: queryObject.term, // may equal undefined (could be removed)
  };
  // Return query string
  let title;
  if (queryParams.term) {
    const titleLowercase = `${queryParams.term}`;
    title = titleLowercase[0].toUpperCase() + titleLowercase.substring(1);
  } else if (queryParams.price === "1" || queryParams.price === "2")
    title = "Affordable Restaurants";
  else if (queryParams.price === "4" || queryParams.price === "3")
    title = "Pricier Restaurants";
  return title;
}
