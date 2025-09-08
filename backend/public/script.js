// Fetch weather via backend proxy
function getWeather() {
  const city = document.getElementById('city-input').value.trim();
  if (!city) return;
  fetch(`/weather?city=${city}`)
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
// Autocomplete with Indian cities
const input = document.getElementById("city-input");
const suggestionBox = document.getElementById("suggestions");
let cities = [];
fetch("cities.json")
  .then(res => res.json())
  .then(data => { 
    cities = data; 
    console.log("Loaded cities:", cities.length); 
  })
  .catch(err => console.error("Failed to load cities:", err));
input.addEventListener("input", () => {
  const val = input.value.toLowerCase();
  suggestionBox.innerHTML = '';
  if (!val) return;
  const filtered = cities.filter(c => c.name.toLowerCase().startsWith(val)).slice(0, 10);
  if (filtered.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No result found";
    suggestionBox.appendChild(li);
    return;
  }
  filtered.forEach((cityObj, idx) => {
    const li = document.createElement("li");
    li.textContent = `${cityObj.name}, ${cityObj.state}`;
    li.setAttribute('data-idx', idx);
    li.onclick = () => {
      input.value = cityObj.name;
      suggestionBox.innerHTML = '';
      getWeather();
    };
    suggestionBox.appendChild(li);
  });
  activeSuggestion = -1;
});

let activeSuggestion = -1;
input.addEventListener("keydown", e => {
  const items = suggestionBox.querySelectorAll("li");
  if (items.length === 0) return;
  if (e.key === "ArrowDown") {
    e.preventDefault();
    activeSuggestion = (activeSuggestion + 1) % items.length;
    updateActive(items);
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    activeSuggestion = (activeSuggestion - 1 + items.length) % items.length;
    updateActive(items);
  } else if (e.key === "Enter") {
    if (activeSuggestion > -1) {
      items[activeSuggestion].click();
      suggestionBox.innerHTML = '';
    } else {
      getWeather();
      suggestionBox.innerHTML = '';
    }
  }
});

function updateActive(items) {
  items.forEach((item, idx) => {
    if (idx === activeSuggestion) {
      item.classList.add('active-suggestion');
      item.scrollIntoView({ block: 'nearest' });
    } else {
      item.classList.remove('active-suggestion');
    }
  });
}
input.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    getWeather();
    suggestionBox.innerHTML = '';
  }
});
