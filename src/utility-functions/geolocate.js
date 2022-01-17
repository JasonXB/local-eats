import { CompressOutlined } from "@mui/icons-material";

export const summation = async function () {
  //^ Find current location
  checkLocation()
  //^ Save location to the global context
  //^ Check if a saved location exists
  //^ Override it with our new location
};

export const checkLocation = async function () {
  // Make sure the visitor's browser supports Geolocation
  if (!navigator.geolocation) {
    const errorMessage = `Your browser doesn't support Geolocation, which is required for this website`;
    //! MAKE MODAL APPEAR
    alert(errorMessage);
    return;
  }
  // If geolocation is supported, find our current position and save it to Global Context
  const onSuccess = function (builtInParam) {
    const latitude= builtInParam.coords.latitude
    const longitude= builtInParam.coords.longitude
    console.log(latitude,longitude);
  };
  const onError = function (builtInParam) {
    console.error(builtInParam); //! fix
  };
  navigator.geolocation.getCurrentPosition(onSuccess, onError);
};
