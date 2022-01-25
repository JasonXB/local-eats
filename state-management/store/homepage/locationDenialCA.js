import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chosenCity: "",
  errorStyling: false,
  errorMessage: "",
};

const canadaDenialSlice = createSlice({
  name: "locationDenialUS", // expected built-in KVP
  initialState,
  reducers: {
    selectCity: (state, action) => {
      state.chosenCity = action.payload;
    },
    // Places error text onto an input field and changes the color to red
    yesError: (state, action) => {
      console.log(action)
      state.errorStyling = true;
      state.errorMessage = action.payload;
    },
    // Removes error styling on an input field
    noError: (state, action) => {
      state.errorStyling = false;
      state.errorMessage = "";
    },
  },
});
export const canadaDenialActions = canadaDenialSlice.actions;
export default canadaDenialSlice.reducer;
