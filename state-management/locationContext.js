//  prettier-ignore
import axios from "axios";
import { homepageModalActions } from "../state-management/store/homepage/ModalVisibility";
import { useSelector, useDispatch } from "react-redux";
import { useState, createContext, useContext, useEffect } from "react"; // import useContext
const AAA = createContext();
export const useLocationContext = () => useContext(AAA); // export custom hook

export default function LocationContextProvider(props) {
  //@ This state variable holds objects filled with location data per each user (saved in LocalStorage)
  // On startup, check LocalStorage for any saved location objects
  const [locationObj, setLocationObj] = useState(null);
  useEffect(() => {
    if (!localStorage.getItem("savedLocation")) return;
    else setLocationObj(JSON.parse(localStorage.getItem("savedLocation")));
  }, []); // we set the state variable equal to our findings, or null if none exist

  //@ Use redux to create dispatch functions that render modals conditionally based on state values
  const dispatch = useDispatch();
  const renderLocationDenialModal = () => dispatch(homepageModalActions.permissionsDenied()); //  prettier-ignore
  const renderGeoUnsupportedModal = () => dispatch(homepageModalActions.geolocationUnsupported()); //  prettier-ignore

  //@ Use this function to manually save an object to localStorage and locationObj states
  const createLocationManually = function (inputObj) {
    // Check to see if the object you submit has all required keys
    // const requiredKeys = ["locationString", "city", "country","apiString","stateProvinceCode", "latitude", "longitude"] //  prettier-ignore
    // const arr = [];
    // requiredKeys.forEach((key) => {
    //   if (inputObj.hasOwnProperty(key)) arr.push(true);
    //   else arr.push(false);
    // });
    if (arr.includes(false)) return alert("invalid keys"); // will leave up permanently
    // Save them to project state and localStorage if they have all required keys
    setLocationObj(inputObj);
    localStorage.setItem("savedLocation", JSON.stringify(inputObj));
  };

  //@ This function gets called after pressing the "Get Current Location" Button
  const detectLocationHandler = async function (findNew) {
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
        setLocationObj(requestData);
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
      setLocationObj(requestData);
    } catch (err) {
      console.error(err);
      //% render a modal giving the user the choice to use predetermined locations
      renderLocationDenialModal();
    }
  };

  //! Delete once development ends (and anywhere we use it)
  //  prettier-ignore
  const devButton = <button onClick={()=>{
    setLocationObj(null);
    localStorage.removeItem("savedLocation");
  }}>Delete saved location </button>

  // ——————————————————  GATHER EVERYTHING YOU WANT TO DISTRIBUTE   ————————————————————————————————————
  const locationRelated = {
    detectLocationHandler, // use as a handler for buttons that trigger geolocation tracking
    predeterminedHandler,
    locationObj, // use to check what our current location is (Saved to state and localStorage)
    // setLocationObj, // use for the GeoLocation utility function only!
    devButton, //! for development only
    createLocationManually, // use to save locationObjects, specifically when we use the Countries Selector
  };
  const distribution = { ...locationRelated };
  return <AAA.Provider value={distribution}>{props.children}</AAA.Provider>;
}
