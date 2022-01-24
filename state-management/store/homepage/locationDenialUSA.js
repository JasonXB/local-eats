import { createSlice } from "@reduxjs/toolkit";
import { yelpCitiesUS } from "../yelpData";

const initialState = {
  chosenState: undefined,
  chosenCity: undefined,
  cityList: yelpCitiesUS["Arizona"],
  counter: 0,
  menu2Disabled: true,
};

const usaDenialSlice = createSlice({
  name: "locationDenialUS", // expected built-in KVP
  initialState,
  reducers: {
    // Enables menu 2, updates menu 2's cityList, updates chosenState variable
    selectState: (state, action) => {
      state.chosenState = action.chosenState;
      state.cityList = yelpCitiesUS[action.chosenState];
      state.menu2Disabled = false;
    },
    // Disables menu 2, sets cityList inconsequentially to satisfy one of MUI's required props
    disableMenu: (state) => {
      state.menu2Disabled = true;
      state.cityList = yelpCitiesUS["Arizona"];
    },
    // Updates chosenCity variable using what was selected in Menu2
    selectCity: (state, action) => {
      state.chosenCity = action.chosenCity;
    },
  },
});
export const usaDenialActions = usaDenialSlice.actions;
export default usaDenialSlice.reducer;
