var KimonoLabs = (function(){	// protect the hemmings!

	/*
	 *
	 *	Kimono Labs API module
	 *	we will pull in kimono labs API data here
	 *
	 */

	 // private variables
	 var _url 		= "https://www.kimonolabs.com/api/3eshj87e"
	 	 , _apiKey 	= "QBIyYRKhPlysMIt8HE2sDZcxlKQoYVkU";

	 // private methods

	 // public methods
	 /*
	  *
	  *	makes the ajax call to kimono labs
	  *	this methods takes in one argument
	  *		callback: a function that gets run after the ajax call comes back
	  *
	  */
	  function getData( onDataSuccess ) {

	  		var dataObj = {
	  			apikey 			: _apiKey
	  		}
	  		, ajaxOptions = {
	  			url 			: _url
	  			, data 			: dataObj
	  			, crossDomain	: true
	  			, cache			: true
	  			, dataType		: 'jsonp'
	  			, success 		: onDataSuccess
	  			
	  		};

	  		$.ajax( ajaxOptions );
	  }

	 // exposed API
	 return {
	 	getData: getData
	 }

})();

var GoogleMaps = (function(){	// protect the Google Lemmings!

	/*
	 *
	 *	Google maps API module
	 *	we will pull in google maps here
	 *	and create markers here
	 *
	 */

	 // private variables
	 var _centerLatLng
	 	, _map
	 	, _geocodingURL = 'https://maps.googleapis.com/maps/api/geocode/json';

	 // public variables
	 var mapID					// the ID of the div that stores the map
	 	 , mapOptions			// the obj that holds the google map ooptions
	 	 , mapLat				// latitude for our map's center
	 	 , mapLng				// longitude for our map's center
	 	 , markers = [];		// an ARRAY of all the markers in our map

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

	 	// this is a custom event that we are triggering
	 	
	 	$( document ).trigger( 'googleMapsLoaded' );

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
	  		markers.push( currentMarker );
	  }
	  /*
	   *
	   *	this method will implement the geocoding api
	   *	it expects an address, which it will convert into a lat, lng
	   *	then, it iwll run the addMarker method
	   *
	   */
	   function geoCodeAddress( address, callback ) {
	   		// this will have all the agruments (the ?address=, etc)
	   		// that the ajax call requires
	   		var defaultMarkerData = {
	   			address: address
	   		};

	   		// this will make the request and feed into a callback
	   		$.ajax({
	   			url: _geocodingURL
	   			, data: defaultMarkerData
	   			, success: callback
	   		});
	   }


	 // exposed API
	 return {
	 	addMarker			: addMarker
	 	, geoCodeAddress	: geoCodeAddress
	 	, getMarkers 		: getMarkers
	 	, initialize 		: initialize
	 	, setLatLng 		: setLatLng
	 	, setMapID 			: setMapID
	 	, setMapOptions		: setMapOptions
	 }

})();	// GoogleMaps


/*
 *
 *	create the google maps instance
 *
 */
GoogleMaps.setMapID( 'map-canvas' );

GoogleMaps.setMapOptions({ zoom: 5 });

GoogleMaps.setLatLng(39.50, -98.35);

google.maps.event.addDomListener(window, 'load', GoogleMaps.initialize);

/*
 *
 *	once the googleMapsLoaded event is called (which our GoogleMaps module is set up to do)
 *	we will kick off the KimonoLabs module
 *	we do this because module crosstalk is bad practice
 *
 */

$( document ).on( 'googleMapsLoaded', function( e ) {
	KimonoLabs.getData( onKimonoSuccess );
});

/*
 *
 *	this section of the code will handle calbacks for our modules
 *	specifically, we will 
 *		handle the kimonosuccess data stuff
 *		we will parse data and grab addresses
 *		we will take those address and geocode
 *		on geocode complete, we will create marker
 *		last, we will update map
 *
 */
var __ICON__ = "styles/fun_speech_bubble.png"

// this function is called when the google maps api loads the map
// we pull in kimono data and then call this guy to procss said data
function onKimonoSuccess( data ) {
	// this will hold all the results from kimono for conventions
	var results = data.results.collection1;

	for ( var i = 0; i < results.length; i++ ) {
		var curr = results[ i ];

		// let's grab the relevant data from results
		var eventTitle 		= curr.event_name.text
			, eventAddress 	= curr.event_address.href;

		// we are going to implement a hack where we retrieve
		// the "pretty" address from google maps href
		// and not the address 'text' value
		// let's split the href by the q=, which should
		// leave us with google maps base url on one side
		// and the actual address on the other
		eventAddress = eventAddress.split( 'q=' );

		// save the actual address
		var actualAddress = eventAddress[ 1 ];

		// call the geoCode method
		// DUE TO GOOGLE's RATE LIMIT
		// we have added a setTimeout 
		setTimeout(
			onAfterTimeout( actualAddress, eventTitle )
			, 50
		);


	}
}

// again, we are saving stuff to a closure so that we can freeze
// our address and title in time
function onAfterTimeout( actualAddress, eventTitle ) {
	return function() {
		GoogleMaps.geoCodeAddress(
			actualAddress
			, onGeoCodeSuccess( eventTitle )
		);
	} // return
}

// this function is called when the kimono data is retrieved
// we call the geoCode API to pull in lat lngs for our marker
function onGeoCodeSuccess( eventTitle ) {
	// ALL $.ajax callbacks expect a function reference
	// we are doing a trick here where we call a function
	// that returns a function
	// the function that gets returned (below)
	// is what gets called when data comes back successfull
	// but the wrapper function onGeoCodeSuccess, "traps"
	// all the variables that we need
	return function ( data ) {
		var markerOptions = {
			title: eventTitle
			, icon: __ICON__
		};

		if ( data.results.length === 0 ) return;

		// if we made it here, then there are results, so display
		var lat = data.results[ 0 ].geometry.location.lat;
		var lng = data.results[ 0 ].geometry.location.lng;
		GoogleMaps.addMarker( markerOptions, lat, lng );

	} // return function
} // onGeoCodeSuccess





// })(); lemmings