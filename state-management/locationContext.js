//  prettier-ignore
import axios from "axios";
import { homepageModalActions } from "../state-management/store/homepage/ModalVisibility";
import { useSelector, useDispatch } from "react-redux";
import { useState, createContext, useContext, useEffect, useReducer } from "react"; // prettier-ignore
import { customThemes } from "../styles/MUI_themes";

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
    snackbarOpen: false, // Bool that tells whrether a utility message should be rendered or not
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

  //@ Use redux to create dispatch functions that render modals conditionally based on state values
  const dispatch = useDispatch();
  const renderLocationDenialModal = () => dispatch(homepageModalActions.permissionsDenied()); //  prettier-ignore
  const renderGeoUnsupportedModal = () => dispatch(homepageModalActions.geolocationUnsupported()); //  prettier-ignore

  // Open and close the snackbar using dispatch functions
  const openSnackbar = () => reducerDispatch({ type: "OPEN_SNACKBAR" });
  const closeSnackbar = () => reducerDispatch({ type: "CLOSE_SNACKBAR" });

  //@ This function gets called after pressing the "Get Current Location" Button
  const detectLocationHandler = async function () {
    // Check the visitor's browser supports Geolocation
    if (!navigator.geolocation) {
      renderGeoUnsupportedModal();
      return;
    }

    // Made a promisified Geolocation API function, so we can chain actions after it with async/await
    const getPosition = function () {
      return new Promise(function (onSuccess, onReject) {
        navigator.geolocation.getCurrentPosition(onSuccess, onReject);
      });
    };
    // Use the coordinates to get the current area name via Mapquest API
    const actionsAfterCoordinates = async function () {
      try {
        const locationInfo = await getPosition();
        // API Route call (it sends a GET request to Mapquest's API to get an area name for those coords)
        const apiRouteCall = await axios.post("/api/getAreaInfo/viaLatLong", {
          // Body payload in JS form- send lat and long
          latitude: locationInfo.coords.latitude,
          longitude: locationInfo.coords.longitude,
        });
        // Extract data from the successful API call (axios auto-throws an error if it goes wrong)
        const requestData = apiRouteCall.data.requestData;
        // Save details to localStorage and project state
        localStorage.setItem("savedLocation", JSON.stringify(requestData));
        reducerDispatch({
          type: "SET_LOCATION_OBJECT",
          payload: requestData,
        });
      } catch (err) {
        console.error(err);
        //% render a modal giving the user the choice to use predetermined locations
        renderLocationDenialModal();
      }
    };
    actionsAfterCoordinates(); // invoke above f() immediately
  };

  //@ Called after submitting a predetermined location
  const predeterminedHandler = async function (areaName) {
    try {
      // API Route call (it sends a GET request to Mapquest's API to get an area name for those coords)
      const apiRouteCall = await axios.post("/api/getAreaInfo/viaAreaName", {
        areaName,
      });
      // Extract data from the successful API call (axios auto-throws an error if it goes wrong)
      const requestData = apiRouteCall.data.requestData;
      // Save details to localStorage and project state
      localStorage.setItem("savedLocation", JSON.stringify(requestData));
      reducerDispatch({ type: "SET_LOCATION_OBJECT", payload: requestData });
    } catch (err) {
      console.error(err);
      //% render a modal giving the user the choice to use predetermined locations
      renderLocationDenialModal();
    }
  };
  const checkForSavedLocation = async function () {
    // See if we have a saved location in the project state / localStorage
    const savedLocation = state.savedLocation;
    const mobileViewport = window.innerWidth < 700;
    const desktopViewport = window.innerWidth >= 700;
    //! 700px is the MUI theme breakpoint (make dynamic later)
    // IF WE HAVE NO SAVED LOCATION ...
    // On desktop screens: Scroll up to the top, render a snackbar, and open the Searchbar Menu
    if (!savedLocation && desktopViewport) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      // Open the searchbar menu after a delay (restricts scroll movement otherwise)
      setTimeout(() => {
        reducerDispatch({ type: "OPEN_SEARCHBAR_MENU" });
      }, 800); // will snap you back to orig position after submitting a location
      reducerDispatch({ type: "OPEN_SNACKBAR" });
    }
    // On mobile screens: Scroll up to the top, render a snackbar
    if (!savedLocation && mobileViewport) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      reducerDispatch({ type: "OPEN_SNACKBAR" });
    }
    // IF WE HAVE A SAVED LOCATION
    else {
      //! Do the cools tuff
    }
  };

  //! Delete once development ends (and anywhere we use it)
  //  prettier-ignore
  const devButton = <button onClick={()=>{
      reducerDispatch({ type: "SET_LOCATION_OBJECT", payload: null });
    localStorage.removeItem("savedLocation");
  }}>Delete saved location </button>

  // ——————————————————  GATHER EVERYTHING YOU WANT TO DISTRIBUTE   ————————————————————————————————————
  const locationRelated = {
    // State object containing details of our Saved Location in LocalStorage
    locationObject: state.savedLocation,
    detectLocationHandler, // handler for buttons that trigger geolocation tracking
    predeterminedHandler, // handler for buttons that choose a predetermined location

    devButton, //! for development only
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
