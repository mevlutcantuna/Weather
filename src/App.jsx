import React, {useEffect, useState} from 'react';
import './App.css';

const API = {
    key :'13cc594ef53afab75095d1f522e7af3e',
    base : 'https://api.openweathermap.org/data/2.5/'
};

function App() {

    const dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`
    }

    const [query , setQuery] = useState('')
    const [weather , setWeather] = useState({})

    const search = (event) =>  {
        if (event.key === "Enter"){
            fetch(`${API.base}weather?q=${query}&units=metric&APPID=${API.key}`)
                .then(res => res.json())
                .then(result => {
                    setWeather(result);
                    setQuery('');
                });
        }
    }

  return (
      <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
    <div className="App">
      <div className={'weather-all'}>
        <div className={'search'}>
            <input
                className={'input'}
                type={'text'}
                placeholder={'Search...'}
                onChange={e => setQuery(e.target.value)}
                value={query}
                onKeyPress={search}
            />
        </div>
          {(typeof weather.main != "undefined") ? (
              <div>
                  <div className={'location-box'}>
                      <div className={'location'}>
                          {weather.name} , {weather.sys.country}
                      </div>
                      <div className={'date'}>
                          {dateBuilder(new Date())}
                      </div>
                  </div>
                  <div className={'weather-box'}>
                      <div className={'temp'}>
                          {Math.round(weather.main.temp)}°C
                      </div>
                      <div className={'weather'}>
                          {weather.weather[0].main}
                      </div>
                  </div>
              </div>
          ) : ('')}

      </div>
    </div>
          </div>
  );
}

export default App;
