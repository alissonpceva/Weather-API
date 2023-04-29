const apiKey = 'c468a7fbaaf50d235c9170f427ec8ea1'; 
const apiUrl = 'https://api.openweathermap.org/data/2.5'; // OpenWeatherMap API URL

// DOM elements
const searchBox = document.querySelector('.textVal');
const searchBtn = document.querySelector('.search');
const resultDiv = document.querySelector('.result');
const forecastDiv = document.querySelector('.five-day-Forecast');
const historyDiv = document.querySelector('.history');

// Search history array
let searchHistory = [];

// Function to get weather data from API
async function getWeatherData(cityName) {
  const url = `${apiUrl}/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// Function to get forecast data from API
async function getForecastData(cityName) {
  const url = `${apiUrl}/forecast?q=${cityName}&appid=${apiKey}&units=imperial`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// Function to render result card
function renderResultCard(data) {
  const card = `
    <div class="card">
      <div class="card-header">
        <h2>${data.name}</h2>
        <p>${new Date().toLocaleDateString()}</p>
      </div>
      <div class="card-body">
        <p>Temperature: ${data.main.temp} &#8457;</p>
        <p>Wind Speed: ${data.wind.speed} MPH</p>
        <p>Humidity: ${data.main.humidity}%</p>
      </div>
    </div>
  `;
  resultDiv.innerHTML = card;
}

// Function to render forecast cards
function renderForecastCards(data) {
  const cards = data.list.slice(0, 5).map(item => `
    <div class="card">
      <div class="card-header">
        <h2>${new Date(item.dt * 1000).toLocaleDateString()}</h2>
      </div>
      <div class="card-body">
        <p>Temperature: ${item.main.temp} &#8457;</p>
        <p>Wind Speed: ${item.wind.speed} MPH</p>
        <p>Humidity: ${item.main.humidity}%</p>
      </div>
    </div>
  `).join('');
  forecastDiv.innerHTML = cards;
}

// Function to render search history tags
function renderSearchHistory() {
  const tags = searchHistory.map(item => `
    <span class="badge badge-secondary">${item}</span>
  `).join('');
  historyDiv.innerHTML = tags;
}

// Event listener for search button
searchBtn.addEventListener('click', async () => {
  const cityName = searchBox.value.trim();
  if (!cityName) return;

  // Get weather and forecast data
  const weatherData = await getWeatherData(cityName);
  const forecastData = await getForecastData(cityName);

  // Render result card and forecast cards
  renderResultCard(weatherData);
  renderForecastCards(forecastData);

  // Update search history
  if (!searchHistory.includes(cityName)) {
    searchHistory.push(cityName);
    renderSearchHistory();
  }
});
