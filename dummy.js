const handleGetMyLocation = async () => {
  Geolocation.getCurrentPosition(
    async (position) => {
      // (position);
      console.log("MyPositionrn =>", position);
      await axios
        .get(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
        )
        .then((response) => {
          setInputValueLocation(
            response.data.address.road +
              " " +
              response.data.address.city +
              " " +
              response.data.address.state
          );
          setPincodeLoader(false);

          setInputValuePincode(response.data.address.postcode);
          // console.log("Location =>", response.data.address); // San Francisco
        })
        .catch((error) => {
          console.log(error);
        });
    },
    (error) => {
      console.log("MyPositionrn =>", error);
    }
    // { enableHighAccuracy: true, timeout: 1000, maximumAge: 1000 }
  );
};
async function requestLocationPermission() {
  setPincodeLoader(true);
  setLocationButton(false);
  console.log("Clicked");
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location Permission",
        message: "This app needs access to your location.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      handleGetMyLocation();
    } else {
      console.log("Location permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
  setLocationButton(true);
}
