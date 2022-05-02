import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCountry: "Canada",
  showLocationDenial: false,
  showGeoUnsupported: false,
  showPredetermined: false,
  showSpecifyLocation: false,
  regionLocked: false,
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
      state.regionLocked = false;
    },
    regionLocked: (state, action) => {
      state.regionLocked = true;
      state.showLocationDenial = false;
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
      state.regionLocked = false;
    },
    usePredeterminedLocations: (state, action) => {
      state.showPredetermined = true;
      state.showLocationDenial = false;
      state.showGeoUnsupported = false;
      state.showSpecifyLocation = false;
      state.regionLocked = false;
    },
    useSpecifyLocation: (state, action) => {
      state.showSpecifyLocation = true;
      state.showPredetermined = false;
      state.showLocationDenial = false;
      state.showGeoUnsupported = false;
      state.regionLocked = false;
    },
    closeAllModals: (state, action) => {
      state.selectedCountry = "Canada";
      state.showLocationDenial = false;
      state.showGeoUnsupported = false;
      state.showPredetermined = false;
      state.showSpecifyLocation = false;
      state.regionLocked = false;
    },
  },
});
export const homepageModalActions = homeModalSlice.actions;
export default homeModalSlice.reducer;
