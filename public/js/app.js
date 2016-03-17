$(init);

var markers = [];
var map;
var geocoder = new google.maps.Geocoder();
var service;

function init () {
  $('form:not(.updateSpot)').on('submit', submitForm);
  $('form.addSpot :input').on('blur', addressLookup);
  $('#logoutBtn').on('click', logout);
  $('ul li a').on('click', showPage);
  $('ul li a.addspot-link').on('click', populateAddSpotForm);
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
  if(sectionId === 'logout') {
    logout();
  } else {
    $("#" + sectionId).removeClass('hidden')
  }
}


function submitForm(){
  //get the data from the form and make an ajax request
  //call authentication succesfful function

  event.preventDefault();
  var form = this;
  var method = $(this).attr('method');
  var url = "/api" + $(this).attr('action');
  var data = $(this).serialize();
  $('section').addClass('hidden');

  form.reset();
  ajaxRequest(method, url, data, authenticationSuccessful);
}

function loggedInState(){
  // hide the login / register forms and links
  // show the users section and link
  // display the users
  $('#login, #register').addClass('hidden')
  // $('#users').removeClass('hidden');
  $('#spots').removeClass('hidden');
  // getUsers();
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
  return ajaxRequest('GET', '/api/spots', null, displaySpots);
}

function deleteSpot(spot) {
  event.preventDefault();
  return ajaxRequest('DELETE', '/api/spots/' + spot._id);
}

function addressLookup(){
  var address = $('form.addSpot').find('[name="spot[name]"]').val() + ", UK";
  geocoder.geocode({ address: address }, function(results) {
    if(results.length > 0) {
      var spotName = results[0].formatted_address.split(', ')[0];
      var location = results[0].geometry.location;
      var $form = $('form.addSpot');
      $form.find('[name="spot[lat]"]').val(location.lat());
      $form.find('[name="spot[lng]"]').val(location.lng());
    }
  });
}

function populateAddSpotForm() {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(function(pos) {
    var pos = new google.maps.LatLng({ lat: pos.coords.latitude, lng: pos.coords.longitude });
    geocoder.geocode({ location: pos }, function(results) {
      var spotName = results[0].formatted_address.split(', ')[0];
      var location = results[0].geometry.location;
      var $form = $('form.addSpot');
      $form.find('[name="spot[name]"]').val(spotName);
      $form.find('[name="spot[lat]"]').val(location.lat());
      $form.find('[name="spot[lng]"]').val(location.lng());
    });
  });
}

function populateSpotForm(spot) {
  event.preventDefault();
  var $form   = $('form.updateSpot');

  $form.attr('id', spot._id);
  $form.on('submit', updateSpot);

  $form.find('input').toArray().forEach(function(input) {
    var $input = $(input);
    var attrName = $input.attr('name').match(/spot\[(.+)\]/)[1];
    $input.val(spot[attrName]);
  });
}

function displaySpots(data){
  //take spot data and display all spots (as li's)
  console.log(data);
  $ul = $('ul.spots');
  $ul.empty();

  data.spots.forEach(function(spot, idx) {
    var $li = $('<li class="list-group-item">' + spot.name + spot.rating + spot.vicinity + 
    '</li>');
    var $update = $('<button type="submit" class="update btn btn-default">Update</button>');
    var $delete = $('<button type="submit" class="btn btn-default delete">Delete</button>');

    $delete.on('click', function() {
      deleteSpot(spot);
      $li.remove();
    });
    $update.on('click', function() {
      populateSpotForm(spot);
    });

    $li.append($update);
    $li.append($delete);
    $ul.append($li);
  });

  $('.update').on('click', showUpdateForm);
}

function updateSpot() {
  var id  = $(this).attr('id');
  var url = '/api/spots/' + id;
  var data = $(this).serialize();
  console.log(data);
  return ajaxRequest('PUT', url, data, checkLoginState);
}

$('ul.spots li').on('click',function() {
  var idx = $(this).index();
  console.log(idx);
  var marker = markers[idx];

  if(!marker.getMap()) {
    marker.setMap(map);
  } else {
    marker.setMap(null);
  }
});

function getUsers(){
  event.preventDefault();
    return ajaxRequest('GET', '/api/users', null, displayUsers);
}

function displayUsers(data){
  //take user data and display all users (as li's)
  $ul = $('ul.users');
  $ul.emtpy();
  data.users.forEach(function(user) {
    $ul.append('<li class="list-group-item">' + user.username + user.email + '</li>');
  });
}

function logout(){
  //remove the token
  //call the logged out state func
  removeToken();
  checkLoginState();
  console.log("loggedout");

}

function removeToken() {
  // remove the token from localStorage
  localStorage.clear()
}


function showUpdateForm(){
  console.log("trying to show");
  $('section').addClass('hidden');
  $('#updateSpot').removeClass('hidden');
  console.log("clicked");
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

function initialize () {

    var center = new google.maps.LatLng(51.5152,-0.0722);

    map = new google.maps.Map(document.getElementById('map'), {
        center: center,
        zoom: 15,
        // scrollwheel: false

        styles:[
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

      service = new google.maps.places.PlacesService(map);

      // var geocoder = new google.maps.Geocoder();

      // geocoder.geocode({ address: "The Emirates Stadium, London, UK" }, function(results) {

      //   var sillyMarker = new google.maps.Marker({
      //     map:map,
      //     position: results[0].geometry.location,
      //   });
      // });

      // navigator.geolocation.getCurrentPosition(function(pos) {

      //   var pos = new google.maps.LatLng({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      //   console.log(pos.lat(), pos.lng());
      //   var currentMarker = new google.maps.Marker({
      //     map:map,
      //     position: pos,
      //     draggable: true
      //   });

      //   currentMarker.addListener('dragend', function() {
      //     geocoder.geocode({ location: currentMarker.getPosition() }, function(results) {
      //       console.log(results[0].formatted_address);
      //     });
      //   });
      // });


    // console.log(map);

//     var request = {
//       location:center,
//       radius:8047,
//       types:['parks']
//     }
//
//     var service = new google.maps.places.PlacesService(map);
//
//       service.nearbySearch(request, callback);
// }
//
//
// function callback (results, status){
//   if (status == google.maps.places.PlacesServiceStatus.OK){
//     for(var i=0; i<results.length; i++){
//       createMarker(results[i]);
//       console.log(results[i].name);
//     }
//   }
// }

var currentInfoWindow;

  // Makes a request to /cameras, and logs the data returned
  $.get('/api/spots', function(data) {
    // Create pin for each camera!
    var spots = data.spots;

    spots.forEach(function(spot, idx) {
      var marker = new google.maps.Marker({
        position: { lat: parseFloat(spot.lat), lng: parseFloat(spot.lng) },
        visible: true
        // icon: "/images/marker.png"
      });

      var infoWindow = new google.maps.InfoWindow({
        position: { lat: parseFloat(spot.lat), lng: parseFloat(spot.lng) },
        content: spot.name
      });

      marker.addListener('click', function() {
        // Remove one window when another is opened
        if(currentInfoWindow) currentInfoWindow.close();

        currentInfoWindow = infoWindow;
        infoWindow.open(map);
      });

      markers.push(marker);
    });
  });


function createMarker (place){
  var placeLoc = place.geometry.location;
  // console.log(placeLoc);
  var iconBase = "https://maps.google.com/mapfiles/kml/shapes/";
  var marker = new google.maps.Marker({
    map:map,
    position: placeLoc
    // icon: iconBase + 'pharmacy_plus.png'
  });
  markers.push(markers);
  console.log(markers);
}

}
