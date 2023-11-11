import React from 'react';
import { useState } from 'react';
import { RiCloudyLine, RiRainyLine, RiSunLine, RiFoggyLine, RiMistLine } from 'react-icons/ri';

const api = {
  key: "06e1969da55a4b51d0b4447dcd9c92eb",
  base: "https://api.openweathermap.org/data/2.5/",
};

const App = () => {
  const [search, setSearch] = useState('');
  const [weather, setWeather] = useState({});

  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&appid=${api.key}`)
      .then((res) => res.json())
      .then((results) => {
        console.log('search pressed');
        console.log(results);
        setWeather(results);
      });
  };

  const getWeatherIcon = (conditionCode) => {
    switch (conditionCode) {
      case 'Clouds':
        return <RiCloudyLine size="70px" />;
      case 'Rain':
        return <RiRainyLine size="70px" />;
      case 'Clear':
        return <RiSunLine size="70px" />;
      case 'Fog':
        return <RiFoggyLine size="70px" />;
      case 'Mist':
        return <RiMistLine size="70px" />;
      default:
        return null;
    }
  };

  const resetSearch = () => {
    setSearch('');
    setWeather({});
  };

  return (
    <div className='App'>
      <h1>Weather App</h1>
      <div>
        <input
          type="text"
          placeholder="Enter city or town"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={searchPressed}>Search</button>
      </div>
      {typeof weather.main !== "undefined" ? (
        <div className='container'>
          <h2>{weather.name}</h2>
          <p>{Math.round(weather.main.temp)}°C</p>
          <div>
            <p>{weather.weather[0].main}</p>
            <p>({weather.weather[0].description})</p>
          </div>
          <div className='icon'>
            {getWeatherIcon(weather.weather[0].main)}
          </div>
          <div className='reset'>
            <button onClick={resetSearch}>Reset</button>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default App;