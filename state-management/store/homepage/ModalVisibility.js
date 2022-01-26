import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCountry: "Canada",
  showLocationDenial: false,
  showGeoUnsupported: false,
};

const homeModalSlice = createSlice({
  name: "ModalVisibility", // expected built-in KVP
  initialState,
  reducers: {
    selectCountry: (state, action) => {
      state.selectedCountry = action.payload;
    },
    permissionsDenied: (state, action) => {
      state.showLocationDenial = true;
      state.showGeoUnsupported = false;
    },
    // Places error text onto an input field and changes the color to red
    geolocationUnsupported: (state, action) => {
      state.showLocationDenial = false;
      state.showGeoUnsupported = true;
    },
    closeAllModals: (state, action) => {
      state.selectedCountry = "Canada"; // reset default choice to Canada
      state.showLocationDenial = false;
      state.showGeoUnsupported = false;
    },
  },
});
export const homepageModalActions = homeModalSlice.actions;
export default homeModalSlice.reducer;
