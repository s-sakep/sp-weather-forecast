function refreshWeather(response) {
  let currentTemperatureElement = document.querySelector("#current-temp");
  let currentTemperature = response.data.temperature.current;
  let locationElement = document.querySelector("#location");

  let descriptionElement = document.querySelector("#current-conditions");
  let humidityElement = document.querySelector("#current-humidity");
  let currentWindElement = document.querySelector("#current-wind");
  let windSpeed = response.data.wind.speed;
  let feelsLikeElement = document.querySelector("#feels-like");
  let todayDateTimeElement = document.querySelector("#today-date-time");
  let now = new Date();
  let todayIconElement = document.querySelector("#today-icon");

  console.log(response.data);

  currentTemperatureElement.innerHTML = `${Math.round(currentTemperature)}°`;
  locationElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  currentWindElement.innerHTML = getImperialSpeed(windSpeed);
  feelsLikeElement.innerHTML = Math.round(response.data.temperature.feels_like);
  todayDateTimeElement.innerHTML = formatDateTime(now);
  todayIconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="today-icon" />`;
}

function getImperialSpeed(metricWindSpeed) {
  console.log(metricWindSpeed);
  let imperialWindSpeed = Math.round(metricWindSpeed * 2.237);
  return `${imperialWindSpeed}`;
}

function formatDateTime(now) {
  let date = now.getDate();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let year = now.getFullYear();

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

  let months = [
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
  let month = months[now.getMonth()];

  return `${day} ${date} ${month} ${year} | ${hours}:${minutes}`;
}

function searchLocation(location) {
  let apiKey = "3bo46ec9b6bf9d00tea420a5e23db416";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${location}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchLocation(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchLocation("Oxford");

function displayForecast() {
  let forecastElement = document.querySelector("#five-day-forecast");

  let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
  <div>
    <p>${day}</p>
    <i class="fa-solid fa-cloud-showers-heavy five-icon"></i>
    <p>
      <span class="five-day-high">19°</span> | 9°
    </p>
  </div>
`;
  });

  forecastElement.innerHTML = forecastHtml;
}

displayForecast();
