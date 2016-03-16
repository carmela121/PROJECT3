$(init);


function init () {
  $('form').on('submit', submitForm);
  $('#logoutBtn').on('click', logout);
  console.log("js loaded okay");
  $('ul li a').on('click', showPage);
  checkLoginState();

  google.maps.event.addDomListener(window, 'load', initialize);

}

function checkLoginState(){

  var token = getToken();
      if(token) {
        $('.logged-out').addClass('hidden')
        $('.logged-in').removeClass('hidden')
        return loggedInState();
      } else {
        $('.logged-out').removeClass('hidden')
        $('.logged-in').addClass('hidden')
        return loggedOutState();
      }

}

function showPage(){
  //hide all the sections
  //hide errors
  //display relevant section

  //hide all the section elements on the DOM using bootstraps hidden class.
    $('section').addClass('hidden');

    var sectionId = $(this).text().toLowerCase();
    console.log(sectionId);
    if(sectionId === 'logout') {
      logout();
    } else {
    $("#" + sectionId).removeClass('hidden');
    }
}


function submitForm(){
  //get the data from the form and make an ajax request
  //call authentication succesfful function

  event.preventDefault();
  var form = this;
  var method = $(this).attr('method');
  var url = "http://localhost:3000/api" + $(this).attr('action');
  var data = $(this).serialize();

  form.reset();
  ajaxRequest(method, url, data, authenticationSuccessful);
}

function loggedInState(){
  // hide the login / register forms and links
  // show the users section and link
  // display the users
  $('#login, #register').addClass('hidden')
  $('#users').removeClass('hidden');
  getUsers();
  getSpots();

}

function loggedOutState(){
  // show the login / register links, and the login form
  // hide the users section and links
  $('#login, #register, #users').addClass('hidden')
}

function getToken() {
  // get the token from localStorage
  return localStorage.getItem('token');

}

function authenticationSuccessful(data) {
  // set the token and call checkLoginState
  if(data.token) setToken(data.token);
  checkLoginState();
}

function setToken(token) {
  // set the token into localStorage,
  return localStorage.setItem('token', token);
}

function getSpots () {
  event.preventDefault();
  return ajaxRequest('GET', 'http://localhost:3000/api/spots', null, displaySpots);
}

function displaySpots(data){
  //take user data and display all users (as li's)
  $ul = $('ul.spots');
    hideSpots($ul);
    data.spots.forEach(function(spot) {
      $ul.append('<li class="list-group-item">' + spot.name + spot.rating + '</li>');
    });
}

function hideSpots(ul){
  // remove all the users from the ul
    ul.empty();
}


function getUsers(){
  event.preventDefault();
    return ajaxRequest('GET', 'http://localhost:3000/api/users', null, displayUsers);
}

function displayUsers(data){
  //take user data and display all users (as li's)
  $ul = $('ul.users');
    hideUsers($ul);
    data.users.forEach(function(user) {
      $ul.append('<li class="list-group-item">' + user.username + user.email + '</li>');
    });
}

function logout(){
  //remove the token
  //call the logged out state func

    removeToken();
    checkLoginState();
    console.log("loggedout")

}

function removeToken() {
  // remove the token from localStorage
  localStorage.clear()
}

function hideUsers(ul){

  // remove all the users from the ul
    ul.empty();
}

function ajaxRequest(method, url, data, callback) {
  // create a re-useable ajaxRequest function
  return $.ajax({
    method: method,
    url: url,
    data: data,
    beforeSend: function(jqXHR, settings){
      var token = getToken();
      if(token) return jqXHR.setRequestHeader('Authorization', 'Bearer ' + token);
    }
  }).done(callback)
  .fail(function(err){
    console.error(err)
  });

}


var map;

function initialize () {

    var center = new google.maps.LatLng(51.5152,-0.0722);

    map = new google.maps.Map(document.getElementById('map'), {
        center: center,
        zoom: 15,
        // scrollwheel: false

        styles:
[
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#444444"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#36b3a8"
            },
            {
                "visibility": "on"
            }
        ]
    }
]
      });

      var geocoder = new google.maps.Geocoder();

      geocoder.geocode({ address: "The Emirates Stadium, London, UK" }, function(results) {

        var sillyMarker = new google.maps.Marker({
          map:map,
          position: results[0].geometry.location,
        });
      });

      navigator.geolocation.getCurrentPosition(function(pos) {

        var pos = new google.maps.LatLng({ lat: pos.coords.latitude, lng: pos.coords.longitude });

        var currentMarker = new google.maps.Marker({
          map:map,
          position: pos,
          draggable: true
        });

        currentMarker.addListener('dragend', function() {
          geocoder.geocode({ location: currentMarker.getPosition() }, function(results) {
            console.log(results[0].formatted_address);
          });
        });
      });


    // console.log(map);

    var request = {
      location:center,
      radius:8047,
      types:['parks']
    }

    var service = new google.maps.places.PlacesService(map);

      service.nearbySearch(request, callback);
}


function callback (results, status){
  if (status == google.maps.places.PlacesServiceStatus.OK){
    for(var i=0; i<results.length; i++){
      createMarker(results[i]);
      console.log(results[i].name);
    }
  }
}

function createMarker (place){
  var placeLoc = place.geometry.location;
  // console.log(placeLoc);
  var iconBase = "https://maps.google.com/mapfiles/kml/shapes/";
  var marker = new google.maps.Marker({
    map:map,
    position: placeLoc
    // icon: iconBase + 'pharmacy_plus.png'
  });
}
