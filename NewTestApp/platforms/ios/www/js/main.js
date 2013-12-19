/*Brandon Ruger
 *AVF 1312*/



var getBeachApp = function(){
    //Test to make sure Device Ready is working
    alert("Device Ready is working");
    
    $("#getlocbutton").on('click', function(){
        //Call GeoLocation plugin to get location data
        navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    });
    
    $("#getpicbutton").on('click', function(){
        //Call Camera plugin to take a picture
        navigator.camera.getPicture(camSuccess, camError, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI
        });
    });
    
    
}

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
    var mapUrl = "<img src='http://maps.googleapis.com/maps/api/staticmap?center=" + latPos + "," + longPos + "&zoom=12&size=400x400&sensor=true&key=AIzaSyDDS7GwILMDnIHueYHvMLyjdT84s93DIrI' alt='Google Map Image'/>";
    
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

var camError = function(errorMsg){
    alert("Camera plugin failed due to: " + errorMsg);
}; //End camError


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


//Device Ready Listener - will only work if I put this at the bottom of the page.
document.addEventListener("deviceready", getBeachApp, false);