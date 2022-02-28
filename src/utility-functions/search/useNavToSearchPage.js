import { useSelector, useDispatch } from "react-redux";
import { filterActions } from "../../../state-management/store/search/filters";
import { removeEmptyKVPs } from "../general/removeEmptyKVPs";
import { useLocationContext } from "../../../state-management/locationContext";
import useGetFilters from "./useGetFilters";

// This function should create a new URL using active filters and search terms submitted by the user
export default function useNavToSearchPage(searchParams) {
  const dispatch = useDispatch();
  const { locationObject, checkForSavedLocation } = useLocationContext();
  const activeFilters = useGetFilters(); // filter state values

  // Step 1. Check if the user has a saved location and render feedback if they don't
  const locationSaved = checkForSavedLocation(); // bool
  if (!locationSaved) return; // end function here if we don't have one

  // Step 2. Update the filters based on what the user searched for
  // On the homepage, we can specify term or price when we click on a Card or use the searchbar
  // Override any existing filters to adhere to what they user asks for
  const { term, price } = searchParams; // one of these may equal undefined
  // if( term != )
  // Step 2. Create an object of URL parameters using filter values
  // If any values = undefined, our utility f() will remove them (so it won't mess up the string)

  const queryParams = removeEmptyKVPs({
    radius: activeFilters.radius,
    open_now: activeFilters.hours,
    latitude: locationObject.latitude,
    longitude: locationObject.longitude,
    //!!! Could be decided by what we click on the homepage
    price: activeFilters.price, //! choose 1 of 2 then set a filter obj if there's a disagreement
    term: queryObject.term, //! choose 1 of 2 then set a filter obj if there's a disagreement
  });
  // Generate new URL to navigate to
}

/* payloadObject = {
          distance: localFilters.distance,
          price: localFilters.price,
          hours: localFilters.hours,
    } */
