import axios from "axios";

export const pickPredetermined = async function (
  areaName,
  setLocationObject,
  renderLocationDenialModal
) {
  try {
    // API Route call (it sends a GET request to Mapquest's API to get an area name for those coords)
    const apiRouteCall = await axios.post("/api/getAreaInfo/viaAreaName", {
      areaName,
    });
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
