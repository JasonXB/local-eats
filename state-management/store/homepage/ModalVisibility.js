import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showLocationDenial: false,
  showGeoUnsupported: false,
};

const homeModalSlice = createSlice({
  name: "ModalVisibility", // expected built-in KVP
  initialState,
  reducers: {
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
      state.showLocationDenial = false;
      state.showGeoUnsupported = false;
    },
  },
});
export const homepageModalActions = homeModalSlice.actions;
export default homeModalSlice.reducer;
