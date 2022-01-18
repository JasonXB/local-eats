import { useState, createContext, useContext, useEffect } from "react"; // import useContext
const AAA = createContext();
export const useGlobalContext = () => useContext(AAA); // export custom hook

export default function GlobalContextAPIProvider(props) {
  const [themeString, setThemeString] = useState(null); //$ null, "light", or "dark"
  const [locationObj, setLocationObj] = useState(null); //@ null, or a location name
  //^ Use this function when you collect all required info about a new location
  const establishNewLocation = function (locationObj) {
    // Replace the previous location in Local Storage, and update the state here
    localStorage.setItem("savedLocation", JSON.stringify(locationObj));
    setLocationObj(locationObj);
  }; // we'll only save 1 prev location at a time in local storage

  useEffect(() => {
    //$ Check local storage for any pre-selected theme from the user
    setThemeString(localStorage.getItem("preselectedTheme"));
    //@ Check localStorage for any saved locations, and set it as the current (should only be 1 max)
    const stringObject = localStorage.getItem("savedLocation");
    setLocationObj(JSON.parse(stringObject));
  }, []);
  //  prettier-ignore
  const themeRelated = {themeString, setThemeString}
  const locationRelated = { locationObj, establishNewLocation };
  const distribution = { ...themeRelated, ...locationRelated };
  return <AAA.Provider value={distribution}>{props.children}</AAA.Provider>;
}
