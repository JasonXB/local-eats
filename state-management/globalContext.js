import { useState, createContext, useContext, useEffect } from "react"; // import useContext
const AAA = createContext();
export const useGlobalContext = () => useContext(AAA); // export custom hook

export default function GlobalContextAPIProvider(props) {
  const [themeString, setThemeString] = useState(null); // null, "light", or "dark"
    
  useEffect(() => {
    // Check local storage for any pre-selected theme from the user
    setThemeString(localStorage.getItem("preselectedTheme")); // can = null
  }, []);

  //  prettier-ignore
  const themeRelated = {themeString, setThemeString}
  const distribution = { ...themeRelated };
  return <AAA.Provider value={distribution}>{props.children}</AAA.Provider>;
}
