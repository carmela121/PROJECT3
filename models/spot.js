var mongoose = require('mongoose');

var spotSchema = mongoose.Schema({
  name: String,
  zenType: String,
  location:String,
  rating:String,
  distanceToCurrentLocation: Number,
  openHours: String
});

module.exports = mongoose.model('Spot', userSchema);
