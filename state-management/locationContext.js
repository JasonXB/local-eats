import { homepageModalActions } from "../state-management/store/homepage/ModalVisibility";
// Import utility functions we'll be destributing throughout our project
import { detectLocation } from "../src/utility-functions/location/detectLocation";
import { pickPredetermined } from "../src/utility-functions/location/pickPredetermined";
import { checkForSaved } from "../src/utility-functions/location/checkForSavedLocation";
import { useDispatch } from "react-redux";
import { createContext, useContext, useEffect, useReducer } from "react"; // prettier-ignore

const AAA = createContext();
export const useLocationContext = () => useContext(AAA); // export custom hook

function reducer(state, action) {
  switch (action.type) {
    case "SET_LOCATION_OBJECT":
      return { ...state, savedLocation: action.payload };
    case "OPEN_SEARCHBAR_MENU":
      return { ...state, searchbarMenuOpen: true };
    case "CLOSE_SEARCHBAR_MENU":
      return { ...state, searchbarMenuOpen: false };
    case "OPEN_SNACKBAR":
      return { ...state, snackbarOpen: true };
    case "CLOSE_SNACKBAR":
      return { ...state, snackbarOpen: false };
    default:
      return state;
  }
}
export default function LocationContextProvider(props) {
  const [state, reducerDispatch] = useReducer(reducer, {
    savedLocation: null, // will contain saved location data from LocalStorage
    searchbarMenuOpen: false, // Bool that dictates whether have the searchbar menu in desktop open/closed
    snackbarOpen: false, // Bool that tells whether a utility message should be rendered or not
  });
  // On startup, check LocalStorage for any saved location objects
  useEffect(() => {
    if (!localStorage.getItem("savedLocation")) return;
    else {
      reducerDispatch({
        type: "SET_LOCATION_OBJECT",
        payload: JSON.parse(localStorage.getItem("savedLocation")),
      });
    }
  }, []); // we set the state variable equal to our findings, or null if none exist

  //@ Render modals conditionally based on Redux state values
  const dispatch = useDispatch();
  const renderLocationDenialModal = () => dispatch(homepageModalActions.permissionsDenied()); //  prettier-ignore
  const renderGeoUnsupportedModal = () => dispatch(homepageModalActions.geolocationUnsupported()); //  prettier-ignore

  const setLocationObject = (requestData) =>
    reducerDispatch({
      type: "SET_LOCATION_OBJECT",
      payload: requestData,
    });

  //@ This function gets called after pressing the "Get Current Location" Button
  const detectLocationHandler = async function () {
    detectLocation(renderGeoUnsupportedModal, setLocationObject, renderLocationDenialModal); // prettier-ignore
  };

  //@ Called after submitting a predetermined location
  const predeterminedHandler = async function (areaName) {
    pickPredetermined(areaName, setLocationObject, renderLocationDenialModal); // prettier-ignore
  };

  //@ Use to check if we have a saved location in our project state / localStorage
  const checkForSavedLocation = async function () {
    const redirectAuthorized = checkForSaved(
      state.savedLocation,
      () => reducerDispatch({ type: "OPEN_SEARCHBAR_MENU" }),
      () => reducerDispatch({ type: "OPEN_SNACKBAR" })
    );
    if (redirectAuthorized) return true;
    else return false; // the checkForSaved function already renders user feedback when we have no location saved
  };

  // ——————————————————  GATHER EVERYTHING YOU WANT TO DISTRIBUTE   ————————————————————————————————————
  const locationRelated = {
    // State object containing details of our Saved Location in LocalStorage
    locationObject: state.savedLocation,
    setLocationObject, // saves a location object to the project state (still requires you to save to LocalStorage manually)
    detectLocationHandler, // handler for buttons that trigger geolocation tracking
    predeterminedHandler, // handler for buttons that choose a predetermined location
  };
  const searchbarRelated = {
    // Dispatch functions that open + close the searchbar drop down menu on desktop viewports
    searchbarMenuOpen: state.searchbarMenuOpen, // Boolean that tells us if the searchbar menu's open or not
    openSearchbarMenu: () => reducerDispatch({ type: "OPEN_SEARCHBAR_MENU" }), // opens it
    closeSearchbarMenu: () => reducerDispatch({ type: "CLOSE_SEARCHBAR_MENU" }), // closes it
    // Open and Close the snackbar
    snackbarOpen: state.snackbarOpen,
    openSnackbar: () => reducerDispatch({ type: "OPEN_SNACKBAR" }),
    closeSnackbar: () => reducerDispatch({ type: "CLOSE_SNACKBAR" }),
    // Checks if we have a saved location in LocalStorage/project state
    checkForSavedLocation,
  };
  const distribution = { ...locationRelated, ...searchbarRelated };
  return <AAA.Provider value={distribution}>{props.children}</AAA.Provider>;
}
