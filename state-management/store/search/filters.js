import { createSlice } from "@reduxjs/toolkit";

export const starterFilters = {
  // RELATED TO FILTERS
  distance: 20000, // options should be 5000, 10000, 20000, 25000, 30000 (5km-30km)
  price: "any", // "any", or 1-4 (integers only)
  rating: "any", // "any", or 1-5 with 0.5 increments
  hours: "any", // "any" or "open now"
  modalOpen: false,
};
const filterSlice = createSlice({
  name: "restaurantFilters", // expected built-in KVP
  initialState: starterFilters,
  reducers: {
    updateAllFilters(state, action) {
      state.distance = action.payload.distance;
      state.price = action.payload.price;
      state.rating = action.payload.rating;
      state.hours = action.payload.hours;
    },
    setDistanceFilter(state, action) {
      state.distance = action.payload;
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
    reset(state, action) {
      state.distance = 20000; //!? if you decide to let the filter persist, you'll need to edit the string generator
      state.price = "any";
      state.rating = "any";
      state.hours = "any";
      state.modalOpen = false;
    },
  },
});
export const filterActions = filterSlice.actions;

export default filterSlice.reducer; // the only line not part of the cutout
