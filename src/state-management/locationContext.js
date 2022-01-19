//  prettier-ignore
import { useState, createContext, useContext, useEffect } from "react"; // import useContext
const AAA = createContext();
export const useLocationContext = () => useContext(AAA); // export custom hook

export default function LocationContextProvider(props) {
  const [locationObj, setLocationObj] = useState(null);
  //^ Use this state variable to decide when an error modal should be visible
  // It's used for when geolocation doesn't work properly, or is denied permissions
  const [showModal, setShowModal] = useState(false); // showModal - the deciding factor
  const revealModal = () => setShowModal(true); // use to show modal
  const hideModal = () => setShowModal(false); // use to hide it

  // On startup, check LocalStorage for any saved location objects
  // If one exists, set the state variable equal to it
  useEffect(() => {
    const stringObject = localStorage.getItem("savedLocation");
    setLocationObj(JSON.parse(stringObject));
  }, []);

  //^ Use this function to get your current location
  const detectLocation = async function () {
    // Check the visitor's browser supports Geolocation
    if (!navigator.geolocation) {
      revealModal(); // if it doesn't, show the error Modal
      return;
    }
    // If geolocation returns an error, render the error modal
    const onError = function (builtInParam) {
      revealModal();
    };
    // If geolocation is supported, find our current position and save it to Global Context
    const onSuccess = async function (builtInParam) {
      try {
        // Extract lat and loongitude from Geolocation API
        const latitude = await builtInParam.coords.latitude;
        const longitude = await builtInParam.coords.longitude;
        console.log("L3", latitude, longitude);
        // Request API route that will give us the location name for the coordinates we supply
        //! error thrown in this API call
        const apiRouteResponse = await fetch("/api/mapquest", {
          method: "GET",
          body: JSON.stringify({ latitude, longitude }),
          headers: { "Content-Type": "application/json" },
        });
        //! does not make it out
        console.log("successful API route call")
        console.log(apiRouteResponse); //! log for now
        // Replace the previous location in Local Storage, and update the state here
        // localStorage.setItem("savedLocation", JSON.stringify(locationObj));
        // setLocationObj(locationObj);
      } catch (err) {
        revealModal(); // Render the location error modal
      }
    };
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  };

  // ——————————————————————————————————————————————————————
  const locationRelated = { detectLocation, locationObj };
  const modalRelated = { showModal, revealModal, hideModal };
  const distribution = { ...locationRelated, ...modalRelated };
  return <AAA.Provider value={distribution}>{props.children}</AAA.Provider>;
}
