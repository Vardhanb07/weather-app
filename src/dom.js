import ClearDay from "./images/clear-day.svg";
import ClearNight from "./images/clear-night.svg";
import Cloudy from "./images/cloudy.svg";
import Fog from "./images/fog.svg";
import Hail from "./images/hail.svg";
import PartlyCloudyDay from "./images/partly-cloudy-day.svg";
import PartlyCloudyNight from "./images/partly-cloudy-night.svg";
import RainSnowShowersDay from "./images/rain-snow-showers-day.svg";
import RainSnowShowersNight from "./images/rain-snow-showers-night.svg";
import RainSnow from "./images/rain-snow.svg";
import Rain from "./images/rain.svg";
import ShowersNight from "./images/showers-night.svg";
import Sleet from "./images/sleet.svg";
import SnowShowersDay from "./images/snow-showers-day.svg";
import SnowShowersNight from "./images/snow-showers-night.svg";
import Snow from "./images/snow.svg";
import ThunderRain from "./images/thunder-rain.svg";
import ThunderShowersDay from "./images/thunder-showers-day.svg";
import ThunderShowersNight from "./images/thunder-showers-night.svg";
import Thunder from "./images/thunder.svg";
import Wind from "./images/wind.svg";
const icons = {
  "clear-day": ClearDay,
  "clear-night": ClearNight,
  cloudy: Cloudy,
  fog: Fog,
  hail: Hail,
  "partly-cloudy-day": PartlyCloudyDay,
  "partly-cloudy-night": PartlyCloudyNight,
  "rain-snow-showers-day": RainSnowShowersDay,
  "rain-snow-showers-night": RainSnowShowersNight,
  "rain-snow": RainSnow,
  rain: Rain,
  "showers-night": ShowersNight,
  sleet: Sleet,
  "snow-showers-day": SnowShowersDay,
  "snow-showers-night": SnowShowersNight,
  snow: Snow,
  "thunder-rain": ThunderRain,
  "thunder-showers-day": ThunderShowersDay,
  "thunder-showers-night": ThunderShowersNight,
  thunder: Thunder,
  wind: Wind,
};
async function getWeatherData(location) {
  let p1 = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=ZWK488AQ8SLJ8SMLFGQ4QKW4C&unitGroup=us`,
  );
  let p2 = await p1.json();
  return p2;
}
function editTempData(classname, data) {
  let element = document.querySelector(`.${classname}`);
  let elementData = element.textContent.split(":");
  element.textContent = elementData[0] + `: ${data}°F`;
}
function editHumidityData(classname, data) {
  let element = document.querySelector(`.${classname}`);
  let elementData = element.textContent.split(":");
  element.textContent = elementData[0] + `: ${data}%`;
}
function editWindData(classname, data) {
  let element = document.querySelector(`.${classname}`);
  let elementData = element.textContent.split(":");
  element.textContent = elementData[0] + `: ${data}`;
}
function editDescription(classname, data) {
  let element = document.querySelector(`.${classname}`);
  element.textContent = "";
  element.textContent = data;
}
function editIcon(classname, iconName) {
  let element = document.querySelector(`.${classname}`);
  element.src = icons[iconName];
  element.alt = "Weather-icon";
}
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let locationName = document.querySelector("#location").value;
  getWeatherData(locationName)
    .then((weatherData) => {
      editTempData("feelslike", weatherData.days[0].feelslike);
      editTempData("todayshigh", weatherData.days[0].tempmax);
      editHumidityData("humidity", weatherData.days[0].humidity);
      editWindData("wind", weatherData.days[0].windspeed);
      editDescription("description", weatherData.days[0].description);
      editIcon("icon", weatherData.days[0].icon);
      document.querySelector(".info-box").style.display = "flex";
      document.querySelector(".error-message").style.display = "none";
    })
    .catch((error) => {
      document.querySelector(".error-message").style.display = "flex";
      document.querySelector(".info-box").style.display = "none";
    });
  form.reset();
});
