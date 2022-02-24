import { createSlice } from "@reduxjs/toolkit";

const initial = {
  // RELATED TO SEARCH RESULTS
  restaurantList: undefined, // array of restaurant objects from Yelp API
  numberOfHits: undefined, // total matches the user got with their search term
  pageNumber: 1, // which pagination page the user is currently looking at
  showError: false,
};
const searchResultSlice = createSlice({
  name: "searchResults", // expected built-in KVP
  initialState: initial,
  reducers: {
    // Switch which search result page we are currently rendering
    paginationJump(state, action) {
      state.pageNumber = action.payload;
      state.showError = false;
    },
    // Save the list of restauarants and the number of matches found
    saveRestaurants(state, action) {
      state.restaurantList = action.payload.list;
      state.numberOfHits = action.payload.hits;
      state.pageNumber = 1; // reset. revert to page 1 when we search something new
      state.showError = false;
    },
    showNoResults(state, action) {
      state.restaurantList = undefined; // reset
      state.numberOfHits = 0;
      state.pageNumber = 1; // reset. revert to page 1 when we search something new
      state.showError = false;
    },
    showError(state, action) {
      state.numberOfHits = undefined;
      state.pageNumber = 1;
      state.restaurantList = undefined;
      state.showError = true;
    },
    // Reset all state values
    reset(state, action) {
      state.numberOfHits = undefined;
      state.pageNumber = 1;
      state.restaurantList = undefined;
      state.showError = false;
    },
  },
});
export const searchResultActions = searchResultSlice.actions;

export default searchResultSlice.reducer; // the only line not part of the cutout
