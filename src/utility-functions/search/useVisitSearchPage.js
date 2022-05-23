import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { removeEmptyKVPs } from "../general/removeEmptyKVPs";
import { useLocationContext } from "../../../state-management/locationContext";
import useGetFilters from "./useGetFilters";
import useChangeFilter from "./useChangeFilter";
import { searchResultActions } from "../../../state-management/store/search/results";

// This function should create a new URL using active filters and search terms submitted by the user
export default function useVisitSearchPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { locationObject, checkForSavedLocation } = useLocationContext();
  const activeFilters = useGetFilters(); // filter state values
  const setFilter = useChangeFilter(); // util function that helps you set filter vals 1 by 1

  function navToSearchPage(searchParams) {
    // Step 1. Check if the user has a saved location and render feedback if they don't
    const locationSaved = checkForSavedLocation(); // bool
    if (!locationSaved || !locationObject) return; // end function here if we don't have one

    // Step 2. Update the filters based on what the user searched for
    // searchParams may be supplied to this function, and they have priority over the current filters
    // Ex. If Redux price filter value is 4, but we use this hook with filter=3, set the official filter value to 3
    const { term, price, hours, distance, offset, sort_by } = searchParams; // prettier-ignore
    if (term && term != activeFilters.term) setFilter("term", term);
    if (price && price != activeFilters.price) setFilter("price", price);
    if (distance && distance != activeFilters.distance) setFilter("distance", distance); // prettier-ignore
    if (hours && hours != activeFilters.hours) setFilter("hours", hours);

    // If no offset is specified, reset the pagination components so we revert back to page 1
    if (!offset) dispatch(searchResultActions.reset());

    // Step 3. Create an object of URL parameters using filter values
    const queryParams = removeEmptyKVPs({
      radius: distance ?? activeFilters.distance,
      offset: offset ? offset : 0,
      sort_by: sort_by ? sort_by : "best_match",
      hours: hours ?? activeFilters.hours,
      latitude: locationObject.latitude,
      longitude: locationObject.longitude,
      price: price ?? activeFilters.price,
      term,
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
