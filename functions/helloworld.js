import axios from "axios";

export async function onRequest(context) {


  // const response = await axios({
  //   url: "https://test.api.amadeus.com/v1/security/oauth2/token",
  //   method: "post",
  //   data: "grant_type=client_credentials",
  //   auth: {
  //     username: "UAMZ3z9St2fGMkP5xiI8aNGNtEpgG5xr",
  //     password: "BFZgD5pGdPKO5k90",
  //   },
  // });
  //console.log(response);
  //return response;



  // const weather = await fetch('openweather map').json()
  // const access_token = await fetch('amadeus auth endpoint').json()
  // await fetch('amadeus search')
  //const token = await fetch()

  // const flghtlore = await fetch('"https://test.api.amadeus.com/v1/security/oauth2/token \
  // -H "Content-Type: application/x-www-form-urlencoded" \
  // -d "grant_type=client_credentials&client_id=UAMZ3z9St2fGMkP5xiI8aNGNtEpgG5xr&client_secret=BFZgD5pGdPKO5k90")
  
  
// var Amadeus = require('amadeus');

// var amadeus = new Amadeus({
//   clientId: 'UAMZ3z9St2fGMkP5xiI8aNGNtEpgG5xr',
//   clientSecret: 'BFZgD5pGdPKO5k90'
// });

// amadeus.shopping.flightOffersSearch.get({
//     originLocationCode: 'SYD',
//     destinationLocationCode: 'BKK',
//     departureDate: '2022-12-25',
//     adults: '2'
// }).then(function(response){
//   console.log(response.data);
// }).catch(function(responseError){
//   console.log(responseError.code);
// });



  //return new Response(`Hello, world! This content came back ${context.env.API_KEY} from a serverless function. Which is the openweathermap api key`) // My API weather map key is ${context.env.API_KEY}`)

  // const response = await axios({
  //   url: "https://test.api.amadeus.com/v1/security/oauth2/token",
  //   method: "post",
  //   data: "grant_type=client_credentials",
  //   auth: {
  //     username: "UAMZ3z9St2fGMkP5xiI8aNGNtEpgG5xr",
  //     password: "BFZgD5pGdPKO5k90",
  //   },
  // });


  // const response = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
  //   method: "POST",
  //   body: "grant_type=client_credentials",
  //   headers: {
  //     Authorization:
  //       // "Basic " + Buffer.from("UAMZ3z9St2fGMkP5xiI8aNGNtEpgG5xr:BFZgD5pGdPKO5k90").toString("base64"),
  //       "Bearer UAMZ3z9St2fGMkP5xiI8aNGNtEpgG5xr:BFZgD5pGdPKO5k90".toString("base64"),
  //   },
  // });
  // //const data = await response.json()



  const response = await fetch("https://test.api.amadeus.com/v1/reference-data/locations/airports?latitude=51.57285&longitude=-0.44161", {
    method: "GET",
    headers: {
      Authorization:
        // "Basic " + Buffer.from("UAMZ3z9St2fGMkP5xiI8aNGNtEpgG5xr:BFZgD5pGdPKO5k90").toString("base64"),
        "Bearer AwyDIRY0C70I5ZLtNXaRsdOCraEp",
    },
  });





  return await response;
}

