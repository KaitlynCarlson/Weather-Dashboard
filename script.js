$(document).ready(function() {
  var getLocation = document.getElementById("currentLocalWeather");
  var longitude = "";
  var latitude = "";
  var APIKey = "a7a937c38812c7344cdc1be9de8b1c79";
  var queryURL = "";

  function promptLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      getLocation.innerHTML.text(
        "Geolocation is not supported by this browser."
      );
    }
  }

  function showPosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&appid=" +
      APIKey;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
    });
  }

  promptLocation();
});
