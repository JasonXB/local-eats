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
      reducerDispatch({ type: "OPEN_SEARCHBAR_MENU" }); //!
    }, 800); // will snap you back to orig position after submitting a location
    reducerDispatch({ type: "OPEN_SNACKBAR" }); //!
  }
  // On mobile screens: Scroll up to the top, render a snackbar
  if (!savedLocation && mobileViewport) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    reducerDispatch({ type: "OPEN_SNACKBAR" }); //!
  }
  // IF WE HAVE A SAVED LOCATION
  else {
    //! Do the cool stuff
  }
};
