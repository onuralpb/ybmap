var map = null;
var marker = null;
var MapLocation = {
    Latitude: null,
    Longitude: null,
    IsSelected: false,
    setData: function(latLng) {
        if (latLng != undefined || latLng != null) {
            this.Latitude = latLng.lat();
            this.Longitude = latLng.lng();
            this.IsSelected = true;
            $('#cancelInterviewLocation').show();
        } else {
            this.Latitude = null;
            this.Longitude = null;
            this.IsSelected = false;
            $('#cancelInterviewLocation').hide();
        }
    }
};

function init() {
    var initialZoom = MapLocation.IsSelected ? 16 : 10;
    var mapOptions = {
        center: new google.maps.LatLng(41.306553, 28.634947),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        draggable: true,
        streetViewControl: false,
        panControl: false,
        zoom: initialZoom,
        maxZoom: 16,
        minZoom: 6
    };
    var selector = document.getElementById("googleMapSelector");
    map = new google.maps.Map(selector, mapOptions);
    map.setCenter(mapOptions.center);
    google.maps.event.addListener(map, 'click', function(e) {
        setMarker(e.latLng);
        MapLocation.setData(e.latLng);
        console.log(MapLocation);
    });
}
var setMarker = function(latLng) {
    if (marker == null) {
        marker = new google.maps.Marker({
            position: latLng,
            map: map,
            draggable: true,
            title: "Pozisyonu iptal etmek için üzerine tıklayınız." + " (" + latLng.lat() + " - " + latLng.lng() + ")"
        });
        google.maps.event.addListener(marker, 'click', function() {
            marker.setMap(null);
            MapLocation.setData(null);
        });
    } else {
        if (marker.getMap() == null) {
            marker.setMap(map);
        }
        marker.setPosition(latLng);
        marker.setTitle("Pozisyonu iptal etmek için üzerine tıklayınız." + " (" + latLng.lat() + " - " + latLng.lng() + ")");
    }
};
var setMapSelectedLocation = function(lat, long) {
    var latLng = new google.maps.LatLng(lat, long);
    setMarker(latLng);
    map.setCenter(latLng);
    map.setZoom(16);
    MapLocation.IsSelected = true;
    $('#cancelInterviewLocation').show();
};
var setMapDefaultLocation = function() {
    MapLocation.setData(null);
    map.setCenter(new google.maps.LatLng(41.306553, 28.634947));
    map.setZoom(10);
    marker.setMap(null);
};
init();
/*
    google.maps.event.trigger(map, 'resize');
    if (marker != null) {
        map.setCenter(marker.getPosition());
        map.setZoom(zoomLevel);
    }
*/