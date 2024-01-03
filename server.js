const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const apiKey = '4a0b6873f6edb002733d61f357556d7a'; // Replace with your actual API key
const weatherApiUrl = 'http://api.openweathermap.org/data/2.5/weather';

app.post('/getWeather', async (req, res) => {
  try {
    const { city } = req.body;

    if (!city || typeof city !== 'string') {
      return res.status(400).json({ error: 'Invalid input' });
    }

    const response = await axios.get(weatherApiUrl, {
      params: {
        q: city,
        appid: apiKey,
        units: 'metric',
      },
    });

    const temperature = response.data.main.temp;
    res.json({ weather: `${temperature}C` });
  } catch (error) {
    console.error('Error fetching weather data:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: 'Error fetching weather data',
      details: error.response?.data || error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
