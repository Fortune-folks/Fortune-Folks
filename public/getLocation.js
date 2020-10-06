var x = document.getElementById("latitude");
	var y=document.getElementById('longitude');
	var z=document.getElementById('demo');

function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition, showError);
	} else {
		z.innerHTML = "Geolocation is not supported by this browser.";
	}
}

function showPosition(position) {
	// x.innerHTML =
		// "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
		x.value=position.coords.latitude;
		y.value=position.coords.latitude;
}

function showError(error) {
	switch (error.code) {
		case error.PERMISSION_DENIED:
			z.innerHTML = "User denied the request for Geolocation.";
			break;
		case error.POSITION_UNAVAILABLE:
			z.innerHTML = "Location information is unavailable.";
			break;
		case error.TIMEOUT:
			z.innerHTML = "The request to get user location timed out.";
			break;
		case error.UNKNOWN_ERROR:
			z.innerHTML = "An unknown error occurred.";
			break;
	}
}
