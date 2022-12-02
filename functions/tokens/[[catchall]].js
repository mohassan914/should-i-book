 async function getToken() {
	const resp = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
		method: 'POST',
		body: 'grant_type=client_credentials&client_id=UAMZ3z9St2fGMkP5xiI8aNGNtEpgG5xr&client_secret=BFZgD5pGdPKO5k90',
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
	var lat = context.params.catchall[0];
	var lon = context.params.catchall[1];


	return fetch(`https://test.api.amadeus.com/v1/reference-data/locations/airports?latitude=${lat}&longitude=${lon}`, {
		headers: {
			'Authorization': data.token_type + ' ' + data.access_token,
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	});

}