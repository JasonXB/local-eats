import { Bookmarks } from "@mui/icons-material";
import { useGlobalContext } from "../../../state-management/globalContext";

export default function useInitializeBookmarks() {
  const { bookmarks, bookmarkIds } = useGlobalContext();
  // Check what the values of both bookmark state values are in our Global Context

  // We return this function to use wherever we want
  const editFilter = function (filterName, newValue) {
    // If the values are not null, then we've already saved our bookmarks (no need to do anything)
    if (bookmarks || bookmarkIds) return;
    // If they are null, then we have not saved any bookmarks
    // Make a request to our DB and grab the value of both bookamrk lists and save them to Global Context
    
    
  };
  return editFilter;
}
