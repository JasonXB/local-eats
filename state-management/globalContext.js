import { useState, createContext, useContext, useEffect, useReducer } from "react"; // prettier-ignore
const AAA = createContext();
export const useGlobalContext = () => useContext(AAA); // export custom hook

function reducer(state, action) {
  switch (action.type) {
    case "SIGN_IN":
      return { ...state, signedIn: true };
    case "SIGN_OUT":
      return { ...state, signedIn: false };
    case "CHANGE_THEME_STRING":
      return { ...state, themeString: action.payload };
    default:
      return state;
  }
}

export default function GlobalContextAPIProvider(props) {
  const [state, dispatch] = useReducer(reducer, {
    signedIn: false, // stays false by default until you log in
    themeString: null, // null, "light", or "dark"
    authObject: null, // upon login, this'll contain idTokens, email, refreshToken ...etc
  });

  // These functions sign us in/out unofficially (they affect project state, but not our actual Auth state)
  // Will be used alongside the actual Sign In / Sign Out processes (Firebase Auth methods)
  const signInProject = () => dispatch({ type: "SIGN_IN" });
  const signOutProject = () => dispatch({ type: "SIGN_OUT" });
  const changeThemeString = (inp) => dispatch({ type: "CHANGE_THEME_STRING", payload: inp }); // prettier-ignore

  useEffect(() => {
    // Check local storage for any pre-selected theme from the user
    changeThemeString(localStorage.getItem("preselectedTheme")); // can = null
  }, []);

  // DISTRIBUTION
  const themeRelated = { themeString: state.themeString, changeThemeString };
  const authRelated = { currentlyOnline: state.signedIn, signInProject, signOutProject };
  const distribution = { ...themeRelated, ...authRelated };
  return <AAA.Provider value={distribution}>{props.children}</AAA.Provider>;
}


