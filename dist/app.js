var form = document.querySelector("form");
var addressInput = document.getElementById("address");
var map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
map.on('click', function (event) {
    var lat = event.latlng.lat;
    var lng = event.latlng.lng;
    console.log("click", lat, lng);
});
function searchAddressHandler(event) {
    event.preventDefault();
    var enteredAddress = addressInput.value;
    var geocodeUrl = "https://nominatim.openstreetmap.org/search?format=json&q=".concat(encodeURI(enteredAddress));
    fetch(geocodeUrl)
        .then(function (response) { return response.json(); })
        .then(function (data) {
        if (data.length === 0) {
            throw new Error("Could not fetch location!");
        }
        var lat = parseFloat(data[0].lat);
        var lng = parseFloat(data[0].lon);
        map.flyTo([lat, lng], 15, { animate: true });
    })
        .catch(function (err) {
        alert(err.message);
        console.log(err);
    });
}
form.addEventListener("submit", searchAddressHandler);
