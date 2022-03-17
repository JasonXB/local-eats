import axios from "axios";
import { useGlobalContext } from "../../../state-management/globalContext";

export default function useInitializeBookmarks() {
  const { bookmarks, bookmarkIds, setBookmarksEnabled } = useGlobalContext();
  // Check what the values of both bookmark state values are in our Global Context

  // We return this function to use wherever we want
  const initializeBookmarks = function () {
    // If the values are not null, then we've already saved our bookmarks (no need to do anything)
    if (bookmarks || bookmarkIds) return;
    // If they are null, then we have not saved any bookmarks yet
    try {
      // Make a request to our DB and grab the value of both bookmark lists, then save them to Global Context
      const response = await axios.post("/api/bookmark/fetchBookmarks");
      const savedRestaurants = response.data.savedRestaurants;
      setBookmarks(savedRestaurants);
      const savedIds = response.data.savedIds;
      setBookmarkIds(savedIds);
      setBookmarksEnabled(true);
    } catch (error) {
      setBookmarksEnabled(false);
    }
  };
  return initializeBookmarks;
}
