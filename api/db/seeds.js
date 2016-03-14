var mongoose = require('mongoose');
var User = require('../models/user');

var databaseURL = 'mongo://localhost:8000/project3';
mongoose.connect(databaseURL);

User.collection.dop();

User.create([{
  username: "TonyP"
  email: "tony@tony.com",
  passwordHash: "password",
  dob:"01-01-01",
  prefferredZen: "Parks",
  currentLocation:"Second Home",
  gender: "male",
  profilePic:"http://www.lcfc.com/images/common/bg_player_profile_default_big.png"
},{
  username: "CamC"
  email: "carmen@carmen.com",
  passwordHash: "password",
  dob:"02-02-02",
  prefferredZen: "Bars",
  currentLocation:"Second Home",
  gender: "female",
  profilePic:"http://www.freelanceme.net/Images/default%20profile%20picture.png"
}, {
  username: "JayJ"
  email: "Jay@json.com",
  passwordHash: "password",
  dob:"03-03-03",
  prefferredZen: "Cafes",
  currentLocation:"Second Home",
  gender: "male",
  profilePic:"http://vignette4.wikia.nocookie.net/detectiveconan96/images/7/72/Generic_Male_Profile.jpg/revision/latest?cb=20140709000724"
}])