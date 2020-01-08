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

    // Call and Display 5 Day Forecast
    var cityName = data.name;
    var countryCode = data.sys.country;
    var queryURL5 =
      "http://api.openweathermap.org/data/2.5/forecast?q=" +
      cityName +
      "," +
      countryCode +
      "&appid=" +
      APIKey;

    $.ajax({
      url: queryURL5,
      get: "GET"
    }).then(function(fiveDayInfo) {
      console.log(fiveDayInfo);
      // Day 1 5 Day Forecast
      $(".date-1").text(fiveDayInfo.list[0].dt_txt);
      $(".date-1-Info").append(
        "<img src= http://openweathermap.org/img/wn/" +
          fiveDayInfo.list[0].weather[0].icon +
          ".png>"
      );
      $(".date-1-Info").append(
        "<br>" +
          fiveDayInfo.list[0].weather[0].description.toUpperCase() +
          "<br>"
      );
      $(".date-1-Info").append(
        "<br/>" +
          "<p class= lead>" +
          "Temp: " +
          (Math.trunc(fiveDayInfo.list[0].main.temp - 273.15) * 1.8 + 32) +
          " \xB0 F " +
          "</p>"
      );
      $(".date-1-Info").append(
        "<p class=lead>" +
          "Humidity: " +
          fiveDayInfo.list[0].main.humidity +
          "%" +
          "</p>"
      );
      //Day 2 5 Day Forecast
      $(".date-2").text(fiveDayInfo.list[8].dt_txt);
      $(".date-2-Info").append(
        "<img src= http://openweathermap.org/img/wn/" +
          fiveDayInfo.list[1].weather[0].icon +
          ".png>"
      );
      $(".date-2-Info").append(
        "<br>" +
          fiveDayInfo.list[8].weather[0].description.toUpperCase() +
          "<br>"
      );
      $(".date-2-Info").append(
        "<br/>" +
          "<p class= lead>" +
          "Temp: " +
          (Math.trunc(fiveDayInfo.list[8].main.temp - 273.15) * 1.8 + 32) +
          " \xB0 F " +
          "</p>"
      );
      $(".date-2-Info").append(
        "<p class=lead>" +
          "Humidity: " +
          fiveDayInfo.list[8].main.humidity +
          "%" +
          "</p>"
      );
      //Day 3 5 Day Forecast
      $(".date-3").text(fiveDayInfo.list[16].dt_txt);
      $(".date-3-Info").append(
        "<img src= http://openweathermap.org/img/wn/" +
          fiveDayInfo.list[16].weather[0].icon +
          ".png>"
      );
      $(".date-3-Info").append(
        "<br>" +
          fiveDayInfo.list[16].weather[0].description.toUpperCase() +
          "<br>"
      );
      $(".date-3-Info").append(
        "<br/>" +
          "<p class= lead>" +
          "Temp: " +
          (Math.trunc(fiveDayInfo.list[16].main.temp - 273.15) * 1.8 + 32) +
          " \xB0 F " +
          "</p>"
      );
      $(".date-3-Info").append(
        "<p class=lead>" +
          "Humidity: " +
          fiveDayInfo.list[16].main.humidity +
          "%" +
          "</p>"
      );
      //Day 4 5 Day Forecast
      $(".date-4").text(fiveDayInfo.list[24].dt_txt);
      $(".date-4-Info").append(
        "<img src= http://openweathermap.org/img/wn/" +
          fiveDayInfo.list[24].weather[0].icon +
          ".png>"
      );
      $(".date-4-Info").append(
        "<br>" +
          fiveDayInfo.list[24].weather[0].description.toUpperCase() +
          "<br>"
      );
      $(".date-4-Info").append(
        "<br/>" +
          "<p class= lead>" +
          "Temp: " +
          (Math.trunc(fiveDayInfo.list[24].main.temp - 273.15) * 1.8 + 32) +
          " \xB0 F " +
          "</p>"
      );
      $(".date-4-Info").append(
        "<p class=lead>" +
          "Humidity: " +
          fiveDayInfo.list[24].main.humidity +
          "%" +
          "</p>"
      );
      //Day 5 5 Day Forecast
      $(".date-5").text(fiveDayInfo.list[32].dt_txt);
      $(".date-5-Info").append(
        "<img src= http://openweathermap.org/img/wn/" +
          fiveDayInfo.list[32].weather[0].icon +
          ".png>"
      );
      $(".date-5-Info").append(
        "<br>" +
          fiveDayInfo.list[32].weather[0].description.toUpperCase() +
          "<br>"
      );
      $(".date-5-Info").append(
        "<br/>" +
          "<p class= lead>" +
          "Temp: " +
          (Math.trunc(fiveDayInfo.list[24].main.temp - 273.15) * 1.8 + 32) +
          " \xB0 F " +
          "</p>"
      );
      $(".date-5-Info").append(
        "<p class=lead>" +
          "Humidity: " +
          fiveDayInfo.list[32].main.humidity +
          "%" +
          "</p>"
      );
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
