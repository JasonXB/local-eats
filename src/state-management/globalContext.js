import { useState, createContext, useContext, useEffect } from "react"; // import useContext
const AAA = createContext();
export const useGlobalContext = () => useContext(AAA); // export custom hook

export default function GlobalContextAPIProvider(props) {
  const [themeString, setThemeString] = useState(null);
  // Check local storage for any pre-selected theme from the user
  useEffect(()=>{
    const preselectedTheme= localStorage.getItem("preselectedTheme");
    setThemeString(preselectedTheme) // equals null if not found, "light", or "dark"
  },[])
  
  const distribution = { themeString, setThemeString };
  return <AAA.Provider value={distribution}>{props.children}</AAA.Provider>;
}