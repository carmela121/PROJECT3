var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = mongoose.Schema({
  username: { type:String, unique:true, required: true} ,
  email: {type: String, unique: true, required: true },
  passwordHash: {type: String, unique:true, required: true },
  dob:Date,
  prefferredZen: String,
  currentLocation:String,
  gender: String,
  profilePic:String
})

module.exports = mongoose.model('User', userSchema);
