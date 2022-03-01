import { useSelector, useDispatch } from "react-redux";
import { filterActions } from "../../../state-management/store/search/filters";
import { useRouter } from "next/router";
import { removeEmptyKVPs, removeFalsyKVPs } from "../general/removeEmptyKVPs";
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
    if (!locationSaved || !locationObject) return; // end function here if we don't have one

    // Step 2. Update the filters based on what the user searched for
    // searchParams may be supplied to this function, and they have priority over the current filters
    // Ex. If Redux price filter value is 4, but we use this hook with filter=3, set the official filter value to 3
    const { term, price, hours, distance } = searchParams; // one of these may equal undefined
    if (term && term != activeFilters.term) setFilter("term", term);
    if (price && price != activeFilters.price) setFilter("price", price);
    if (distance && distance != activeFilters.distance) setFilter("distance", distance);
    if (hours && hours != activeFilters.hours) setFilter("hours", hours);
    
    // Step 3. Create an object of URL parameters using filter values
    const queryParams = removeEmptyKVPs({
      radius: distance || activeFilters.distance,
      hours: hours || activeFilters.hours,
      latitude: locationObject.latitude,
      longitude: locationObject.longitude,
      price: price || activeFilters.price,
      term: term || activeFilters.term,
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
