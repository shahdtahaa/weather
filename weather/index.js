async function search(locationQuery) {
  let myResponse = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${locationQuery}&days=3`
  );
  if (myResponse.ok && 400 != myResponse.status) {
    let weatherData = await myResponse.json();
    displayCurrent(weatherData.location, weatherData.current),
      displayAnother(weatherData.forecast.forecastday);
  }
}

document.getElementById("search").addEventListener("keyup", (event) => {
  search(event.target.value);
});

var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function displayCurrent(location, currentWeather) {
  if (null != currentWeather) {
    var lastUpdatedDate = new Date(
      currentWeather.last_updated.replace(" ", "T")
    );
    let currentWeatherHTML = `<div class="today forecast">\n    <div class="forecast-header"  id="today">\n    <div class="day">${
      days[lastUpdatedDate.getDay()]
    }</div>\n    <div class=" date">${
      lastUpdatedDate.getDate() + monthNames[lastUpdatedDate.getMonth()]
    }</div>\n    </div>    <div class="forecast-content" id="current">\n    <div class="location">${
      location.name
    }</div>\n    <div class="degree">\n        <div class="num">${
      currentWeather.temp_c
    }<sup>o</sup>C</div>\n      \n        <div class="forecast-icon">\n            <img src="https:${
      currentWeather.condition.icon
    }" alt="" width=90>\n        </div>\t\n    \n    </div>\n    <div class="custom">${
      currentWeather.condition.text
    }</div>\n    <span><img src="images/icon-umberella.png" alt="">20%</span>\n\t\t\t\t\t\t\t\t<span><img src="images/icon-wind.png" alt="">18km/h</span>\n\t\t\t\t\t\t\t\t<span><img src="images/icon-compass.png" alt="">East</span>\n    </div>\n</div>`;
    document.getElementById("forecast").innerHTML = currentWeatherHTML;
  }
}

function displayAnother(forecastDays) {
  let forecastHTML = "";
  for (let e = 1; e < forecastDays.length; e++)
    forecastHTML += `\t<div class="forecast">\n        <div class="forecast-header">\n            <div class="day">${
      days[new Date(forecastDays[e].date.replace(" ", "T")).getDay()]
    }</div>\n        </div>       <div class="forecast-content">\n            <div class="forecast-icon">\n                <img src="https:${
      forecastDays[e].day.condition.icon
    }" alt="" width=48>\n            </div>\n            <div class="degree">${
      forecastDays[e].day.maxtemp_c
    }<sup>o</sup>C</div>\n            <small>${
      forecastDays[e].day.mintemp_c
    }<sup>o</sup></small>\n            <div class="custom">${
      forecastDays[e].day.condition.text
    }</div>\n        </div>\n        </div>`;
  document.getElementById("forecast").innerHTML += forecastHTML;
}
search("cairo");
