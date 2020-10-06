var errPlaceholder = document.getElementById("error");

function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(getPosition, showError);
	} else {
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
}

function showError(error) {
	switch (error.code) {
		case error.PERMISSION_DENIED:
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
			break;
	}
	return false;
}
