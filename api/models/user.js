var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = mongoose.Schema({
  username: String,
  email: String,
  dob:Date,
  prefferredZen: String,
  currentLocation:String,
  gender: String,
  profilePic:String
})

module.exports = mongoose.model('User', userSchema);