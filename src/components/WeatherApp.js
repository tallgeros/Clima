import React, { useState } from 'react';
import axios from 'axios';
import './WeatherApp.css';

const WeatherApp = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        try {
            setError(''); // Limpiar errores anteriores
            const apiKey = 'TU_API_KEY'; // Sustituye con tu clave de API
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`
            );

            const data = response.data;

            // Asumiendo que esta API tiene un campo de fase lunar en `data.moon_phase`
            setWeatherData({
                location: data.name,
                temperature: data.main.temp,
                condition: data.weather[0].description,
                icon: data.weather[0].icon,
                nightTemperature: data.main.temp_min, // Ejemplo, puede variar según la API
                moonPhase: 'Creciente' // Este valor puede ser obtenido de otra API si no está en esta
            });
        } catch (error) {
            console.error('Error al buscar el clima:', error);
            setError('No se encontró la ciudad o hubo un problema con la búsqueda.');
        }
    };

    return (
        <div className="weather-app">
            <h1>Buscador de Clima</h1>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Ingresa una ciudad..."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button onClick={handleSearch}>Buscar</button>
            </div>
            {error && <p className="error-message">{error}</p>}
            {weatherData && (
                <div className="weather-card">
                    {/* Cara Frontal - Día */}
                    <div className="weather-card-front">
                        <img src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} alt="Icono del clima" />
                        <h2>{weatherData.location}</h2>
                        <p>Temperatura: {weatherData.temperature}°C</p>
                        <p>Condición: {weatherData.condition}</p>
                    </div>

                    {/* Cara Posterior - Noche */}
                    <div className="weather-card-back">
                        <p>Temperatura Noche: {weatherData.nightTemperature}°C</p>
                        <p>Fase Lunar: {weatherData.moonPhase}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WeatherApp;
