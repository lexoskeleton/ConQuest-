// (function(){ //protect the lemmings
	var map;
function initialize() {
  var myLatlng = new google.maps.LatLng(40.002498,-75.1180329);
  var mapOptions = {
    zoom: 10,
    center: myLatlng
  }
 	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'Hello World!',
      icon: 'http://developerdrive.developerdrive.netdna-cdn.com/wp-content/uploads/2013/08/ddrive.png'
  });
}

// google.maps.event.addDomListener(window, 'load', initialize);

  function kimonoCallback(data) {
  	console.log(data);
    // do something with the data
    // please make sure the scope of this function is global
  }

var url = "https://www.kimonolabs.com/api/3eshj87e?apikey="
	, apiKey = "QBIyYRKhPlysMIt8HE2sDZcxlKQoYVkU"
	, callback = "&callback=kimonoCallback"

  $.ajax({
    "url": url + apiKey + callback,
    "crossDomain":true,
    "dataType":"jsonp"
});

function getLocation(address) {

}

var GoogleMaps = (function(){	// protect the Google Lemmings!

	/*
	 *
	 *	Google maps API module
	 *	we will pull in google maps here
	 *	and create markers here
	 *
	 */

	 // private variables
	 var _centerLatLng, _map;

	 // public variables
	 var mapID			// the ID of the div that stores the map
	 	 , mapOptions	// the obj that holds the google map ooptions
	 	 , mapLat		// latitude for our map's center
	 	 , mapLng		// longitude for our map's center
	 	 , markers;		// an ARRAY of all the markers in our map

	 // private methods

	 // create the google LatLng object
	 function _setCenter( ) {
	 	_centerLatLng = _generateLatLngObj( mapLat, mapLng );
	 }

	 // check if any supplied variable is defined or not
	 function _isDefined( varName ) {
	 	if ( typeof varName === "undefined" ) return false;
	 	else return true;
	 }

	 // we are creating this method because we have two instances
	 // where it is necessary to create a google LatLng object
	 // in _setCenter() we want to create one for the center of our map
	 // in addMarker() we need to create a latLng object for every marker position
	 // instead of rewriting this line of code over and over, we are simply
	 // adding a private method that will do this for us
	 function _generateLatLngObj( lat, lng ) {
	 	return new google.maps.LatLng( lat, lng );
	 }

	 // public methods
	 /*
	  *
	  *	Setters for our public variables
	  *
	  */

	  // set the ID of the div that will hold the map
	  function setMapID( id ) {
	  	mapID = id;
	  }	// setMapID

	  // set the options that google maps api expects
	  function setMapOptions( options ) {
	  	mapOptions = options;
	  }	// setMapOptions

	  // set the lat and lng for the map center
	  function setLatLng( lat, lng ) {
	  	mapLat = lat;
	  	mapLng = lng;

	  	_setCenter( );
	  } // setLatLng

	  /*
	   *
	   * Getter methods
	   *
	   */
	   function getMarkers() {
	   		return markers;
	   }

	 /*
	  *
	  *	method: initializie
	  *	this will create the google map
	  * this method depends on:
	  *		mapID
	  *		mapOptions
	  *		_centerLatLng
	  *	being defined! Otherwise, it will shut out
	  *
	  */
	 function initialize( ) {

	 	if (	// if mapID, mapOptions, _centerLatLng is undefined, quit
	 		_isDefined( mapID ) 				=== false
	 		&& _isDefined( mapOptions ) 		=== false
	 		&& _isDefined( _centerLatLng ) 	=== false
	 	) return;

	 	// if we make it here, all the necessary variables are defined
	 	mapOptions.center = _centerLatLng;

	 	_map = new google.maps.Map(
	 		document.getElementById( mapID )
	 		, mapOptions
	 	);

		  var marker = new google.maps.Marker({
		      position: myLatlng,
		      map: map,
		      title: 'Hello World!',
		      icon: 'http://developerdrive.developerdrive.netdna-cdn.com/wp-content/uploads/2013/08/ddrive.png'
		  });
	 }

	 /*
	  *
	  *	this method will create a marker and add it to our map
	  *
	  */
	  function addMarker( markerOptions, lat, lng ) {
	  		// these are the default markers options
	  		var defaultMarkerOptions = {
	  			map: _map
	  			, position: _generateLatLngObj( lat, lng )
	  		};

	  		// we need to combine these with the options the user gives
	  		$.extend( defaultMarkerOptions, markerOptions );

	  		var currentMarker = new google.maps.Marker( defaultMarkerOptions );

	  		// add to the markers array
	  		makers.push( currentMarker );
	  }


	 // exposed API
	 return {
	 	addMarker		: addMarker
	 	, getMarkers 	: getMarkers
	 	, initialize 	: initialize
	 	, setLatLng 	: setLatLng
	 	, setMapID 		: setMapID
	 	, setMapOptions	: setMapOptions
	 }

})();	// GoogleMaps


/*
 *
 *	create the google maps instance
 *
 */
GoogleMaps.setMapID( 'map-canvas' );

GoogleMaps.setMapOptions({ zoom: 5 });

GoogleMaps.setLatLng(45.002498,-75.1180329);

google.maps.event.addDomListener(window, 'load', GoogleMaps.initialize);









// })(); lemmings