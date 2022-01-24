import { createStore, combineReducers } from "redux";
// Import all reducers
import { usaSelection } from "./homepage/locationDenialUSA";
import { canadaSelection } from "./homepage/locationDenialCA";

// Place all the reducers you want to combine in here
const rootReducer = combineReducers({
  usaSelection: usaSelection,
  canadaSelection: canadaSelection,
});

const store = createStore(rootReducer);
export default store;
