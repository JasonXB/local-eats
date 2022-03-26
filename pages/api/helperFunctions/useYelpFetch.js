import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { searchResultActions } from "../../../state-management/store/search/results";

export function useYelpFetch() {
  const dispatch = useDispatch();
  const fetchYelpData = async function (endpoint) {
    // Make a request to the API route that fetches data from Yelp's API
    try {
      const request = await axios.post("/api/search/restaurants", {
        endpoint,
      });
      const { numberOfHits, results } = request.data;
      // If we got no search results, render a message saying so
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
      // If the process fails
      console.log(error.response)
      dispatch(searchResultActions.showError());
    }
  };

  return fetchYelpData;
}
