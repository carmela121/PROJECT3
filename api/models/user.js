var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = mongoose.Schema({
<<<<<<< HEAD
  username: { type:String, unique:true, required: true} ,
  email: {type: String, unique: true, required: true },
  passwordHash: {type: String, unique:true, required: true },
=======
  username: { type:String, unique:true, required: true },
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, unique:true, required: true },
>>>>>>> b4bfbb81f1bc6b358a3985dd6e6a34e729461429
  dob:Date,
  prefferredZen: String,
  currentLocation:String,
  gender: String,
  profilePic:String
})

module.exports = mongoose.model('User', userSchema);
<<<<<<< HEAD
=======

>>>>>>> dev
