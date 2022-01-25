import { createSlice } from "@reduxjs/toolkit";
import { yelpCitiesUS } from "../yelpData";

const initialState = {
  chosenState: "",
  chosenCity: "",
  cityList: yelpCitiesUS["Arizona"],
  menu2Disabled: true,
  errorMessageM1: "",
  errorStylingM1: false,
  errorMessageM2: "",
  errorStylingM2: false,
};

const usaDenialSlice = createSlice({
  name: "locationDenialUS", // expected built-in KVP
  initialState,
  reducers: {
    // Enables menu 2, updates menu 2's cityList, updates chosenState variable
    selectState: (state, action) => {
      state.chosenState = action.payload;
      state.cityList = yelpCitiesUS[action.payload];
      state.menu2Disabled = false;
    },
    // Disables menu 2, sets cityList inconsequentially to satisfy one of MUI's required props
    disableMenu: (state) => {
      state.menu2Disabled = true;
      state.cityList = yelpCitiesUS["Arizona"];
    },
    // Updates chosenCity variable using what was selected in Menu2
    selectCity: (state, action) => {
      state.chosenCity = action.payload;
    },
    // Places error text onto an input field and changes the color to red
    yesErrorM1: (state, action) => {
      state.errorStylingM1 = true;
      state.errorMessageM1 = action.payload;
    },
    // Removes error styling on an input field
    noErrorM1: (state, action) => {
      state.errorStylingM1 = false;
      state.errorMessageM1 = "";
    },
    // Places error text onto an input field and changes the color to red
    yesErrorM2: (state, action) => {
      state.errorStylingM2 = true;
      state.errorMessageM2 = action.payload;
    },
    // Removes error styling on an input field
    noErrorM2: (state, action) => {
      state.errorStylingM2 = false;
      state.errorMessageM2 = "";
    },
  },
});
export const usaDenialActions = usaDenialSlice.actions;
export default usaDenialSlice.reducer;
