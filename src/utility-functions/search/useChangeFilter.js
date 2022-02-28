import { useSelector, useDispatch } from "react-redux";
import { filterActions } from "../../../state-management/store/search/filters";

// Use to edit individual restaurant search filters inside the dedicated slice on the Redux store
export default function useChangeFilter() {
  const dispatch = useDispatch();
  // We return this function to use wherever we want
  const editFilter = function (filterName, newValue) {
    switch (filterName) {
      case "distance":
        dispatch(filterActions.setDistanceFilter(newValue));
        break;
      case "price":
        dispatch(filterActions.setPriceFilter(newValue));
        break;
      case "hours":
        dispatch(filterActions.setHoursFilter(newValue));
        break;
      case "term":
        dispatch(filterActions.setTermFilter(newValue));
        break;
      default:
        break;
    }
  };
  return editFilter;
}
