import { useState, createContext, useContext, useEffect, useReducer } from "react"; // prettier-ignore
const AAA = createContext();
export const useGlobalContext = () => useContext(AAA); // export custom hook

export default function GlobalContextAPIProvider(props) {
  // Save our list of bookmarked restaurants to our project state
  const [bookmarksEnabled, setBookmarksEnabled] = useState(false);
  const [bookmarks, setBookmarks] = useState(null);
  const [bookmarkIds, setBookmarkIds] = useState(null);
  const initializeBookmarks_success = function (savedRestaurants, savedIds) {
    setBookmarks(savedRestaurants);
    setBookmarkIds(savedIds);
    setBookmarksEnabled(true);
  };
  const initializeBookmarks_failure = function () {
    setBookmarksEnabled(false);
  };
  // Add a restaurant to both the arrays above
  const addBookmark = (dataObj, id) => {
    setBookmarks((prevState) => {
      if (bookmarks === null) return [dataObj];
      else return [...prevState, dataObj];
    });
    setBookmarkIds((prevState) => {
      if (bookmarkIds === null) return [id];
      else return [...prevState, id];
    });
  };
  // Delete a restaurant from one of the arrays above
  const removeBookmark = (id) => {
    if (!bookmarks || !bookmarkIds) return;
    setBookmarks((prevState) => {
      const clone = prevState;
      // Choose which index# to delete in the idList (decide using the store ID)
      const targetIndex = clone.findIndex((obj) => {
        return obj.storeID === id;
      });
      // If no match is found, return the original state
      if (targetIndex === -1) return prevState;
      // If a match is found, eliminate that array entry
      clone.splice(targetIndex, 1);
      return clone;
    });
    setBookmarkIds((prevState) => {
      return prevState.filter((idNum) => idNum !== id);
    });
  };
  // DISTRIBUTION
  const distribution = {
    bookmarks, // list of data objects for each saved restaurant
    bookmarkIds, // list of saved restaurant IDs

    addBookmark, // add a restaurant to both lists
    removeBookmark, // remove a restaurant to both lists

    initializeBookmarks_success, // saves bookmarks to Context API
    initializeBookmarks_failure, // sets a value in Context API telling us not to use bookmarks

    bookmarksEnabled, // state value telling if we're allowed to use bookmarks or not
    setBookmarksEnabled, // adjust state value described above
  };
  return <AAA.Provider value={distribution}>{props.children}</AAA.Provider>;
}
// HOW OUR BOOKMARK FEATURE WORKS
// [...nextAuth].js
// Set the existing bookmarks during the log in process

// SearchResults page and businessID page
// If the user is still online from a previous session, detect when the bookmark state equals a falsy
// If the bookmark states here equal null, then make a request to MongoDB and save the bookmarks to Context API
