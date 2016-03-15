var mongoose = require("mongoose");
var User = require('../models/user');

var mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost/project3';
mongoose.connect(mongoURI);

User.collection.drop();

User.create([{
  username: "TonyP",
  email: "tony@tony.com",
  password: "password",
  dob:"01-01-01",
  prefferredZen: "Parks",
  currentLocation:"Second Home",
  gender: "male",
  profilePic:"http://www.lcfc.com/images/common/bg_player_profile_default_big.png"
},{
  username: "CamC",
  email: "carmen@carmen.com",
  password: "password",
  dob:"02-02-02",
  prefferredZen: "Bars",
  currentLocation:"Second Home",
  gender: "female",
  profilePic:"http://www.freelanceme.net/Images/default%20profile%20picture.png"
}, {
  username: "JayJ",
  email: "Jay@json.com",
  password: "password",
  dob:"03-03-03",
  prefferredZen: "Cafes",
  currentLocation:"Second Home",
  gender: "male",
  profilePic:"http://vignette4.wikia.nocookie.net/detectiveconan96/images/7/72/Generic_Male_Profile.jpg/revision/latest?cb=20140709000724"
}],
  function(err, users){
        if(err) return console.error(err);
        console.log(users);
        mongoose.connection.close();
      });
