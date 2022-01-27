import { createSlice, configureStore } from "@reduxjs/toolkit";
// Import all reducers
import locationDenialUSA_reducer from "./homepage/locationDenialUSA";
import locationDenialCA_reducer from "./homepage/locationDenialCA";
import homepageModals_reducer from "./homepage/ModalVisibility"
// Create a store with the configureStore method (multiple slices)
const store = configureStore({
  reducer: {
    locationDenialUSA: locationDenialUSA_reducer,
    locationDenialCA: locationDenialCA_reducer,
    homepageModals: homepageModals_reducer,
  },
});

// Default export the Redux store
export default store;