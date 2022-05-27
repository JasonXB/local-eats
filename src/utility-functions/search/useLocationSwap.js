import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { removeEmptyKVPs } from "../general/removeEmptyKVPs";
import { useLocationContext } from "../../../state-management/locationContext";
import useGetFilters from "./useGetFilters";
import { searchResultActions } from "../../../state-management/store/search/results";

// This function should create a new URL using active filters and search terms submitted by the user
export default function useVisitSearchPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { locationObject, checkForSavedLocation } = useLocationContext();
  const activeFilters = useGetFilters(); // filter state values

  function navToSearchPage2(searchParams) {
    // Check if the user has a saved location and render feedback if they don't
    const locationSaved = checkForSavedLocation(); // bool
    if (!locationSaved || !locationObject) return; // end function here if we don't have one

    // Reset the pagination components so we revert back to page 1
    dispatch(searchResultActions.reset());

    // Create a new URL based on the existing filters + new location coords
    const queryParams = removeEmptyKVPs({
      radius: activeFilters.distance,
      offset: 0,
      sort_by: activeFilters.sort_by,
      hours: activeFilters.hours,
      latitude: locationObject.latitude,
      longitude: locationObject.longitude,
      price: activeFilters.price,
      term: activeFilters.term,
    });

    // Step 4. Generate new URL to navigate to, then go
    const qs = Object.keys(queryParams)
      .map((key) => `${key}=${queryParams[key]}`)
      .join("&"); // convert object to a query string
    const newURL = `/search?limit=50&${qs}`;
    router.push(newURL);
  }
  return navToSearchPage2;
}

/* searchParams = {
      distance: localFilters.distance,
      price: localFilters.price,
      hours: localFilters.hours,
      term: ~~~~
} */
