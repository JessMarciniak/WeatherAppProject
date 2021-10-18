let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let currentTimestamp = `${day} ${hours}:${minutes}`;
console.log(currentTimestamp);
let date = document.querySelector("#current-date");
date.innerHTML = `${currentTimestamp}`;

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  console.log(temperature);
  let localTemp = document.querySelector("#current-temp");
  localTemp.innerHTML = temperature;
  let updateLocation = document.querySelector("#city");
  updateLocation.innerHTML = response.data.name;
}

function cityUpdate(event) {
  event.preventDefault();
  let searchEntry = document.querySelector("#city-search");
  console.log(searchEntry.value);
  let cityName = document.querySelector("#city");
  cityName.innerHTML = `${searchEntry.value}`;
  let city = searchEntry.value;
  let units = "metric";
  let apiKey = "fb57d65c8433d702c30132cfdf5708ba";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

let searchBar = document.querySelector("#search-bar");
searchBar.addEventListener("submit", cityUpdate);

function showPosition(position) {
  console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "fb57d65c8433d702c30132cfdf5708ba";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButton = document.querySelector("#current-location-button");
currentButton.addEventListener("click", currentLocation);

function chooseCelsius(event) {
  event.preventDefault();
  let mainTemp = document.querySelector("#current-temp");
  mainTemp.innerHTML = "22°";
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", chooseCelsius);

function chooseFahrenheit(event) {
  event.preventDefault();
  let mainTemp = document.querySelector("#current-temp");
  mainTemp.innerHTML = "68°";
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", chooseFahrenheit);
