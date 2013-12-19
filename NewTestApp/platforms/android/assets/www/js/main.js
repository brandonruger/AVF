/*Brandon Ruger
 *AVF 1312
 *Android App*/



var getBeachApp = function(){
    //Test to make sure Device Ready is working
    alert("Device Ready is working");
    
    //Pull GeoLocation Data when Geo button is clicked
    $("#getlocbutton").on('click', function(){
        //Call GeoLocation plugin to get location data
        navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    });
    
    //Take a picture when pic button is clicked
    $("#getpicbutton").on('click', function(){
        alert("Camera button clicked");
        //Call Camera plugin to take a picture
        navigator.camera.getPicture(camSuccess, camError, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI
        });
    });
    
    //View compass when button is clicked
    $("#getcompassbutton").on('click', function(){
        alert("Compass button clicked");
        //Call getcompassbuttoncompass plugin
        navigator.compass.getCurrentHeading(compassSuccess, compassError);
    
    });
    
    //View device info when button is clicked
    $("#devicebutton").on('click', function(){
        alert("Trying to view device info");
        var devInfo = document.getElementById('deviceinfo');
        devInfo.innerHTML = 'Model: '    + device.model    + '<br />' +
                            'Platform: ' + device.platform + '<br />';
    });
    
    //View In-App Browser
    $("#browserbutton").on('click', function(){
        window.open('http://www.google.com', '_blank', 'location=yes');
    });
    
    //Mash Weather & GeoLocation
    $("#weathermashbutton").on('click', function(){
        //Call GeoLocation plugin to use with weather data
        navigator.geolocation.getCurrentPosition(geoWeatherSuccess, geoWeatherError);

    });
    
    //Mash Instagram & GeoLocation
    $("#instamashbutton").on('click', function(){
        //Call GeoLocation plugin to use with Instagram API
        navigator.geolocation.getCurrentPosition(instaGeoSuccess, instaGeoError);
    });
    
    
}; //end getBeachApp()

//Functions for Plugins

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
    var mapUrl = "<img src='http://maps.googleapis.com/maps/api/staticmap?center=" + latPos + "," + longPos + "&zoom=12&size=640x640&sensor=true&key=AIzaSyDDS7GwILMDnIHueYHvMLyjdT84s93DIrI' />";
    
    //Append map image to geolocation page.              
    $("#geodata").append(mapUrl);
}; //End GeoLocation success

//GeoLocation error
var geoError = function(error){
    alert("Geolocation is not working!");
    alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
}; //End GeoLocation error

//Camera success
var camSuccess = function(image){
    alert("Camera plugin is working!");
    var newPic = document.getElementById('cameraphoto');
    newPic.src = "data:image/jpeg;base64," + image;
}; //End camSuccess

//Camera error
var camError = function(errorMsg){
    alert("Camera plugin failed due to: " + errorMsg);
}; //End camError

//Compass success
var compassSuccess = function(compassHeading){
    alert('Heading: ' + compassHeading.magneticHeading);
}; //End compassSuccess

//Compass error
var compassError = function(compassError){
    alert('Compass is not working: ' + compassError.code);
}; //End compassError



//End functions for plugins


//API's

//Weather API
$("#viewweather").on("click", function(){
    //URL to access Weather Source API.
    //Weather key = 1cfe0a133d6e5228
    var urlAdd = "http://api.wunderground.com/api/1cfe0a133d6e5228/conditions/q/33767.json";
        
    $.ajax({
        url: urlAdd,
        dataType: "jsonp",
        success: function(forecast){
            console.log(forecast);
                    
            var temp = "<li>Temperature: " + forecast.current_observation.temperature_string + "</li>";
            var feelsLike = "<li>Feels Like: " + forecast.current_observation.feelslike_string + "</li>";
            var heatIndex = "<li>Heat Index: " + forecast.current_observation.heat_index_string + "</li>";
            var precip = "<li>Precipiation: " + forecast.current_observation.precip_today_string + "</li>";
            var image = "<li><img src='" + forecast.current_observation.icon_url + "' alt='" + forecast.current_observation.icon + "' /></li>";
                    
            $("#weatherdata").append(temp).append(feelsLike).append(heatIndex).append(precip).append(image);
                   
        }
    });
});

//Instagram API
$("#viewphotos").on("click", function(){
    //URL to access recent Instagram photos that are tagged with the word "beach".
    var url = "https://api.instagram.com/v1/tags/clearwaterbeach/media/recent?callback=?&amp;client_id=18839eda02dc42e39ddfe9b7f77d1b61";
    $.getJSON(url, getInstagramPhotos);
});
        
