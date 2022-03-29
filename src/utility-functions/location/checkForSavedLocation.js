import { breakpointValues } from "../../../styles/MUI_themes";

// This utility function uses dispatch functions and state values from locationContext.js
export const checkForSaved = function (
  savedLocation,
  openSearchbarMenu,
  openSnackbar
) {
  // See if we have a saved location in the project state / localStorage
  const mobileViewport = window.innerWidth < breakpointValues.sm;
  const desktopViewport = window.innerWidth >= breakpointValues.sm;
  // IF WE HAVE NO SAVED LOCATION ...
  // On desktop screens: Scroll up to the top, render a snackbar, and open the Searchbar Menu
  if (!savedLocation && desktopViewport) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    // Open the searchbar menu after a delay (restricts scroll movement otherwise)
    // setTimeout(() => {
    //   openSearchbarMenu();
    // }, 800); // will snap you back to orig position after submitting a location
    openSnackbar();
    return;
  }
  // On mobile screens: Scroll up to the top, render a snackbar
  else if (!savedLocation && mobileViewport) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    openSnackbar();
    return;
  }
  // If we do have a saved location, return true
  // A f() in locationContext will then nav us to a new page
  return true;
};
