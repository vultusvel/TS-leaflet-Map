const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;
const map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

map.on('click', function(event) {
  const lat = event.latlng.lat;
  const lng = event.latlng.lng;
  console.log("click", lat, lng);
});

function searchAddressHandler(event: Event) {
	event.preventDefault();
	const enteredAddress = addressInput.value;
    const geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURI(
    enteredAddress
  )}`;

  fetch(geocodeUrl)
  .then((response) => response.json())
  .then((data) => {
    if (data.length === 0) {
      throw new Error("Could not fetch location!");
    }
    const lat = parseFloat(data[0].lat)
    const lng = parseFloat(data[0].lon)
    map.flyTo([lat, lng], 15, {animate: true})
  })
  .catch((err) => {
    alert(err.message);
    console.log(err);
  });
}

form.addEventListener("submit", searchAddressHandler);
