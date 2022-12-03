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
  const [flight_data,setDataFlight] = useState({})
  const [flight_price_data, setFlightPrice] = useState({})
  const [location, setLocation] = useState('')
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=feaadae7ace79914a82e3d7c5ca09a37&units=imperial`
  
  const searchLocation = async (event) => {
    if (event.key === 'Enter') {
    //  axios.get('/helloworld').then((response) => {
        axios.get(url).then(async (response) => {
       // setData(response.data)
        console.log(response.data)

        console.log("Walk to poland")
        const result = (await fetch(`/tokens/${response.data.coord.lat}/${response.data.coord.lon}/`)) // was text
      

        console.log('hello everbody');
        const dog = await result.json();
        console.log(dog.data[0].iataCode);
        const priceAPI = (await fetch(`/prices/${dog.data[0].iataCode}/`)) // was text
        const priceJson = await priceAPI.json();

        //setData(response.data)
       // setDataFlight(dog.data[0]);
        console.log("test");
        console.log(dog.data[0]);
        console.log(priceJson.data[0]); // should print out the price of the API
        setData(response.data)
        setDataFlight(dog.data[0]);
        setFlightPrice(priceJson.data[0]);
        console.log("Price of Trip is " + priceJson.data[0].price.grandTotal + " "+ priceJson.data[0].price.currency); // should print out the price of the API
      //  alert("status good!" + dog.data[0].iataCode);
      })
    setLocation('')
    }
  }

  const requestGreeting = async (event) => 
  {
    // if (event.key === 'Enter') {
    console.log("Walk to Bangkok")
    //const result = await(await fetch('/helloworld')).text() // was .json() before
    const result = (await fetch(`/tokens/${data.coord.lat}/${data.coord.lon}/`)) // was text
    // const flight_json = await result.json()
    // const result1 = await(await fetch(`/prices/${flight_json.data[0].iataCode}`)).text() // was .json() before

    // console.log(result1)
    // alert(result1) 
    console.log(result);
    alert(result);
  }

  const changeFlightData = async (event) => 
  {
    console.log("Walk to poland")
    const result = (await fetch(`/tokens/${data.coord.lat}/${data.coord.lon}/`)) // was text

    console.log('hello everbody');
    const dog = await result.json();
    console.log(dog.data[0]);
    alert("status good!" + dog.data[0].iataCode);
      
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
        {/* <button onClick={changeFlightData}>Walk to poland</button>
        <button onClick={requestGreeting}>ask for greeting </button> */}
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
          </div>
          <div className="temp">
            {data.main ? <h1>{Math.round(data.main.temp)}°F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
          <div className="destination_code">
            {flight_data.iataCode ? <p className='bold'>Airport Code: {flight_data.iataCode}</p> : null}
          </div>
          <div className="flight_price">
            {flight_price_data.price ? <p className='bold'>Price of Trip from Chicago to {location} is: {flight_price_data.price.total} {flight_price_data.price.currency}</p> : null}
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