import axios from "axios";

export async function onRequest(context) {
  


  //return new Response(`Hello, world! This content came back ${context.env.API_KEY} from a serverless function. Which is the openweathermap api key`) // My API weather map key is ${context.env.API_KEY}`)


//   const response = await fetch("https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=SYD&destinationLocationCode=BKK&departureDate=2022-12-07&adults=2", {
//     method: "GET",
//     headers: {
//       Authorization:
//         "Bearer L4bABpAVM1pcJ11bbG9z08Hctt2U",
//     },
//   });


const response = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
    method: "POST",
    headers: {
        "content-type":"application/x-www-form-urlencoded"
    },
    body: 
        "grant_type=client_credentials&client_id=UAMZ3z9St2fGMkP5xiI8aNGNtEpgG5xr&client_secret=BFZgD5pGdPKO5k90",
});

//   const response1 = await fetch("https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=SYD&destinationLocationCode=BKK&departureDate=2022-12-07&adults=2", {
//     method: "GET",
//     headers: {
//       Authorization:
//         "Bearer L4bABpAVM1pcJ11bbG9z08Hctt2U",
//     },
//   });



  return  response;
}

