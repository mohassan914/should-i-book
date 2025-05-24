async function getToken() {
    /* fucntion that returns Oatuh Token */
	const resp = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
		method: 'POST',
		body: `grant_type=client_credentials&client_id=UAMZ3z9St2fGMkP5xiI8aNGNtEpgG5xr&client_secret=BFZgD5pGdPKO5k90`,
		headers: {
			'content-Type': 'application/x-www-form-urlencoded'
		}
	});

	return resp.json();

}


export async function onRequest(context) {
    // --- START OF BIG DADDY 
        // console.log(latitude);
        // console.log(longitude);
    
        const data = await getToken();
        console.log(context.params.catchall);
        // var lat = context.params.catchall[0];
        // var lon = context.params.catchall[1];
        var destinationCode = context.params.catchall[0];
        var month = context.params.catchall[1];
        var day = context.params.catchall[2]

        // amadeus.shopping.flightOffersSearch.get({
        //     originLocationCode: 'SYD',
        //     destinationLocationCode: 'BKK',
        //     departureDate: '2022-06-01',
        //     adults: '2'
        // }).then(function(response){
        //   console.log(response.data);
        // }).catch(function(responseError){
        //   console.log(responseError.code);
        // });
        console.log(day);
    
    
        return fetch(`https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=ORD&destinationLocationCode=${destinationCode}&departureDate=2025-${month}-${day}&adults=1`, { //removed includedAirelineCode
            headers: {
                'Authorization': data.token_type + ' ' + data.access_token,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    }