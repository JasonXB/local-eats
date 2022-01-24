import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chosenCity: "",
};

const canadaDenialSlice = createSlice({
  name: "locationDenialUS", // expected built-in KVP
  initialState,
  reducers: {
    selectCity: (state, action) => {
      console.log(action)
      state.chosenCity = action.payload;
    },
  },
});
export const canadaDenialActions = canadaDenialSlice.actions;
export default canadaDenialSlice.reducer;

