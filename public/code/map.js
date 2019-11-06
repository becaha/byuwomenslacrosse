/*global google*/
class Marker {
    latLng;
    text;
    constructor(latLng, text) {
        this.latLng = latLng;
        this.text = text;
    }
}
let map;
function initMap() {
    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();
    var myMarkers = [];
    var myLatLng = {lat: 37.6472, lng: -111.6568};
    map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 6
    });
    var myLatLngIPF = {lat: 40.2472, lng: -111.6568};
    var markerIPF = new google.maps.Marker({
        position: myLatLngIPF,
        map: map,
        title: 'BYU'
    });
    markerIPF.addListener('click', function() {
        map.setCenter(markerIPF.getPosition());
    });
    var latLngSB = {lat:34.4208, lng: -119.6982};
    var markerSB = new google.maps.Marker({
        position: latLngSB,
        map: map,
        title: 'UCSB'
    });
    markerSB.addListener('click', function() {
        map.setCenter(markerSB.getPosition());
        calcRoute(directionsService, directionsRenderer, markerSB.getPosition());
    });
    var latLngMesa = {lat: 38.9585, lng:-108.6176};
    var markerMesa = new google.maps.Marker({
        position: latLngMesa,
        map: map,
        title: 'CMU'
    });
    markerMesa.addListener('click', function() {
        map.setCenter(markerMesa.getPosition());
        calcRoute(directionsService, directionsRenderer, markerMesa.getPosition());
    });
    var latLngCSU = {lat: 40.5734, lng: -105.0865};
    var markerCSU = new google.maps.Marker({
        position: latLngCSU,
        map: map,
        title: 'CSU'
    });
    markerCSU.addListener('click', function() {
        map.setCenter(markerCSU.getPosition());
        calcRoute(directionsService, directionsRenderer, markerCSU.getPosition());
    });
    var latLngUSU = {lat: 41.7452, lng: -111.8097};
    var markerUSU = new google.maps.Marker({
        position: latLngUSU,
        map: map,
        title: 'USU'
    });
    markerUSU.addListener('click', function(event) {
        map.setCenter(markerUSU.getPosition());
        calcRoute(directionsService, directionsRenderer, markerUSU.getPosition());
    });

    directionsRenderer.setMap(map);
    directionsRenderer.setPanel(document.getElementById('directionsPanel'));
}
function calcRoute(directionsService, directionsRenderer, dest) {
    var start = {lat: 40.2472, lng: -111.6568}; // ipf
    // var start = document.getElementById('start').value;
    // var end = document.getElementById('end').value;
    var request = {
        origin:start,
        destination:dest,
        travelMode: 'DRIVING'
    };
    directionsService.route(request, function(response, status) {
        if (status == 'OK') {
            directionsRenderer.setDirections(response);
        }
    });
}
