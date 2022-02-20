import { createSlice } from "@reduxjs/toolkit";

export const starterFilters = {
  distance: 20000, // options should be 5000, 10000, 20000, 25000, 30000 (5km-30km)
  price: "any", // "any", or 1-4 (integers on)
  rating: "any", // "any", or 1-5 with 0.5 increments
  hours: "any", // "any" or "open now"
  modalOpen: false,
};
const filterSlice = createSlice({
  name: "restaurantFilters", // expected built-in KVP
  initialState: starterFilters,
  reducers: {
    setDistanceFilter(state, action) {
      state.distance = action.payload;
      console.log(state);
    },
    setPriceFilter(state, action) {
      state.price = action.payload;
    },
    setRatingFilter(state, action) {
      state.rating = action.payload;
    },
    setHoursFilter(state, action) {
      state.hours = action.payload;
    },
    openModal(state, action) {
      state.modalOpen = true;
    },
    closeModal(state, action) {
      state.modalOpen = false;
    },
  },
});
export const filterActions = filterSlice.actions;

export default filterSlice.reducer; // the only line not part of the cutout
