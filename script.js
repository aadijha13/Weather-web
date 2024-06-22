const apiKey = "a471e1f723b4f8572a00c05d7cab7d2a";
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const url = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

async function getWeatherByLocation(city) {
  try {
    const response = await fetch(url(city));
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data);

    addWeatherToPage(data);
  } catch (error) {
    console.error('There was a problem with your fetch operation:', error);
  }
}

function addWeatherToPage(data) {
  const temp = Math.round(data.main.temp);
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;

  const weather = document.createElement("div");
  weather.classList.add("weather");

  weather.innerHTML = `
    <h2><img src="https://openweathermap.org/img/wn/${
      data.weather[0].icon
    }@2x.png" /> ${temp}°C <img src="https://openweathermap.org/img/wn/${
    data.weather[0].icon
  }@2x.png" /></h2>
    <small>${data.weather[0].main}</small>
    <div class="more-info">
      <p>Humidity : <span>${humidity}%</span></p>
      <p>Wind speed : <span>${Math.round(windSpeed * 3.6)} km/h</span></p>
    </div>
  `;

  main.innerHTML = "";
  main.appendChild(weather);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = search.value.trim();
  if (city) {
    getWeatherByLocation(city);
  }
});
