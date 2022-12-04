import './App.css';
import React, { useState } from 'react'
import axios from 'axios'
import LoadingOverlay from 'react-loading-overlay-ts';

function App() {
  const [loading,setLoading]=useState(false);
  // ENDPOINT WE NEED FOR AMADUES: https://test.api.amadeus.com/v1/reference-data/locations/airports?latitude=51.57285&longitude=-0.44161
  // When we make it to production, change the latitude from the hard-coded 51.57 to and enviroment varible like {latitude} and same for longgitude
  // TO test, go into POSTMAN and then grab the Bearer token and then from CURL command, then type in the URL above and look at the JSON file. 
  /// TODO: Parse the JSON file correctly and look for the IATA code from the airline, This will be needed to find the cheapest flights from Chicago to entered city
  // example: data.iataCode
  const months = ["January", "Febuary","March", "April","May","June","July","Auguest","September","October","November","December"];
  const [data,setData] = useState({})
  const [historicMonthData, sethistoricMonthData] = useState({})
  const [historicDayData, sethistoricDayData] = useState({})
  const [flight_data,setDataFlight] = useState({})
  const [flight_price_data, setFlightPrice] = useState({})
  const [location, setLocation] = useState('')
  const [date, setDate] = useState('')
  const [month, setMonth] = useState('')
  //const [lat, setLat] = useState({})
  //const [lon, setLon] = useState({})
  //Current Location data
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=feaadae7ace79914a82e3d7c5ca09a37&units=imperial`

  const submit = async (event) => {
    setLoading(!loading) //start loading
    //  axios.get('/helloworld').then((response) => {
      axios.get(url).then(async (response) => {
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
        
        const lat = response.data.coord.lat
        const lon = response.data.coord.lon
        //Current location historic monthly data
        const url2 = `https://history.openweathermap.org/data/2.5/aggregated/month?lat=${lat}&lon=${lon}&month=${month}&appid=feaadae7ace79914a82e3d7c5ca09a37`
        axios.get(url2).then(async (response) => {
          sethistoricMonthData(response.data)
          console.log(response.data)
    
        })
        //Current location historic daily data
        const url3 = `https://history.openweathermap.org/data/2.5/aggregated/day?lat=${lat}&lon=${lon}&month=${month}&day=${date}&appid=feaadae7ace79914a82e3d7c5ca09a37`
        axios.get(url3).then(async (response) => {
          sethistoricDayData(response.data)
          console.log(response.data)
    
        })
        
        //  alert("status good!" + dog.data[0].iataCode);
        
        setLoading(loading) //stop loading
        
      })
      
    setLocation('')
    setDate('')
    setMonth('')
  }


  return (
    <div class="wrapper">
      <h1>
        <div className="search">
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
          <button class="submit" onClick={submit}>submit</button>
          <LoadingOverlay
            active={loading}
            spinner
            text='Loading...'
          ></LoadingOverlay>
        </div>
      </h1>

      <header>
        {/* <div className = "location">
          <p>{data.name}</p>
        </div>
        <div className="temp">
          {data.main ? <h1>{Math.round(data.main.temp)}°F</h1> : null}
        </div>
        <div className="description">
          {data.weather ? <p>{data.weather[0].main}</p> : null}
        </div> */}
        <div className = "location">
          <p>{data.name}</p>
          {data.main ? <h1>{Math.round(data.main.temp)}°F</h1> : null}
          {data.weather ? <p>{data.weather[0].main}</p> : null}
        </div>
        <div className="feels">
          {data.main ? <p className='bold'>{Math.round(data.main.feels_like)}°F</p> : null}
          {data.main ? <p>Feels Like</p> : null}
        </div>
        <div className="humidity">
          {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
          {data.main ? <p>Humidity</p> : null}
        </div>
        <div className="wind">
          {data.wind ? <p className='bold'>{data.wind.speed}MPH</p> : null}
          {data.main ? <p>Wind Speed</p> : null}
        </div>
        <div className="latitude">
          {data.coord ? <p className='bold'>{data.coord.lat}</p> : null}
          {data.main ? <p>Latitude</p>: null}
        </div>
        <div className="longitude">
          {data.coord ? <p className='bold'>{data.coord.lon}</p> : null}
          {data.main ? <p>Longitude</p> : null}
        </div>
      </header>

      <nav>
        <div className="dayavgtemp">
          {historicMonthData.result ? <p className='bold'>Average Temperature of {data.name} on {months[(historicMonthData.result.month)-1]} {historicDayData.result.day}: {Math.round(1.8*(historicDayData.result.temp.mean-273.15)+32)}°F</p> : null}
        </div>
        <div className="dayavgpressure">
          {historicMonthData.result ? <p className='bold'>Average Pressure of {data.name} on {months[(historicMonthData.result.month)-1]} {historicDayData.result.day}: {Math.round(historicDayData.result.pressure.mean)} hPa</p> : null}
        </div>
        <div className="dayavghumidity">
          {historicMonthData.result ? <p className='bold'>Average Humidity of {data.name} on {months[(historicMonthData.result.month)-1]} {historicDayData.result.day}: {(historicDayData.result.humidity.mean)}%</p> : null}
        </div>
        <div className="dayavgwind">
          {historicMonthData.result ? <p className='bold'>Average Wind Speed of {data.name} on {months[(historicMonthData.result.month)-1]} {historicDayData.result.day}: {(historicDayData.result.wind.mean)} m/s </p> : null}
        </div>
        <div className="dayavgprecipitation">
          {historicMonthData.result ? <p className='bold'>Average Precipitation of {data.name} on {months[(historicMonthData.result.month)-1]} {historicDayData.result.day}: {(historicDayData.result.precipitation.mean)} mm </p> : null}
        </div>{historicMonthData.result ? <p> MONTHLY AVERAGE DATA: </p> : null}
        <div className = "monthlydata">
          <div className="mintemp">
            {historicMonthData.result ? <p className='bold'>Record Minimum Temperature of  {months[(historicMonthData.result.month)-1]} 2022 in {data.name} {Math.round(1.8*(historicMonthData.result.temp.record_min-273.15)+32)}°F</p> : null}
          </div>
          <div className="maxtemp">
            {historicMonthData.result ? <p className='bold'>Record Maximum Temperature of {months[(historicMonthData.result.month)-1]} 2022 in {data.name} {Math.round(1.8*(historicMonthData.result.temp.record_max-273.15)+32)}°F</p> : null} 
          </div>
        </div>
      </nav>

      <section>
        <div className="destination_code">
          {flight_data.iataCode ? <p className='bold'>Airport Code: {flight_data.iataCode}</p> : null}
        </div>
        <div className="flight_price">
          {flight_price_data.price ? <p className='bold'>Price of Trip from Chicago to {data.name} is: {flight_price_data.price.total} {flight_price_data.price.currency}</p> : null}
        </div>
      </section>
    </div> //wrapper
  );
}

export default App;