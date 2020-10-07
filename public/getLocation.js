<<<<<<< HEAD
var errPlaceholder = document.getElementById("error");
=======
var x = document.getElementById("latitude");
	var y=document.getElementById('longitude');
	var z=document.getElementById('demo');
>>>>>>> a15ae5addd35f4cd0e46d68238db00c48b90455b

function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(getPosition, showError);
	} else {
<<<<<<< HEAD
		errPlaceholder.innerHTML = "Geolocation is not supported by this browser.";
		return false;
	}
}

function getPosition(position) {
	console.log(position);
	//Not woring god knows why
	// document.getElementById("latitute").value = position.coords.latitude;
	// document.getElementById("longitute").value = position.coords.longitute;
	document.donationForm.latitute.value = position.coords.latitude;
	document.donationForm.longitute.value = position.coords.longitute;
	document.donationForm.description.value = "Why not working dear";
	return true;
=======
		z.innerHTML = "Geolocation is not supported by this browser.";
	}
}

function showPosition(position) {
	// x.innerHTML =
		// "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
		x.value=position.coords.latitude;
		y.value=position.coords.latitude;
>>>>>>> a15ae5addd35f4cd0e46d68238db00c48b90455b
}

function showError(error) {
	switch (error.code) {
		case error.PERMISSION_DENIED:
<<<<<<< HEAD
			errPlaceholder.innerHTML = "User denied the request for Geolocation.";
			break;
		case error.POSITION_UNAVAILABLE:
			errPlaceholder.innerHTML = "Location information is unavailable.";
			break;
		case error.TIMEOUT:
			errPlaceholder.innerHTML = "The request to get user location timed out.";
			break;
		case error.UNKNOWN_ERROR:
			errPlaceholder.innerHTML = "An unknown error occurred.";
=======
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
>>>>>>> a15ae5addd35f4cd0e46d68238db00c48b90455b
			break;
	}
	return false;
}
