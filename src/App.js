import React, { useState } from 'react';
import './App.css';
import myImage from './yetipic.png';

const API_KEY = 'bf5e3712d65100c68cc0264827fd70e0';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [randomTextIndex, setRandomTextIndex] = useState(0);

  const randomTextExamples = [
    "Anyway... who wants ice cream?",
    "Such important info for a Yeti...",
    "I'll stick to my forest, thanks...",
    "Wow, you are really curious today!",
    "Phew, glad I'm not there... I'd melt!",
    "Say hi to Nikola for me!",
    "He promised me a Yeti girl...",
    "Oh, that again...",
    "Zzzzzzzzz...",
    "Why would you search that?",
    "Got some ice cream?",
    "You think this is free? I had to try...",
    "Hmmm... not for me...",
    "Yep, you guessed it, too hot for me...",
    "Hello again!"
  ];

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      const data = await response.json();

      if (response.ok) {
        setWeather(data);
        setRandomTextIndex((prevIndex) => (prevIndex + 1) % randomTextExamples.length);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      alert('You are making the Yeti upset with your laziness!');
      console.error('No city name', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() !== '') {
      fetchWeatherData();
    } else {
      alert('Please enter a city name.');
    }
  };

  const getRandomText = () => {
    return randomTextExamples[randomTextIndex];
  };

  return (
    <>
      <div className='yetipic'>
        <img src={myImage} alt="Yeti" />
        <div className="random-text">{getRandomText()}</div>
      </div>
      <div className="weather-container">
        <h1>Weather Yeti</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit">Ask the Yeti</button>
        </form>

        {weather && (
          <div className='info'>
            <h2>{weather.name}</h2>
            <p>Temperature: {Math.round(weather.main.temp - 273.15)}°C</p>
            <p>Weather: {weather.weather[0].main}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default WeatherApp;