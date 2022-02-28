import { useSelector, useDispatch } from "react-redux";
import { filterActions } from "../../../state-management/store/search/filters";
import { useRouter } from "next/router";
import { removeEmptyKVPs } from "../general/removeEmptyKVPs";
import { useLocationContext } from "../../../state-management/locationContext";
import useGetFilters from "./useGetFilters";
import useChangeFilter from "./useChangeFilter";

// This function should create a new URL using active filters and search terms submitted by the user
export default function useVisitSearchPage() {
  const router = useRouter();
  const { locationObject, checkForSavedLocation } = useLocationContext();
  const activeFilters = useGetFilters(); // filter state values
  const setFilter = useChangeFilter(); // util function that helps you set filter vals 1 by 1

  function navToSearchPage(searchParams) {
    // Step 1. Check if the user has a saved location and render feedback if they don't
    const locationSaved = checkForSavedLocation(); // bool
    if (!locationSaved) return; // end function here if we don't have one

    // Step 2. Update the filters based on what the user searched for
    // On the homepage, we can specify term or price when we click on a Card or use the searchbar
    // The price/term parameter for this function and our existing filter values may differ
    // Give priority to the parameter values
    const { term, price } = searchParams; // one of these may equal undefined
    if (term && term != activeFilters.term) setFilter("term", term);
    if (price && price != activeFilters.price) setFilter("price", price);
    /*
    if (term) setFilter("term", term);
    if (price) setFilter("price", price);
    */

    // Step 3. Create an object of URL parameters using filter values
    // If any values = undefined, our utility f() will remove them (so it won't mess up the string)
    const queryParams = removeEmptyKVPs({
      radius: activeFilters.distance,
      hours: activeFilters.hours,
      latitude: locationObject.latitude,
      longitude: locationObject.longitude,
      // Could be decided by what we click on the homepage
      price: price ? price : activeFilters.price, // priority given to the hook parameter
      term: term ? term : activeFilters.term,
    });
    // Step 4. Generate new URL to navigate to, then go
    const qs = Object.keys(queryParams)
      .map((key) => `${key}=${queryParams[key]}`)
      .join("&"); // convert object to a query string
    const newURL = `/search?limit=50&${qs}`;
    router.push(newURL);
  }
  return navToSearchPage;
}

/* searchParams = {
      distance: localFilters.distance,
      price: localFilters.price,
      hours: localFilters.hours,
      term: ~~~~
} */
