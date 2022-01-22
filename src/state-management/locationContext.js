//  prettier-ignore
import axios from "axios";
import { useState, createContext, useContext, useEffect } from "react"; // import useContext
const AAA = createContext();
export const useLocationContext = () => useContext(AAA); // export custom hook

export default function LocationContextProvider(props) {
  // This state variable holds objects filled with location data per each user (saved in LocalStorage)
  const [locationObj, setLocationObj] = useState(null);
  useEffect(() => {
    // On startup, check LocalStorage for any saved location objects.'
    if (!locationObj) return;
    else setLocationObj(JSON.parse(localStorage.getItem("savedLocation")));
  }, []); // we set the state variable equal to our findings, or null if none exist

  // Use this state variable to decide when an error modal should be visible
  const [modalVisible, setModalVisible] = useState(false); // when equal to false, its hidden
  // renders custom-components/ErrorModals/GeoUnsupported.js
  const showModal1 = () => {
    setModalVisible("case1");
  };
  // renders custom-components/ErrorModals/LocationDenial.js
  const showModal2 = () => {
    setModalVisible("case2");
  };
  const hideModal = () => setModalVisible(false); // hides modal, regardless of which
  // modal1 : Used for when geolocation is not supported by the browser
  // modal2: Used for when the user explicitly declines location permisssions

  // Use this function to save an object to localStorage and locationObj states
  const saveNewLocationObj = function (inputObj) {
    //  prettier-ignore
    // Check to see if the object you submit has all required keys
    const requiredKeys = ["locationString", "city", "countryCode", "latitude", "longitude"]
    const arr = [];
    requiredKeys.forEach((key) => {
      if (inputObj.hasOwnProperty(key)) arr.push(true);
      else arr.push(false);
    });
    if (arr.includes(false)) return alert("insufficient keys"); // may leave permanently
    // Save them to state and localStorage if they have all required keys
    setLocationObj(inputObj);
    localStotage.setItem("savedLocation", JSON.stringify(inputObj));
  };

  //^ Use this function to get your current location
  const detectLocation = async function (findNew) {
    // Check the visitor's browser supports Geolocation
    if (!navigator.geolocation) {
      showModal1(); // renders a modal telling users their browser is incompatible, and gives alt options
      return;
    }

    // Made a promisified Geolocation API function, so we can chain actions after it with then()
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
        const apiRouteCall = await axios.post("/api/getAreaName", {
          // Body payload in JS form- send lat and long
          latitude: locationInfo.coords.latitude,
          longitude: locationInfo.coords.longitude,
        });
        // Extract data from the successful API call (axios auto-throws an error if it goes wrong)
        const requestData = apiRouteCall.data.requestData;
        // Save details to localStorage and project state
        localStorage.setItem("savedLocation", JSON.stringify(requestData));
        setLocationObj(requestData);
      } catch (err) {
        showModal2();
      }
    };
    actionsAfterCoordinates();
  };

  //! Delete once development ends (and anywhere we use it)
  //  prettier-ignore
  const devButton = <button onClick={()=>{
    setLocationObj(null);
    localStorage.removeItem("savedLocation");
  }}>Delete saved location </button>

  // ——————————————————  GATHER EVERYTHING YOU WANT TO DISTRIBUTE   ————————————————————————————————————
  const locationRelated = {
    detectLocation, // use as a handler for buttons that trigger geolocation tracking
    locationObj, // use to check what our current location is (Saved to state and localStorage)
    // setLocationObj, // use for the GetLocation utility function only!
    devButton, //! for development only
    saveNewLocationObj, // use to save locationObjects, specifically when we use the Countries Selector
  };
  const modalRelated = { modalVisible, hideModal, showModal1, showModal2 };
  const distribution = { ...locationRelated, ...modalRelated };
  return <AAA.Provider value={distribution}>{props.children}</AAA.Provider>;
}
