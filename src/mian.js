//Api key weather

const apiKey = "bdac847987f4bc903cd4a8c68cbc7973";

// Function to save weather data to LocalStorage
function saveLocalStorge(data) {
  localStorage.setItem('clima', JSON.stringify(data));
}

// Function to get weather data from LocalStorage
function getLocalStorge() {
  const savedData = localStorage.getItem('clima');
  if (savedData) {
    return JSON.parse(savedData);
  }
  return null;
}

// Function to display weather information on the webpage
function displayWeatherData(data) {
  if (!data) {
    weatherInfo.innerHTML = `<p>No se ha encontrado información de clima</p>`;
    return;
  }

  const { name, main, weather, wind } = data;
  const description = weather[0].description;
  const temperature = main.temp;
  const humidity = main.humidity;
  const windSpeed = wind.speed;

  weatherInfo.innerHTML = ` 
    <div class= "content">
      <h2>Información de Clima de <span>${name}</span></h2>
      <p>Descripción: <span>${description}</span></p>
      <p>Temperatura: <span>${Math.floor(temperature)}</span>°C</p>
      <p>Humedad: <span>${humidity}</span></p>
      <p>Velocidad del viento: <span>${windSpeed}</span></p>
    </div>
  `;
}

// Check LocalStorage when the page loads
document.addEventListener("DOMContentLoaded", function () {
  const savedData = getLocalStorge();
  displayWeatherData(savedData);
});

// Action on click
searchBtn.addEventListener("click", function () {
  const city = cityInput.value.trim();
  if (city !== "") {
    getWeatherData(city);
  } else {
    alert("Ubica la ciudad que quieras consultar");
  }
});

// Function to call the API and update the webpage
async function getWeatherData(city) {
  try {
    const resultApi = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    if (!resultApi.ok) {
      throw new Error(`<span class="error">La cuidad que ubico no se fue encontrada</span>`);
    }
    const data = await resultApi.json();
    displayWeatherData(data);
    saveLocalStorge(data);
  } catch (error) {
    weatherInfo.innerHTML = `<p>${error.message}</p>`;
  }
}
