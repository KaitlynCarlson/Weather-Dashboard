$(document).ready(function() {
  var getLocation = document.getElementById("currentLocalWeather");
  var longitude = "";
  var latitude = "";
  var APIKey = "a7a937c38812c7344cdc1be9de8b1c79";

  function promptLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
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
      // Display UV Index
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
$(".cityInputButton").on("click", function(event) {
  event.preventDefault();

  var citySearchInput = $(".cityInput").val();
  console.log(citySearchInput);
  var APIKey = "a7a937c38812c7344cdc1be9de8b1c79";
  var queryURL3 =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    citySearchInput +
    "&appid=" +
    APIKey;
  $.ajax({
    url: queryURL3,
    method: "GET"
  }).then(function(data) {
    console.log(data);
    // City Search Name, Date, Icon
    var searchedCityDate = $("<h2>");
    $(searchedCityDate).text(moment().format("MM/DD/YY"));

    var searchedCityIcon = $(
      "<img src= http://openweathermap.org/img/wn/" +
        data.weather[0].icon +
        ".png>"
    );
    $("#searchedCityDateIconDisplay").append(
      citySearchInput + " " + searchedCityDate.text()
    );
    $("#searchedCityDateIconDisplay")
      .attr("display", "flex", "justify-content", "space-between")
      .append(searchedCityIcon);

    //City Search Current Description Display
    var searchedDescription = $("<p>");
    searchedDescription.text(data.weather[0].description.toUpperCase());
    $("#searchedDescription").prepend(searchedDescription);

    // City Search Current Temperature Display
    var searchedTemperature = Math.trunc(data.main.temp - 273.15) * 1.8 + 32;
    $("#searchedTemperature").append(" " + searchedTemperature + " \xB0 F");

    // City Search Current Humidity Display
    var searchedCurrentHumidity = " " + data.main.humidity + " %";
    $("#searchedHumidity").append(searchedCurrentHumidity);

    // City Search Current Wind Speed Display
    var searchedCurrentWindSpeed = data.wind.speed + " mph";
    $("#searchedWindSpeed").append(" " + searchedCurrentWindSpeed);

    var long = data.coord.lon;
    var lat = data.coord.lat;
    var queryURL4 =
      "http://api.openweathermap.org/data/2.5/uvi/forecast?lat=" +
      lat +
      "&lon=" +
      long +
      "&appid=" +
      APIKey;

    $.ajax({
      url: queryURL4,
      method: "GET"
    }).then(function(info) {
      $("#searchedUVIndex").append(" " + info[0].value);
    });
  });
  var searchHistory = [];
  searchHistory.push(citySearchInput);
  for (var i = 0; i < searchHistory.length; ++i) {
    var cityHistoryButton = $("<button>");
    cityHistoryButton.text(searchHistory[i]);
    cityHistoryButton.addClass("btn btn-secondary btn-lg");
    $(cityHistoryButton).css("margin", "1%");
    cityHistoryButton.attr("city-name", searchHistory[i]);
    $("#searchHistory").prepend(cityHistoryButton);
  }
});
