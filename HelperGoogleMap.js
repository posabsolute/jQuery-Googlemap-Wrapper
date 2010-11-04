/*
 * Google Map helper
 * Class : HelperGoogleMap
 * Copyright(c) 2010, Cedric Dugas & w.illi.am/
 * MIT Licence
 * Description: Load a google map with markers and information bubbles
 */
 
var HelperGoogleMap = function(extendOptions) {
	var HelperGoogleMap = this; // keep scope
	var geocoder;
	this.saveMarkers = [];
	var options = {
		"container"	:"gMap",
		"zoom"		: 4,
		"center"	: new google.maps.LatLng(39.639538, -97.470703),
		"mapTypeId"	: google.maps.MapTypeId.SATELLITE 
	}
	if(extendOptions !== undefined) $.extend(true, options, extendOptions)			// Extend options
	
	var googleOptions = {
		zoom: options.zoom,
		center: options.center,
		mapTypeId: options.mapTypeId
	}
	
	function init(){
		geocoder = new google.maps.Geocoder();													// Start Geocoder for retriving address position
		HelperGoogleMap.map = new google.maps.Map(document.getElementById(options.container), googleOptions);	// Add map to website
	}
	HelperGoogleMap.AddPosition = function(theMarker){

		var marker = new google.maps.Marker({				// Add markers to the map
          map: this.map, 
          position: theMarker.positions,
          title : theMarker.title
      	});

      	this.saveMarkers.push(marker)
      	var infowindow = new google.maps.InfoWindow({		// Add bubbles linked to the markers
		    content: theMarker.title
		});
      	google.maps.event.addListener(marker, 'click', function() {
		  	infowindow.open(map,marker);
		});
	}
	HelperGoogleMap.AddMarkers = function(addresses){
		$.each(addresses.markers, function(index, theMarker){
			if(typeof theMarker.address != "object") HelperGoogleMap.ConvertAddress(theMarker);		// Retreive positions from address for each marker	
		})
	}
	HelperGoogleMap.ConvertAddress = function(theMarker){
		if (geocoder) {
		
	      geocoder.geocode( { 'address': theMarker.address}, function(results, status) {  	
		
	        if (status == google.maps.GeocoderStatus.OK) {
	            theMarker.positions =  results[0].geometry.location;
	            HelperGoogleMap.AddPosition(theMarker);
	        } else {
	          	alert("Geocode was not successful for the following reason: " + status);
	        }
	      });
    	}
	}
	HelperGoogleMap.RemoveAllMarkers = function(){
		if (this.saveMarkers[0]) {
		    for (i in this.saveMarkers) {
		      this.saveMarkers[i].setMap(null);
		    }
		    this.saveMarkers.length = 0;
	  	}
	}
	$(document).ready(function() {	// needed if you put your script in the head
		init();
	})
};



