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
        var url = "https://api.instagram.com/v1/tags/beach/media/recent?callback=?&amp;client_id=18839eda02dc42e39ddfe9b7f77d1b61";
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
        var url = "https://api.weathersource.com/v1/d3846647f5a2668d6143/history_by_postal_code.json?period=day&postal_code_eq=33770&country_eq=US&fields=postal_code,tempMax,tempAvg,tempMin,precip,windSpdAvg,feelsLikeMax,feelsLikeAvg,relHumMax,relHumAvg"
        $.getJSON(url, getWeatherData);
    });
    
    var getWeatherData = function(forecast) {
        
        console.log(forecast); //To see what weather data I receive from Weather Source.
        
    }; //end getWeatherData
    
})