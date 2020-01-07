$(document).ready(function() {
  var getLocation = document.getElementById("currentLocalWeather");
  var longitude = "";
  var latitude = "";
  var APIKey = "a7a937c38812c7344cdc1be9de8b1c79";

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
      //   console.log(response);
      var currentLocationCity = $("<p>");
      var currentLocationTemperature = $("<p>");
      var currentLocationHumidity = $("<p>");
      var currentLocationIcon = $(
        "<img src= http://openweathermap.org/img/wn/" +
          response.weather[0].icon +
          ".png>"
      );
      var currentLocationDescription = $("<p>");

      //Display current location city
      $(currentLocationCity).text(response.name);
      $(currentLocationCity).addClass("lead");
      $("#currentLocalWeather").append(currentLocationCity);

      // Display description icon
      $(currentLocationCity).append(currentLocationIcon);

      // Display description text
      $(currentLocationDescription).text(
        response.weather[0].description.toUpperCase()
      );
      $(currentLocationDescription).addClass("lead");
      $("#currentLocalWeather").append(currentLocationDescription);

      //Display current location temperature
      $(currentLocationTemperature)
        .addClass("lead")
        .text(
          "Temp: " +
            (Math.trunc(response.main.temp - 273.15) * 1.8 + 32) +
            " \xB0 F"
        );
      //   $(currentLocatiionTemperature).addClass("lead");
      $("#currentLocalWeather").append(currentLocationTemperature);

      // Display current location humidity
      $(currentLocationHumidity)
        .addClass("lead")
        .text("Humidity: " + response.main.humidity + "%");

      $("#currentLocalWeather").append(currentLocationHumidity);
      //
      var queryURL2 =
        "http://api.openweathermap.org/data/2.5/uvi/forecast?lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&appid=" +
        APIKey;
      var currentLocationUVIndex = $("<p>");

      $.ajax({
        url: queryURL2,
        method: "GET"
      }).then(function(response) {
        $(currentLocationUVIndex).text("UV Index: " + response[0].value);
        $(currentLocationUVIndex).addClass("lead");
        $("#currentLocalWeather").append(currentLocationUVIndex);
      });
    });
  }

  promptLocation();
});
