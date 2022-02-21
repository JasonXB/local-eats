import { createSlice } from "@reduxjs/toolkit";

const initial = {
  // RELATED TO SEARCH RESULTS
  numberOfHits: undefined, // total matches the user got with their search term
  pageNumber: 1, // which pagination page the user is currently looking at
  restaurantList: undefined, // array of restaurant objects from Yelp API
  noResults: false, // decides when to render a "No Results" message
  generalError: false, // decides when to render a general error
};
const searchResultSlice = createSlice({
  name: "searchResults", // expected built-in KVP
  initialState: initial,
  reducers: {
    // Switch which search result page we are currently rendering
    paginationJump(state, action) {
      state.pageNumber = action.payload;
    },
    // Save the list of restauarants and the number of matches found
    saveRestaurants(state, action) {
      state.restaurantList = action.payload.list;
      state.numberOfHits = action.payload.hits;
      console.log(state.restaurantList)
    },
    showNoResults(state, action) {
      state.noResults = true;
    },
    showGeneralError(state, action) {
      state.generalError = true;
    },
    // Reset all state values
    reset(state, action) {
      state.numberOfHits = undefined;
      state.pageNumber = 1;
      state.restaurantList = undefined;
      state.noResults = false;
      state.generalError = false;
    },
  },
});
export const searchResultActions = searchResultSlice.actions;

export default searchResultSlice.reducer; // the only line not part of the cutout
