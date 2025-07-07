const apiKey = 'Your_API_Key_Here'; // 🔁 Paste your api key here 

function getWeather() {
  const city = document.getElementById('city-input').value.trim();
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(data => {
      const weatherDiv = document.getElementById('weather-data');
      weatherDiv.innerHTML = `
        <p><strong>City:</strong> ${data.name}</p>
        <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
        <p><strong>Weather:</strong> ${data.weather[0].description}</p>
      `;
    })
    .catch(error => {
      document.getElementById('weather-data').innerHTML = '❌ Error: ' + error.message;
    });
}
