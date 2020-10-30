(function($){
    function processForm( e ){
        var dict = {
        	Title : this["title"].value,
            Director: this["director"].value,
            Genre: this["genre"].value
        };

        $.ajax({
            url: 'https://localhost:44325/api/movie',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(dict),
            success: function( data, textStatus, jQxhr ){
                console.log("success");
                $('#response pre').html( data );
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });

        e.preventDefault();
    }

$('#my-form').submit( processForm );

})
$(document).ready(
    
    getMovies());


function deleteMovie(value){

    

    $.ajax({
        url: `https://localhost:44325/api/movie/${value}`,
        dataType: 'json',
        type: 'delete',
        contentType: 'application/json',
        data: JSON.stringify({}),
        success: function(data, textStatus, jQxhr ){
            
            alert("The movie has been deleted");
            

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
            //$('#response pre').html( JSON.stringify(data) );
            
            data.map(function(value){
                console.log(value.movieId);
                $("#allMoviesTable").append(
                    `<tr>
                        <td>${value.title}</td>
                        <td>${value.director}</td>
                        <td>${value.genre}</td>
                        <td>
                        
                            <button>Edit</button>
                            <button onclick ='deleteMovie(${value.movieId})'>Delete</button>
                        </td>
                    </tr>`
                )
            })
        },
});
}