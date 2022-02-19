import { createSlice } from "@reduxjs/toolkit";

export const starterFilters = {
  radius: 20000, // options should be 5000, 10000, 20000, 25000, 30000 (5km-30km)
  price: "any", // "any", or 1-4 (integers on)
  rating: "any", // "any", or 1-5 with 0.5 increments
  hours: "any", // "any" or "open_now"
};
const filterSlice = createSlice({
  name: "restaurantFilters", // expected built-in KVP
  initialState: starterFilters,
  reducers: {
    // logOff(state, action) {
    //   state.isLoggedIn = false;
    // },
    // logIn(state, action) {
    //   state.isLoggedIn = true;
    // },
  },
});
export const filterActions = filterSlice.actions;

export default filterSlice.reducer; // the only line not part of the cutout
