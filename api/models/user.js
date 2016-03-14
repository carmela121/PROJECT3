var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = mongoose.Schema({
  username: {type:String, unique:true, required: true},
  email: {type: String, unique: true, required: true },
  passwordHash: {type: String, required: true },
  dob:Date,
  prefferredZen: String,
  currentLocation:String,
  gender: String,
  profilePic:String
})

// Create virtual property for password
userSchema.virtual('password')
  .set(function(password) {
    //Save a reference to the password on the object for later
    this._password = password;
    // Encrypt password
    this.passwordHash = bcrypt.hashSync(this._password, bcrypt.genSaltSync(8));
  });

// Make sure people can't mess with the user schema
userSchema.path('passwordHash')
  .validate(function(passwordHash) {
    // Checks if _password exists
    if(!this._password) {
      return this.invalidate('password', 'Password Required!');
    }
  });

// Create an instance method to validate Password
// This takes the password entered, hashes it and compares it to the original hash
userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.passwordHash);
}

// Stop password hash from being sent from the server
userSchema.set('toObject', {
  transform: function(doc, ret) {
    delete ret.passwordHash;
    return ret;
  }
});

module.exports = mongoose.model('User', userSchema);
