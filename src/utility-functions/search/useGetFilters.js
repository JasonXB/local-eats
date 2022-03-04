import { useSelector, useDispatch } from "react-redux";

// Grabs all search Filters from the dedicated slice on the Redux store
export default function useGetFilters(){
  return {
    distance: useSelector((r) => r.searchFilters.distance),
    price: useSelector((r) => r.searchFilters.price),
    hours: useSelector((r) => r.searchFilters.hours),
    term: useSelector((r) => r.searchFilters.term),
    sort_by: useSelector((r) => r.searchFilters.sort_by),
  };
}