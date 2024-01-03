async function getWeather() {
  const cityInput = document.getElementById('cityInput').value;

  try {
    const response = await fetch('http://localhost:3000/getWeather', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ city: cityInput }),
    });

    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }

    const data = await response.json();

    const weatherResultDiv = document.getElementById('weatherResult');
    weatherResultDiv.textContent = `Weather in ${cityInput}: ${data.weather}`;
  } catch (error) {
    console.error('Error fetching weather data:', error);

    const errorDetails = document.getElementById('errorDetails');
    errorDetails.textContent = `Error details: ${error.message || 'Unknown error'}`;

    const weatherResultDiv = document.getElementById('weatherResult');
    weatherResultDiv.textContent = `Error fetching weather data`;
  }
}
