import { createSlice } from "@reduxjs/toolkit";

export const starterFilters = {
  radius: 20000,
  price: "any",
  rating: "any",
  open_now: true,
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
