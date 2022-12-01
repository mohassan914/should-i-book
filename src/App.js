import './App.css';
import React, { useState } from 'react'
import axios from 'axios'

function App() {
  // ENDPOINT WE NEED FOR AMADUES: https://test.api.amadeus.com/v1/reference-data/locations/airports?latitude=51.57285&longitude=-0.44161
  // When we make it to production, change the latitude from the hard-coded 51.57 to and enviroment varible like {latitude} and same for longgitude
  // TO test, go into POSTMAN and then grab the Bearer token and then from CURL command, then type in the URL above and look at the JSON file. 
  /// TODO: Parse the JSON file correctly and look for the IATA code from the airline, This will be needed to find the cheapest flights from Chicago to entered city
  // example: data.iataCode
  const [data,setData] = useState({})
  const [location, setLocation] = useState('')
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=feaadae7ace79914a82e3d7c5ca09a37&units=imperial`
  
  const searchLocation = (event) => {
    if (event.key === 'Enter') {
    //  axios.get('/helloworld').then((response) => {
        axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  const requestGreeting = async (event) => 
  {
    console.log("Wak to poland")
    const result = await(await fetch('/helloworld')).text() // was .json() before
    console.log(result)
    alert(result)
  }

  //  async function getToken() {
  //   const response = await axios({
  //   url: "https://test.api.amadeus.com/v1/security/oauth2/token",
  //   method: "get",
  //   data: "grant_type=client_credentials",
  //   auth: {
  //     username: "UAMZ3z9St2fGMkP5xiI8aNGNtEpgG5xr",
  //     password: "BFZgD5pGdPKO5k90",
  //   },
  // });
  // alert(response).text()
  // console.log("Is this ever clicked?");
  // consoloe.log(response);
  // return response.data;
  // }





  /* TODO: implement code used to retrvie latitude and longitude from the open weather map

  amadeus.referenceData.locations.airports.get({
    longitude : 0.1278,
    latitude  : 51.5074
  }).then(function(response) {
    console.log(response.data[0]);
  }).catch(function(responseError){
    console.log(responseError.code);
  }); 
  */


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
        name = "greeting"
        id = "greetingInput"
        placeholder='ask the server for a greeting'
        type = "text"/>
        <button onClick={requestGreeting}>ask for greeting </button>
        {/* <button onClick={getToken}>test</button> */}
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
            <p>{}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{Math.round(data.main.temp)}°F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            {data.main ? <p className='bold'>{Math.round(data.main.feels_like)}°F</p> : null}
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
            <p>humidity</p>
          </div>
          <div className="wind">
            {data.wind ? <p className='bold'>{data.wind.speed}MPH</p> : null}
            <p>Wind Speed</p>
          </div>
          <div className="latitude">
            {data.coord ? <p className='bold'>{data.coord.lat}</p> : null}
            <p>Latitude</p>
          </div>
          <div className="longitude">
            {data.coord ? <p className='bold'>{data.coord.lon}</p> : null}
            <p>Longitude</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;