import axios from "axios";
import { useGlobalContext } from "../../../state-management/globalContext";

export default function useInitializeBookmarks() {
  const {
    bookmarks,
    bookmarkIds,
    initializeBookmarks_success,
    initializeBookmarks_failure,
  } = useGlobalContext();
  // Check what the values of both bookmark state values are in our Global Context

  // We return this function to use wherever we want
  const initializeBookmarks = async function () {
    // If the values are not null, then we've already saved our bookmarks (no need to do anything)
    if (bookmarks || bookmarkIds) return;
    // If they are null, then we have not saved any bookmarks yet
    try {
      // Make a request to our DB and grab the value of both bookmark lists, then save them to Global Context
      const response = await axios.post("/api/bookmark/fetchBookmarks");
      const savedRestaurants = response.data.savedRestaurants;
      const savedIds = response.data.savedIds;
      initializeBookmarks_success(savedRestaurants, savedIds); // saves bookmarks to Context API
    } catch (error) {
      initializeBookmarks_failure(); // sets a value in Context API telling us not to use bookmarks
    }
  };
  return initializeBookmarks;
}
