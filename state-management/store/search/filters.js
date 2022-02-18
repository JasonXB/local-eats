import { createSlice } from "@reduxjs/toolkit";

export const starterFilters = {
  radius: 20000, // options should be 5000, 10000, 20000, 25000, 30000 (5km-30km)
  price: "any",
  rating: "any",
  open_now: "any",
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
