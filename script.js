const apiKey = ""; // Your API key if used later 

function getWeather() {
  const city = document.getElementById('city-input').value.trim();
  if (!city) return;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(data => {
      document.getElementById('weather-data').innerHTML = `
            <p><strong>City:</strong> ${data.name}</p>
            <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
            <p><strong>Weather:</strong> ${data.weather[0].description}</p>
          `;
    })
    .catch(err => {
      document.getElementById('weather-data').innerHTML = `❌ ${err.message}`;
    });
}

const input = document.getElementById("city-input");
const suggestionBox = document.getElementById("suggestions");

input.addEventListener("input", () => {
  const val = input.value.toLowerCase();
  suggestionBox.innerHTML = '';

  if (!val) return;

  const filtered = cityList.filter(city => city.toLowerCase().startsWith(val)).slice(0, 5);
  filtered.forEach(city => {
    const li = document.createElement("li");
    li.textContent = city;
    li.onclick = () => {
      input.value = city;
      suggestionBox.innerHTML = '';
      getWeather();
    };
    suggestionBox.appendChild(li);
  });
});

input.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    getWeather();
    suggestionBox.innerHTML = '';
  }
});