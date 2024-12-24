const fetchWeatherData = async (location) => {
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}&unitGroup=metric`;
  
  try {
      const response = await fetch(url);
      const data = await response.json();
      console.log('Weather Data:', data);
      return data;
  } catch (error) {
      console.error('Error fetching weather data:', error);
  }
};

// Llama a la función con el nombre de la ciudad o coordenadas
fetchWeatherData('Barcelona');
