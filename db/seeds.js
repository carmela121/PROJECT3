var mongoose = require('mongoose');
var Promise = require('bluebird');
var database = require('../config/database');
mongoose.Promise = Promise;
mongoose.connect(database.uri);

var key = process.env.GMAPS_SERVER_KEY;
var placesURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=51.5152,-0.0722&radius=15000&key=" + key
var request = require('request-promise');
var Spot = require('../models/spot');
Spot.collection.drop();

function getDataFromRes(res, type) {
  var places = JSON.parse(res);

  var data = places.results.map(function(place) {
    return {
      placeId: place.id,
      name: place.name,
      rating: place.rating,
      lat: place.geometry.location.lat,
      lng: place.geometry.location.lng,
      zenType: type,
      vicinity: place.vicinity
    }
  });

  return data;
}

request(placesURL + "&type=park")
  .then(function(res) {
    return Spot.create(getDataFromRes(res, "park"));
  })
  .then(function() {
    console.log("Parks added...");
    return request(placesURL + "&type=museum");
  })
  .then(function(res) {
    return Spot.create(getDataFromRes(res, "museum"));
  })
  .then(function() {
    console.log("Museums added...");
    return request(placesURL + "&type=spa")
  })
  .then(function(res) {
    return Spot.create(getDataFromRes(res, "spa"));
  })
  .then(function() {
    console.log("Spas added...");
    return request(placesURL + "&type=art_gallery");
  })
  .then(function(res) {
    return Spot.create(getDataFromRes(res, "art gallery"));
  })
  .then(function() {
    console.log("Galleries added...");
  })
  .catch(function(err) {
    console.error("Oops, something went wrong!", err);
  })
  .finally(function() {
    mongoose.connection.close();
  });
