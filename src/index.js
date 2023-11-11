function refreshWeather(response) {
  let currentTemperatureElement = document.querySelector("#current-temp");
  let currentTemperature = response.data.temperature.current;

  currentTemperatureElement.innerHTML = Math.round(currentTemperature);
}

function searchLocation(location) {
  let apiKey = "3bo46ec9b6bf9d00tea420a5e23db416";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${location}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let locationElement = document.querySelector("#location");
  locationElement.innerHTML = searchInput.value;
  searchLocation(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchLocation("Oxford");