var getInstagramPhotos = function(feed) {
            
    console.log(feed); //To see what data I am getting back from Instagram.
            
    //example HTML for pictures:
    // <li><img src='{url}' alt='{caption}' /></li>
            
    $.each(feed.data, function(index, photodata){
        console.log(photodata.images.standard_resolution.url); //Check to make sure targeting right URL's for photos.
        var photos = "<li><img src='" + photodata.images.standard_resolution.url + "' alt='" + photodata.likes.count + "' /></li>";
                
        $("#instagramdata").append(photos); //Add downloaded photos into "instagramdata" ul.
                
    }); //end each loop
            
            
            
}; //end getInstagramPhotos()



//Mash-Ups

//Weather / GeoLocation Mash-Up
//Weather/GeoLocation success
var geoWeatherSuccess = function(weatherPos){
    alert(weatherPos);
                      
    //Latitude/ Longitude positions
    var geoLat = weatherPos.coords.latitude;
    var geoLong = weatherPos.coords.longitude;
    alert(geoLat);
    alert(geoLong);
    
    //URL to access Weather Source API.
    //Weather key = 1cfe0a133d6e5228
    var urlWeather = "http://api.wunderground.com/api/1cfe0a133d6e5228/conditions/q/" + geoLat + "," + geoLong + ".json";
        
    $.ajax({
        url: urlWeather,
        dataType: "jsonp",
        success: function(weatherGeo){
            alert(weatherGeo);
                    
            var curTemp = "<li>Temperature: " + weatherGeo.current_observation.temperature_string + "</li>";
            var curFeels = "<li>Feels Like: " + weatherGeo.current_observation.feelslike_string + "</li>";
            var curHeat = "<li>Heat Index: " + weatherGeo.current_observation.heat_index_string + "</li>";
            var curPrecip = "<li>Precipiation: " + weatherGeo.current_observation.precip_today_string + "</li>";
            var curImg = "<li><img src='" + weatherGeo.current_observation.icon_url + "' alt='" + weatherGeo.current_observation.icon + "' /></li>";
                    
            $("#weathermashdata").append(curTemp).append(curFeels).append(curHeat).append(curPrecip).append(curImg);
                   
        },
        error: function(weatherErrMsg){
            alert("Can't retrieve weather data!");
        }
    });
                
    
}; //End Weather/GeoLocation success

//Weather/GeoLocation error
var geoWeatherError = function(error){
    alert("Geolocation is not working!");
    alert('code: '    + error.code    + '\n' +
        'message: ' + error.message + '\n');
}; //End Weather/GeoLocation error

//Instagram / GeoLocation Mash-up

//Instagram/GeoLocation Success
var instaGeoSuccess = function(instaPos){
    alert(instaPos);
                      
    //Latitude/ Longitude positions
    var instaLat = instaPos.coords.latitude;
    var instaLong = instaPos.coords.longitude;
    alert(instaLat);
    alert(instaLong);
    
    //URL to access recent Instagram photos that are based on location using the latitude/longitude from GeoLocation data
    var url = "https://api.instagram.com/v1/media/search?lat=" + instaLat + "&lng=" + instaLong + "&amp;client_id=18839eda02dc42e39ddfe9b7f77d1b61";
    $.getJSON(url, getInstagramGeo);
};
        
var getInstagramGeo = function(geoPics) {
            
    alert(geoPics); //To see what data I am getting back from Instagram.
            
    //example HTML for pictures:
    // <li><img src='{url}' alt='{caption}' /></li>
            
    $.each(geoPics.data, function(index, instaGeoData){
        console.log(instaGeoData.images.standard_resolution.url); //Check to make sure targeting right URL's for photos.
        var geoPhotos = "<li><img src='" + instaGeoData.images.standard_resolution.url + "' alt='" + instaGeoData.likes.count + "' /></li>";
                
        $("#instamashdata").append(geoPhotos); //Add downloaded photos into "instamashdata" ul.
                
    }); //end each loop
            
            
            
}; //end instaGeoSuccess()
    
    

//Instagram/GeoLocation Error
var instaGeoError = function(instaError){
    alert("Geolocation is not working!");
    alert('code: '    + instaError.code    + '\n' +
        'message: ' + instaError.message + '\n');
}; //End instaGeoError


//Device Ready Listener - will only work if I put this at the bottom of the page.
document.addEventListener("deviceready", getBeachApp, false);