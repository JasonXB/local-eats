import { createSlice } from "@reduxjs/toolkit";

const initial = {
  // RELATED TO SEARCH RESULTS
  numberOfHits: undefined, // total matches the user got with their search term
  pageNumber: 1, // which pagination page the user is currently looking at
  restaurantList: undefined, // array of restaurant objects from Yelp API
};
const searchResultSlice = createSlice({
  name: "searchResults", // expected built-in KVP
  initialState: initial,
  reducers: {
    // Switch which search result page we are currently rendering
    paginationJump(state, action) {
      state.pageNumber = action.payload;
    },
    
  },
});
export const searchResultActions = searchResultSlice.actions;

export default searchResultSlice.reducer; // the only line not part of the cutout