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
  const [historicData,sethistoricData] = useState({})
  const [flight_data,setDataFlight] = useState({})
  const [location, setLocation] = useState('')
  const [date, setDate] = useState('')
  const [month, setMonth] = useState('')
  //Current Location data
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=feaadae7ace79914a82e3d7c5ca09a37&units=imperial`
  //Current location daily yearly data
  const url2 = `https://history.openweathermap.org/data/2.5/aggregated/month?q=${location}&month=${month}&appid=feaadae7ace79914a82e3d7c5ca09a37&units=imperial`
  


  const submit = async (event) => 
  {
    console.log("FUCK !! FUCK!!")
    axios.get(url).then(async (response) => {
      // setData(response.data)
       console.log(response.data)

       console.log("Walk to poland")
       const result = (await fetch(`/tokens/${response.data.coord.lat}/${response.data.coord.lon}/`)) // was text
       console.log('hello everbody');
       const dog = await result.json();
       setData(response.data)
       setDataFlight(dog.data[0]);
       console.log("test");
       
       console.log(dog.data[0]);
     //  alert("status good!" + dog.data[0].iataCode);
     })
    axios.get(url2).then(async (response) => {
      sethistoricData(response.data)
      console.log(response.data)
      console.log("FUCK")

    })
    setLocation('')
    setDate('')
    setMonth('')
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
        {/* <input 
        value = {location}
        name = "greeting"
        id = "greetingInput"
        placeholder='ask the server for a greeting'
        onChange= {event => setLocation(event.target.value)}
        onKeyPress={changeFlightData}
        type = "text"/> */}

        
        {/* <button onClick={getToken}>test</button> */}
        <input 
        value = {location}
        onChange = {event => setLocation(event.target.value)}
        placeholder='Enter Location'
        type = "text"/>
        <input 
        value = {date}
        onChange = {event => setDate(event.target.value)}
        placeholder='Enter Date #'
        type = "text"/>
        <input 
        value = {month}
        onChange = {event => setMonth(event.target.value)}
        placeholder='Enter Month #'
        type = "text"/>
        <button onClick={submit}>submit</button>
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
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
          <div className="myDog">
            {flight_data.iataCode ? <p className='bold'>Airport Code: {flight_data.iataCode}</p> : null}
          </div>
        </div>
        <div className = "middle">
          <div className="mintemp">
            {historicData.result ? <p className='bold'>{Math.round(1.8*(historicData.result.temp.record_min-273.15)+32)}°F</p> : null}
            <p>Monthly Record Minimum Temperature</p>
          </div>
          <div className="maxtemp">
            {historicData.result ? <p className='bold'>{Math.round(1.8*(historicData.result.temp.record_max-273.15)+32)}°F</p> : null}
            <p>Monthly Record Maximum Temperature</p>
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
          

          {/* <div className="flight_thing">
            {data.price ? <p className='bold'>{data.price.total}</p> : null}
            <p>Price to poland</p>
          </div> */}
          {/* <div className="myDog">
            {flight_data.iataCode ? <p className='bold'>{flight_data.iataCode}</p> : null}
            <p>AIRPORT CODE</p>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default App;