# A jQuery Google Map wrapper

A small plugin that handle the google map API. Why? It's prettier. I also included a working example. It's certainly the most powerful plugin out there but it's simple, and pretty easy to extend and make it your own.

# How it work


## Inititalization

The first thing you will want to do is, of course, create a map. For that you will have to link all files and instantiate the class.


    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js" type="text/javascript"></script>
    <script src="js/helperGoogleMap.js" type="text/javascript"></script>
    $(document).ready(function() {
        var usamap = new HelperGoogleMap({
            "container" :"gMap",   // HTML Id of the map container
            "zoom"  : 4,   // Map Zoom Level
            "center" : new google.maps.LatLng(39.639538, -97.470703), // Map starting position in latitude and Longitude
            "mapTypeId" : google.maps.MapTypeId.SATELLITE // Type of map: SATELLITE, ROADMAP, HYBRID, TERRAIN
        });
    });


## Adding markers

By now, you should have a map pointing on the US. Now we want to add markers and bubbles linked to them of course!

    var addresses = { “markers” : [
        {"title":"This is bubble text1", "address" : "1 Learjet Way, Wichita, KS, United States"},
        {"title":"This is bubble text2", "address" : "1 Croton Point Avenue, Croton On Hudson, NY, United States"}
    ]}

usamap.AddMarkers(addresses)

The title will be push into the information bubble, you could also put HTML tags in there. As for the address, there is a little bit of magic happening. You can’t send directly an address into the map and get a marker, you need to use what Google call, the geocoder, to get the longitude and latitude, and after that push them to the map. You could alternatively directly use the latitude and longitude following this pattern:


    var myLatlng = new google.maps.LatLng(-25.363882,131.044922);
    var myLatlng2 = new google.maps.LatLng(-25.363882,131.044922);
    var addresses = { "markers" : [
        {"title":"This is title 1", "address" : myLatlng },
        {"title":"This is title 2", "address" : myLatlng2}
    ]}
    usamap.AddMarkers(addresses)

## Removing markers

For now You can only remove all the markers, you cannot select them.

    usamap.RemoveAllMarkers();

