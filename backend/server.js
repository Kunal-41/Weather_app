import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// allow frontend files (static hosting if needed)
app.use(express.static("public"));

app.get("/weather", async (req, res) => {
  const city = req.query.city;
  if (!process.env.OPENWEATHER_API_KEY) {
    return res.status(500).json({ error: "API key missing" });
  }
  if (!city) return res.status(400).json({ error: "City required" });

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) return res.status(404).json({ error: "City not found" });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch weather" });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
