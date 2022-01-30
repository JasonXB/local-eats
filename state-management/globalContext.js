import { useState, createContext, useContext, useEffect } from "react"; // import useContext
const AAA = createContext();
export const useGlobalContext = () => useContext(AAA); // export custom hook

export default function GlobalContextAPIProvider(props) {
  // Manage the theme
  const [themeString, setThemeString] = useState(null); // null, "light", or "dark"
  // Manage login status
  const [onlineStatus, setOnlineStatus] = useState(false); //!! set to false by default unless you log in
  const signIn = () => setOnlineStatus(true);
  const signOut = () => setOnlineStatus(false);

  useEffect(() => {
    // Check local storage for any pre-selected theme from the user
    setThemeString(localStorage.getItem("preselectedTheme")); // can = null
  }, []);

  // DISTRIBUTION
  const themeRelated = { themeString, setThemeString };
  const authRelated = { onlineStatus, signIn, signOut };
  const distribution = { ...themeRelated, ...authRelated };
  return <AAA.Provider value={distribution}>{props.children}</AAA.Provider>;
}
