import { useState, createContext, useContext, useEffect, useReducer } from "react"; // prettier-ignore
const AAA = createContext();
export const useGlobalContext = () => useContext(AAA); // export custom hook

function reducer(state, action) {
  switch (action.type) {
    case "CHANGE_THEME_STRING":
      return { ...state, themeString: action.payload };
    default:
      return state;
  }
}

export default function GlobalContextAPIProvider(props) {
  const [state, dispatch] = useReducer(reducer, {
    themeString: null, // null, "light", or "dark"
  });

  // Change what theme should be used
  const changeThemeString = (inp) => dispatch({ type: "CHANGE_THEME_STRING", payload: inp }); // prettier-ignore

  // Save a hashed PIN with an exp date to help verify a submitted email belongs to the user
  const pendingEmailHandler = (inp1, inp2, inp3, inp4) => {
    localStorage.setItem(
      "pendingEmailData",
      JSON.stringify({
        hashedPIN: inp1,
        expiryDatePIN: inp2,
        pendingEmail: inp3,
        password: inp4,
      })
    );
  };

  useEffect(() => {
    // Check local storage for any pre-selected theme from the user
    changeThemeString(localStorage.getItem("preselectedTheme")); // can = null
  }, []);

  // DISTRIBUTION
  const themeRelated = { themeString: state.themeString, changeThemeString };
  const authRelated = {
    expiryDatePIN: state.expiryDatePIN,
    hashedPIN: state.hashedPIN,
    pendingEmail: state.pendingEmail,
    password: state.password,
    pendingEmailHandler,
  };
  const distribution = { ...themeRelated, ...authRelated };
  return <AAA.Provider value={distribution}>{props.children}</AAA.Provider>;
}
