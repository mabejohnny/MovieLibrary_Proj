(function($){
    function processForm( e ){
        var dict = {
        	Title : this["title"].value,
            Director: this["director"].value,
            Genre: this["genre"].value,
            Image: this["image"].value
        };

        $.ajax({
            url: 'https://localhost:44325/api/movie',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(dict),
            success: function( data, textStatus, jQxhr ){
                $('#response pre').html( data );
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });

        e.preventDefault();
    }

$('#my-form').submit( processForm );


})(jQuery)
$(document).ready(
    
    getMovies());


function editMovie(id){
    
    
    let title =prompt("please enter the movie title");
    let director =prompt ("please enter the movie director");
    let genre =prompt("please enter the movie genre");
    let image = prompt("please enter the url for the image")
    var dict = {
        Title: title,
        Director: director,
        Genre: genre,
        Image: image
    };

    
    $.ajax({
        
        url: `https://localhost:44325/api/movie/${id}`,
        dataType: 'json',
        type: 'put',
        contentType: 'application/json',
        data: JSON.stringify(dict),
        success: function(data, textStatus, jQxhr ){
            $('#allMoviesTable').html( data );
           getMovies();
            
        },       
        error: function( jqXhr, textStatus, errorThrown ){
        console.log( errorThrown );
    
}

});
}
function getMovies(){
    
    $.ajax({
        url: 'https://localhost:44325/api/movie',
        dataType: 'json',
        type: 'get',
        contentType: 'application/json',
        success: function( data, textStatus, jQxhr ){   
            data.map(function(value){
                
                $("#allMoviesTable").append(
                    `<tr>
                        <td>${value.title}</td>
                        <td>${value.director}</td>
                        <td>${value.genre}</td>
                        <td>
                            <button onclick ='editMovie(${value.movieId})'>Edit</button>
                        </td>
                        <td> <img src= "${value.image}" alt=" Movie Poster" width: "auto" height= "100 px"></td>
                    </tr>`
                )
            })
        },
});
}