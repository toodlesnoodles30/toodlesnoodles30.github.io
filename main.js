 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBj-UBQEW0cJ_WYWwHRGCUCCB6yWgL7Ha0",
    authDomain: "reservation-site-bddbe.firebaseapp.com",
    databaseURL: "https://reservation-site-bddbe.firebaseio.com",
    projectId: "reservation-site-bddbe",
    storageBucket: "",
    messagingSenderId: "634382859682"
  };
  firebase.initializeApp(config);
var database = firebase.database();


// initialize the configuration of map
var map = new google.maps.Map(document.getElementById('map'), {
	center: {lat: 40.8054491, lng: -73.9654415},
	zoom: 15
});

// use Marker constructor to add a marker to map
var marker = new google.maps.Marker({ 
	position: {lat: 40.8054491, lng: -73.9654415},
	map: map,
	title: 'Monks Café'

});


// try shit zone for JS validation
function validateForm() {
    var x = forms["reservation-form"]["reservation-name"].value;
    if (x == "") {
        alert("Name must be filled out");
        return false;
    }
}




// create reservationData object which will be populated with user input
$('.reservation-form').on('submit', function(event) { //
  event.preventDefault(); //when submitted, the name data should be set

  var day = $('.reservation-day').val();
  var name = $('.reservation-name').val();

// create a section for reservations data in your db
  var reservationsReference = database.ref('reservations');

  reservationsReference.push({
    name: name,
    day: day
  });
});


// retrieve reservations data when page loads and when reservations are added
function getReservations() {
  
  database.ref('reservations').on('value', function(results) {
  // use reference to database to listen for changes in reservations data
    
      var allReservations = results.val();// Get all reservations stored in the results we received back from Firebase
      // $('.reservations').empty();// remove all list reservations from DOM before appending list reservations
    
    
for (var reservation in allReservations) { // iterate (loop) through all reservations coming from database call
var context = { // Create an object literal with the data we'll pass to Handlebars
        name: allReservations[reservation].name,
        day: allReservations[reservation].day, //cant connect day to firebase
        reservationId: reservation
      };
      
    
    // Get the HTML from our Handlebars reservation template
      var source = $("#reservation-template").html();

      // Compile our Handlebars template
      var template = Handlebars.compile(source);

      // Pass the data for this reservation (context) into the template
      var reservationListItem = template(context);

    };
      // Append newly created reservation to reservations list.
      $('.reservations').append(reservationListItem);

  });
};


getReservations();// When page loads, get reservations





