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
    setLocationObj(JSON.parse(localStorage.getItem("savedLocation")));
  }, []);

  //^ Use this function to get your current location
  const detectLocation = async function (findNew) {
    // Check the visitor's browser supports Geolocation
    if (!navigator.geolocation) {
      alert(
        "A required API is not supported by your browser. Please download a modern one in order to use this site"
      );
      //! create a no-support error screen or modal
      return;
    }
    //^ Check if the user already has a saved location (if so, cut this off)
    // We can still use this FN to re-geolocate, if this FN recieves a parameter
    if (locationObj && !findNew) return;

    // Made a promisified Geolocation API function, so we can chain actions after it with then()
    const getPosition = function () {
      return new Promise(function (onSuccess, onReject) {
        navigator.geolocation.getCurrentPosition(onSuccess, onReject);
      });
    };
    //~ Feel free to code any actions requiring coordinates here (1 of 2)
    // Use the coordinates to get the current area name via Mapquest API
    getPosition()
      .then((pos) => {
        // Organize request body data
        const latitude = pos.coords.latitude;
        const longitude = pos.coords.longitude;
        // Make an API Route call that sends a GET request to mapquest.js
        return fetch("/api/mapquest", {
          method: "POST",
          body: JSON.stringify({ latitude, longitude }),
          headers: { "Content-Type": "application/json" },
        });
      })
      .then((res) => res.json())
      .then((r) => {
        // Extract data from the successful API call
        const requestData = r.requestData;
        // Save details to localStorage and project state
        localStorage.setItem("savedLocation", JSON.stringify(requestData));
        // Save it to the current project's state
        setLocationObj(requestData);
      })
      .catch((error) => {
        alert("Geolocation denied, or something went wrong in this chain");
        //! create modal for failed Mapquest
        // revealModal();
      });
  };
  //! Delete once development ends (and anywhere we use it)
  //  prettier-ignore
  const devButton = <button onClick={()=>{
    setLocationObj(null);
    localStorage.removeItem("savedLocation");
  }}>Delete saved location </button>
  //! keep this
  const clearSavedLocationData = function () {
    setLocationObj(null);
    localStorage.removeItem("savedLocation");
  };
  // ——————————————————————————————————————————————————————
  const locationRelated = {
    detectLocation,
    locationObj,
    devButton,
    clearSavedLocationData,
  };
  const modalRelated = { showModal, revealModal, hideModal };
  const distribution = { ...locationRelated, ...modalRelated };
  return <AAA.Provider value={distribution}>{props.children}</AAA.Provider>;
}


