import axios from "axios";
export const detectLocation = async function (
  renderGeoModal,
  setLocationObject,
  renderLocationDenialModal
) {
  // Check the visitor's browser supports Geolocation
  if (!navigator.geolocation) {
    renderGeoModal();
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
      console.log(apiRouteCall);
      // Extract data from the successful API call (axios auto-throws an error if it goes wrong)
      const requestData = apiRouteCall.data.requestData;
      // Save details to localStorage and project state
      localStorage.setItem("savedLocation", JSON.stringify(requestData));
      setLocationObject(requestData);
    } catch (err) {
      console.error(err);
      //% render a modal giving the user the choice to use predetermined locations
      renderLocationDenialModal();
    }
  };
  actionsAfterCoordinates(); // invoke above f() immediately
};
