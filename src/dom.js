const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
});
let info = [];
async function getWeatherData(location) {
  let p1 = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=ZWK488AQ8SLJ8SMLFGQ4QKW4C`,
  );
  let p2 = await p1.json();
  return p2;
}
function editData(classname, data) {
  let element = document.querySelector(`.${classname}`);
  let elementData = element.textContent.split(":");
  if (elementData.length > 1) {
    elementData[1] = data;
    element.textContent = elementData.join(": ");
  } else {
    element.textContent = elementData[0] + `${data}`;
  }
}
function editDescription(classname, data) {
  let element = document.querySelector(`.${classname}`);
  element.textContent = "";
  element.textContent = data;
}
getWeatherData("london").then((weatherData) => {
  editData("feelslike", weatherData.days[0].feelslike);
  editData("todayshigh", weatherData.days[0].tempmax);
  editData("humidity", weatherData.days[0].humidity);
  editData("wind", weatherData.days[0].windspeed);
  editDescription("description", weatherData.days[0].description);
});
