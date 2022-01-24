import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chosenCity: undefined,
};

const canadaDenialSlice = createSlice({
  name: "locationDenialUS", // expected built-in KVP
  initialState,
  reducers: {
    selectCity: (state, action) => {
      state.chosenCity = action.chosenCity;
    },
  },
});
export const canadaDenialActions = canadaDenialSlice.actions;
export default canadaDenialSlice.reducer;

