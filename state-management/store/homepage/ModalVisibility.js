import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCountry: null,
  showLocationDenial: false,
  showGeoUnsupported: false,
  showPredetermined: false,
  showSpecifyLocation: true,
};

const homeModalSlice = createSlice({
  name: "ModalVisibility", // expected built-in KVP
  initialState,
  reducers: {
    // Used when people hit the radio buttons to select Canada or US in one of the modals
    selectCountry: (state, action) => {
      state.selectedCountry = action.payload;
    },
    // Use to render the LocationDenial modal (when people dont give permission to track location)
    permissionsDenied: (state, action) => {
      state.showLocationDenial = true;
      state.showGeoUnsupported = false;
      state.showPredetermined = false;
      state.showSpecifyLocation = false;
    },
    // Places error text onto an input field and changes the color to red
    geolocationUnsupported: (state, action) => {
      state.showGeoUnsupported = true;
      state.showLocationDenial = false;
      state.showPredetermined = false;
      state.showSpecifyLocation = false;
    },
    usePredeterminedLocations: (state, action) => {
      state.showPredetermined = true;
      state.showLocationDenial = false;
      state.showGeoUnsupported = false;
      state.showSpecifyLocation = false;
    },
    useSpecifyLocation: (state, action) => {
      state.showSpecifyLocation = true;
      state.showPredetermined = false;
      state.showLocationDenial = false;
      state.showGeoUnsupported = false;
    },
    closeAllModals: (state, action) => {
      state.selectedCountry = null;
      state.showLocationDenial = false;
      state.showGeoUnsupported = false;
      state.showPredetermined = false;
      state.showSpecifyLocation = false;
    },
  },
});
export const homepageModalActions = homeModalSlice.actions;
export default homeModalSlice.reducer;
