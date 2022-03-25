import axios from "axios";

export const fetchYelpData = async function (endpoint) {
  try {
    const yelpDataRequest = await axios.post("/api/search/restaurants", {
      apiString: endpoint,
    });
    const { numberOfHits, results } = yelpDataRequest.data;
    return { numberOfHits, results }; // even if we get no hits, the op is still successful
  } catch (error) {
    return null; // process failed
  }
  // results = null or an array
  // numberOfHits = 0 or another integer
};

/*
const fetchYelpData = async function (inp) {
  // Don't run this if these values are undefined or falsy
  if (!apiString || !locationObject) return;
  // Make a request to the API route that fetches data from Yelp's API
  try {
    const request = await axios.post("/api/search/restaurants", {
      apiString: inp,
    });
    const { numberOfHits, results } = request.data;
    // If we got no search results, render a message saying so by changing some Redux vals
    if (numberOfHits === 0) {
      dispatch(searchResultActions.showNoResults());
      return;
    }
    // If we do get results, save them to Redux
    dispatch(
      searchResultActions.saveRestaurants({
        list: results,
        hits: numberOfHits,
      })
    );
  } catch (error) {
    console.log(error.response);
    dispatch(searchResultActions.showError());
  }
};
*/
