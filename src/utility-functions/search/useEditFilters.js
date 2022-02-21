import { useSelector, useDispatch } from "react-redux";
import { filterActions } from "../../../state-management/store/search/filters";

// Use to edit the restaurant search filters inside the dedicated slice on the Redux store
export default function useEditFilters(filterName, newValue) {
  const dispatch = useDispatch();

  switch (filterName) {
    case "distance":
      dispatch(filterActions.setDistanceFilter(newValue));
      break;
    case "price":
      dispatch(filterActions.setPriceFilter(newValue));
      break;
    case "rating":
      dispatch(filterActions.setRatingFilter(newValue));
      break;
    case "hours":
      dispatch(filterActions.setHoursFilter(newValue));
      break;
    default:
      break;
  }
  return;
}