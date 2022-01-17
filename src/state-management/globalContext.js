import { useState, createContext, useContext, useEffect } from "react"; // import useContext
const AAA = createContext();
export const useGlobalContext = () => useContext(AAA); // export custom hook

export default function GlobalContextAPIProvider(props) {
  const [themeString, setThemeString] = useState(null); 
  // ▲ null at start, null if not found, "light", or "dark"
  const [prevLocation, setPrevLocation] = useState(null); 
  // ▲ null at start, null if no locations saved in localStorage, a town name if saved

  useEffect(() => {
    //@ Check local storage for any pre-selected theme from the user
    setThemeString(localStorage.getItem("preselectedTheme")); 
    //@ Check localStorage for any saved locations (should only be 1 max)
    setPrevLocation(localStorage.getItem("previousLocation"))
  }, []);
  //  prettier-ignore
  const distribution = { themeString, setThemeString, prevLocation, setPrevLocation };
  return <AAA.Provider value={distribution}>{props.children}</AAA.Provider>;
}
