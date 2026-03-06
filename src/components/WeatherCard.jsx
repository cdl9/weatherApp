// src/components/WeatherCard.jsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as faSolidBookmark } from '@fortawesome/free-solid-svg-icons'; // Filled bookmark
import { faBookmark as faRegularBookmark } from '@fortawesome/free-regular-svg-icons';
import ReactAnimatedWeather from 'react-animated-weather';

import iconMap from "./iconMap";
import { useEffect, useState } from 'react';
import { format, set } from 'date-fns';
import WeatherIcon from './WeatherIcon';
import { icon } from 'leaflet';

const defaults = {
  icon: 'CLEAR_DAY',
  color: 'goldenrod',
  size: 40,
  animate: true
};


const WeatherCard = ({ weather, unit, cityLabel, savedCities, setSavedCities, onStatClick, triggerToast, glow }) => {
  const [localTime, setLocalTime] = useState('');
  const [localDate, setLocalDate] = useState('');

  const [fade, setFade] = useState('fade-in'); 
  const [displayTemp, setDisplayTemp] = useState(null);

  if (!weather) return null;
  
  const isSaved = savedCities.some(
    (c) => c.lat === weather.coord.lat && c.lon === weather.coord.lon
  );

  const toggleFavorite = () => {
    if (isSaved) {
      // remove from saved
      setSavedCities(savedCities.filter(c => !(c.lat === weather.coord.lat && c.lon === weather.coord.lon)));
      triggerToast(`${weather.name} removed from favorites`);
    } else {
      // add to saved
      setSavedCities([
        ...savedCities,
        {
          name: weather.name,
          country: weather.sys.country,
          cityLabel,
          temp: weather.main.temp,
          lat: weather.coord.lat,
          lon: weather.coord.lon,
          icon: weather.weather[0].icon,
        },
      ]);
      console.log("icon", weather.weather[0].icon);
       triggerToast(`${weather.name} added to favorites`);
    }
  };

  const updateLocalTime = () => {
      const nowUTC = Math.floor(Date.now() / 1000) + (new Date().getTimezoneOffset() * 60); // current UTC time in seconds
      const localTimestamp = nowUTC + weather.timezone; // add timezone offset
      const localDate = new Date(localTimestamp * 1000);

      setLocalTime(format(localDate, 'h:mm a'));
      setLocalDate(format(localDate, 'EEEE, MMMM do'));
    };

  useEffect(() => {
    updateLocalTime(); // initial calculation

    const timer = setInterval(() => {
      updateLocalTime(); // update every minute
    }, 60000);

    return () => clearInterval(timer); // cleanup on unmount
  }, [weather.timezone]);



  const formatTime = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
  };

  const sunriseTime = formatTime(weather.sys.sunrise);
  const sunsetTime = formatTime(weather.sys.sunset);
  return (
    <div className="weather-card background-card">
      <div className={`small-card weather-main-card ${glow ? 'weather-card-glow' : ''}`}>
        <button className='bookmark-button' style={{justifySelf:'flex-end',marginTop:'10px'}}
          onClick={toggleFavorite}
        >
          <FontAwesomeIcon icon={isSaved ? faSolidBookmark : faRegularBookmark} className="mediumIcon"/>
        </button>
        <div className='flex-row' style={{backgroundColor:'transparent'}}>
          <div className="weather-header">
            <h2 style={{marginBottom:'0px'}}>{cityLabel}</h2>
            <p style={{marginBottom:'15px'}}>{localDate}</p>
            <p className='light-bold-label'>{localTime}</p>
            <p className='label-faded'>Local Time</p>
            <div className='animated-icon'>
              <WeatherIcon code={weather.weather[0].icon}  size={60}/>
            </div>
            <p className='label-faded'>{weather.weather[0].main} - {weather.weather[0].description}</p>
          </div>

          <div className="temperature-details"> 
            <p className={`temperatureBig temp-value ${fade}`}>{weather.main.temp}°{unit === 'metric' ? 'C' : 'F'}</p>
            <p className='label-faded'><FontAwesomeIcon icon="temperature-half" /> Feels like {weather.main.feels_like}°{unit === 'metric' ? 'C' : 'F'}</p>
            <div className="feature-details">
              <FontAwesomeIcon icon="sun" className="mediumIcon icon-faded"/>
              <div className="feature-text">
                <p className='label-faded'> Sunrise</p>
                <p className='light-bold-label'>{sunriseTime}</p>
              </div>
          </div>
          <div className="feature-details">
              <FontAwesomeIcon icon="moon" className="mediumIcon icon-faded"/>
              <div className="feature-text">
                <p className='label-faded'> Sunset</p>
                <p className='light-bold-label'>{sunsetTime}</p>
              </div>
          </div>
          
          </div>
        </div>
      </div>
      
      


      <div className="extra-details">
        <div className="feature-text full-width small-card attribute-card"
          onClick={() => onStatClick('humidity')}
        > 
          <div className="feature-details" style={{marginTop:'0',marginLeft:'-10px'}}>
              <FontAwesomeIcon icon="droplet" className="mediumIcon icon-faded"/> 
              <div className="feature-text" style={{marginTop:'0',marginLeft:'-10px'}}>
                <p >Humidity</p>
                <p className='light-bold-label'style={{fontSize:'18px'}}>{weather.main.humidity}%</p>
              </div>
          </div>    
        </div>

        <div className="feature-text full-width small-card attribute-card"
          onClick={() => onStatClick('wind')}
        > 
          <div className="feature-details" style={{marginTop:'0',marginLeft:'-10px'}}>
              <FontAwesomeIcon icon="wind" className="mediumIcon icon-faded"/> 
              <div className="feature-text" style={{marginTop:'0',marginLeft:'-10px'}}>
                <p >Wind</p>
                <p className='light-bold-label'style={{fontSize:'18px'}}>{weather.wind.speed}{unit === 'metric' ? 'm/s' : 'mph'}</p>
              </div>
          </div>    
        </div>
        <div className="feature-text full-width small-card attribute-card"
          onClick={() => onStatClick('rain')}
        >
          <div className="feature-details" style={{marginTop:'0',marginLeft:'-10px'}}>
              <FontAwesomeIcon icon="tachometer-alt" className="mediumIcon icon-faded"/> 
              <div className="feature-text" style={{marginTop:'0',marginLeft:'-10px'}}>
                <p >Pressure</p>
                <p className='light-bold-label'style={{fontSize:'18px'}}>{weather.main.pressure}Pa</p>
              </div>
          </div>    
        </div>

      </div>
    </div>
  );
};

export default WeatherCard;
