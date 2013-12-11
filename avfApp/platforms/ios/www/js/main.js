/*Brandon Ruger
 *AVF 1312*/

$('#home').on('pageinit', function(){
    //code needed for home page goes here
});

$('#research').on('pageinit', function(){
    //code needed for research page goes here
});

$('#instagrampage').on('pageinit', function(){
    //code needed for instagram API page goes here
    
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
    
});

$('#weatherpage').on('pageinit', function(){
    //code needed for weather API page goes here.
    
    $("#viewweather").on("click", function(){
        //URL to access Weather Source API.
        //Weather key = 1cfe0a133d6e5228
        var urlAdd = "http://api.wunderground.com/api/1cfe0a133d6e5228/conditions/q/33767.json";
    //    $.getJSON(url, getWeatherData);
    //});
    //
    //var getWeatherData = function(forecast) {
    //    
    //    console.log(forecast); //To see what weather data I receive from Weather Source.
    //    
    //}; //end getWeatherData
    
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
    
    
});

$('#geolocpage').on('pageinit', function(){
    
    document.addEventListener("deviceready", getGeoLocation);
    
    var getGeoLocation = function(){
   
        //Function to get current location
        $("#getlocbutton").on("click", function(){
             
             
             //To access geolocation data
             navigator.geolocation.getCurrentPosition(success, error);
             
             //Function to run if geolocation data pulls successfully
             var success = function (currentPos) {
              console.log(currentPos);
              
              //Latitude/ Longitude positions
              var latPos = currentPos.coords.latitude;
              var longPos = currentPos.coords.longitude;
              
              //Google Maps API Key = AIzaSyDDS7GwILMDnIHueYHvMLyjdT84s93DIrI
              
              //URL to access static Google Map for Geolocation
              var mapUrl = "<img src='http://maps.googleapis.com/maps/api/staticmap?center=" + latPos + "," + longPos + "&zoom=13&size=600x300&key=AIzaSyDDS7GwILMDnIHueYHvMLyjdT84s93DIrI' />";
              
              $("#geodata").append(mapUrl);
             
             };
             
             //To run if an error occurs
             var error = function (){
                alert("Error, please try again!");
             }
        });
    };
});