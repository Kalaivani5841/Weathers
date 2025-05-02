import React, { useState } from 'react';
import axios from 'axios';
import './weather.css';

function Weather() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');


  const apiKey = 'e05ae29177fcf442fdde597af4b0a466';  

  const fetchWeather = async () => {
    try {
      
      const encodedCity = encodeURIComponent(city);
      const apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&appid=${apiKey}&units=metric`;

      console.log('API URL:', apiUrl);

      const res = await axios.get(apiUrl);

      console.log('API Response:', res.data);

      if (res.data && res.data.weather && res.data.main) {
        setWeather(res.data);
        setError('');
      } else {
        setWeather(null);
        setError('No weather data available. Please try again.');
      }
    } catch (err) {
     
      console.error('Error:', err);
      setWeather(null);
      setError('City not found. Please try again.');
    }
  };

  return (
    <div className="weather-container">
      <h2>Weather App</h2>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Get Weather</button>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-details">
          <h3>{weather.name}</h3>
          <p>{weather.weather[0].description}</p>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Humidity: {weather.main.humidity}%</p>
        </div>
      )}
    </div>
  );
}

export default Weather;