/*Brandon Ruger
 *AVF 1312*/



var getBeachApp = function(){
    //Test to make sure Device Ready is working
    alert("Device Ready is working");
    
    //Call GeoLocation plugin to get location data
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    
    
}

//GeoLocation success
var geoSuccess = function(currentPos){
    alert(currentPos);
                      
    //Latitude/ Longitude positions
    var latPos = currentPos.coords.latitude;
    var longPos = currentPos.coords.longitude;
    alert(latPos);
    alert(longPos);
                
    //Google Maps API Key = AIzaSyDDS7GwILMDnIHueYHvMLyjdT84s93DIrI
                  
    //URL to access static Google Map for Geolocation
    var mapUrl = "<img src='http://maps.googleapis.com/maps/api/staticmap?center=" + latPos + "," + longPos + "&zoom=12&size=400x400&sensor=true&key=AIzaSyDDS7GwILMDnIHueYHvMLyjdT84s93DIrI' alt='Google Map Image'/>";
    
    //Append map image to geolocation page.              
    $("#geodata").append(mapUrl);
}

//GeoLocation error
var geoError = function(error){
    alert("Geolocation is not working!");
    alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
}

document.addEventListener("deviceready", getBeachApp, false);