/*Brandon Ruger
 *AVF 1312*/

document.addEventListener("deviceready", onDeviceReady, false);

var onDeviceReady = function(){
    alert("Device Ready is working");
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

//Success GeoLocation
var onSuccess = function(position){
    alert("Geolocation is working!");
    var element = document.getElementById('geodata');
        element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
                            'Longitude: '          + position.coords.longitude             + '<br />' +
                            'Altitude: '           + position.coords.altitude              + '<br />' +
                            'Accuracy: '           + position.coords.accuracy              + '<br />' +
                            'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
                            'Heading: '            + position.coords.heading               + '<br />' +
                            'Speed: '              + position.coords.speed                 + '<br />' +
                            'Timestamp: '          + position.timestamp                    + '<br />';
}

//Error
var onError = function(error){
    alert("Geolocation is not working!");
    alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
}

    