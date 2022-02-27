import { useSelector, useDispatch } from "react-redux";
import { filterActions } from "../../../state-management/store/search/filters";

// Use to edit all Redux search filters at once (specifically for the Filter ModalMenu)
export default function useChangeAllFilters() {
  const dispatch = useDispatch();
  // We return this function to use wherever we want
  const changeAllFilters = function (payloadObject) {
    dispatch(filterActions.updateAllFilters(payloadObject));
    /* payloadObject = {
          distance: localFilters.distance,
          price: localFilters.price,
          hours: localFilters.hours,
    } */
  };
  return changeAllFilters;
}
