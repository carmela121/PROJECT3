var mongoose = require("mongoose");
var User = require('../models/user');


var Spot = require('../models/spot');
var rp       = require("request-promise");
// var parser   = require('xml2json');


var mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost/project3';
mongoose.connect(mongoURI);

//
// exports.randeats = function(req, res){
  // var key = req.query.key;
  // var location = encodeURIComponent(req.query.location);
  // var radius = 16000;
  // var sensor = false;
  // var types = "restaurant";
  //
  // // var https = require('https');
  // var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyDPoIujIF8uLPDuTaJ32f-wW0EDd5hCfFg&location=" + location + "&radius=" + radius + "&sensor=" + sensor + "&types=" + types;
  // console.log(url);
//   https.get(url, function(response) {
//       var body ='';
//       response.on('data', function(chunk) {
//         body += chunk;
//       });
//
//       response.on('end', function() {
//         var places = JSON.parse(body);
//         var locations = places.results;
//         var randLoc = locations[Math.floor(Math.random() * locations.length)];
//
//         res.json(randLoc);
//       });
//     }).on('error', function(e) {
//       console.log("Got error: " + e.message);
//     });
//   };











User.collection.drop();

User.create([{
  username: "TonyP",
  email: "tony@tony.com",
  password: "password",
  passwordConfirmation: "password",
  dob:"01-01-01",
  prefferredZen: "Parks",
  currentLocation:"Second Home",
  gender: "male",
  profilePic:"http://www.lcfc.com/images/common/bg_player_profile_default_big.png"
},{
  username: "CamC",
  email: "carmen@carmen.com",
  password: "password",
  passwordConfirmation: "password",
  dob:"02-02-02",
  prefferredZen: "Bars",
  currentLocation:"Second Home",
  gender: "female",
  profilePic:"http://www.freelanceme.net/Images/default%20profile%20picture.png"
}, {
  username: "JayJ",
  email: "Jay@json.com",
  password: "password",
  passwordConfirmation: "password",
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
