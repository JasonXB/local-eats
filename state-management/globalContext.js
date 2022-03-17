import { useState, createContext, useContext, useEffect, useReducer } from "react"; // prettier-ignore
const AAA = createContext();
export const useGlobalContext = () => useContext(AAA); // export custom hook

export default function GlobalContextAPIProvider(props) {
  // Save our list of bookmarked restaurants to our project state
  const [bookmarks, setBookmarks] = useState(null);
  const [bookmarkIds, setBookmarkIds] = useState(null);

  // Add a restaurant to both the arrays above using one utility function
  const addBookmark = (dataObj, id) => {
    setBookmarks((prevState) => {
      // if (bookmarks === null) return [dataObj];
      // else return [...prevState, dataObj];
      if (bookmarks === null) {
        console.log([dataObj]);
        return [dataObj];
      } else {
        console.log([...prevState, dataObj]);
        return [...prevState, dataObj];
      }
    });
    setBookmarkIds((prevState) => {
      // if (bookmarkIds === null) return [id];
      // else return [...prevState, id];
      if (bookmarkIds === null) {
        console.log([id]);
        return [id];
      } else {
        console.log([...prevState, id]);
        return [...prevState, id];
      }
    });
  };
  
  const removeBookmark = (dataObj, id) => {
    //
  };
  // DISTRIBUTION
  const distribution = { addBookmark, bookmarks, bookmarkIds };
  return <AAA.Provider value={distribution}>{props.children}</AAA.Provider>;
}
// HOW OUR BOOKMARK FEATURE WORKS
// [...nextAuth].js
// Set the existing bookmarks during the log in process

// SearchResults page and businessID page
// If the user is still online from a previous session, detect when the bookmark state equals a falsy
// If the bookmark states here equal null, then make a request to MongoDB and save the bookmarks to Context API
