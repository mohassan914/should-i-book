import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react'
import axios from 'axios'

function App() {
  const [data,setData] = useState({})
  const [location, setLocation] = useState('')
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=feaadae7ace79914a82e3d7c5ca09a37&units=imperial`
  
  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <div className="app">
      <div className="search">
        <input 
        value = {location}
        onChange = {event => setLocation(event.target.value)}
        onKeyPress={searchLocation}
        placeholder='Enter Location'
        type = "text"/>
      </div>
      <div className="container">
        <div className = "top">
          <div className = "location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{Math.round(data.main.temp)}°F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{Math.round(data.weather[0].main)}</p> : null}
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            {data.main ? <p className='bold'>{Math.round(data.main.feels_like)}°F</p> : null}
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
            <p>Humidity</p>
          </div>
          <div className="wind">
            {data.wind ? <p className='bold'>{data.wind.speed}MPH</p> : null}
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;