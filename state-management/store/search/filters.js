import { createSlice } from "@reduxjs/toolkit";

export const starterFilters = {
  // RELATED TO FILTERS
  distance: 20000, // options should be 5000, 10000, 20000, 25000, 30000 (5km-30km)
  price: false, // "any", or 1-4 (integers only)
  hours: false, // "any" or "open now"
  term: undefined, //!!!! set this when we search something
  modalOpen: false,
};
const filterSlice = createSlice({
  name: "restaurantFilters", // expected built-in KVP
  initialState: starterFilters,
  reducers: {
    updateAllFilters(state, action) {
      state.distance = action.payload.distance;
      state.price = action.payload.price;
      state.hours = action.payload.hours;
      state.term = action.payload.term;
    },
    setDistanceFilter(state, action) {
      state.distance = action.payload;
    },
    setPriceFilter(state, action) {
      state.price = action.payload;
    },
    setHoursFilter(state, action) {
      state.hours = action.payload;
    },
    setTermFilter(state, action) {
      state.term = action.payload;
    },
    openModal(state, action) {
      state.modalOpen = true;
    },
    closeModal(state, action) {
      state.modalOpen = false;
    },
    reset(state, action) {
      state.distance = 20000;
      state.price = "any";
      state.hours = "any";
      state.modalOpen = false;
    },
  },
});
export const filterActions = filterSlice.actions;

export default filterSlice.reducer; // the only line not part of the cutout
