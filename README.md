# 🌦️ Weather App

A simple and responsive weather app that fetches real-time weather data from the OpenWeatherMap API. Users can enter a city name and get the current weather and temperature instantly.

---

## 🚀 Features

- Fetches real-time weather data using OpenWeatherMap API
- Displays temperature, weather condition, and city
- Responsive UI with clean styling
- Input validation and error handling

---

## 📁 Project Structure

```
weather_app/
├── index.html        # UI layout
├── style.css         # Styling
├── script.js         # JavaScript + API calls
```

---

## 🛠️ Technologies Used
# 🌦️ Weather App

This repository hosts a simple Weather App where an Express backend serves a small frontend from `backend/public` and proxies requests to the OpenWeatherMap API.

Summary of what's in this repo
- `backend/` — Express server and Node project
   - `server.js` — serves static files and exposes `/weather` endpoint
   - `package.json` — Node dependencies (`express`, `node-fetch`, `dotenv`)
   - `.env` — (not committed) place your `OPENWEATHER_API_KEY` here
- `backend/public/` — frontend assets served by Express
   - `index.html`, `script.js`, `style.css`, `cities.json`

Prerequisites
- Node.js (v14+)

Run locally (PowerShell)
1. Open a terminal and change to the backend folder:

```powershell
cd backend
```

2. Install dependencies (if not already installed):

```powershell
npm install
```

3. Create a `.env` file inside `backend/` with this content:

```text
OPENWEATHER_API_KEY=your_openweather_api_key_here
PORT=3000
```

4. Start the server:

```powershell
node server.js
```

5. Open your browser to `http://localhost:3000`

Notes
- Use the backend URL (`http://localhost:3000`) to access the frontend so API calls go through the server and avoid CORS issues.
- `backend/public/cities.json` contains the list of cities used for autocomplete.
- If you have an existing `frontend/` folder, it is not used; the active frontend is `backend/public`.

Development
- Edit frontend files in `backend/public` and refresh the browser.
- If you change `server.js`, restart the Node process.

Optional improvements
- Add an `npm start` script in `backend/package.json` for convenience.

Author
- **Kunal Pantawne** — GitHub: https://github.com/Kunal-41

```



