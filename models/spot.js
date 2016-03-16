var mongoose = require('mongoose');

var spotSchema = new mongoose.Schema({
  name: String,
  zenType: String,
  lat: Number,
  lng: Number,  
  rating: Number,
  placeId: String,
  vicinity: String
});

module.exports = mongoose.model('Spot', spotSchema);
