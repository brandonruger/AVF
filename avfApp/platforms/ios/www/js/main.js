/*Brandon Ruger
 *AVF 1312*/

$('#home').on('pageinit', function(){
    //code needed for home page goes here
});

$('#research').on('pageinit', function(){
    //code needed for research page goes here
});

$('#instagrampage').on('pageinit', function(){
    //code needed for instagram page goes here
    
    
    
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
    
    
    
    
    
    
    
    
})