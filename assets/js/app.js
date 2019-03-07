
var favPeople =["Val Kilmer", "Arnold Swartznegger", "Samuel L Jackson", "Elon Musk", "Conor McGreggor", "Jon Bernthal", "Clint Eastwood", "Anson Mount"]



var addButtons = function () {
    //empty out the div first
    $("#buttons").empty();
    console.log("empty that div");

    for (var i = 0; i < favPeople.length; i++) {
        var newButtons = $("<button>");
        newButtons.attr("data-person", favPeople[i]);
        newButtons.addClass("btn-danger person-btn");
        newButtons.text(favPeople[i]);
        console.log[newButtons[i]];
        $("#buttons").append(newButtons);
       
    }
}


addButtons();


$("#add-person").on("click", function(event){
    
    event.preventDefault();

    var person = $("#person").val().trim();
    console.log("Person = " + person);
    favPeople.push(person);
    addButtons();

});

$("#buttons").on("click", ".person-btn", function() {
    var person = $(this).attr("data-person");
    console.log(person);

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      person + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        var results = response.data;
        console.log(results);
        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div>");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var personImage = $("<img>");
          personImage.attr("data-animate", results[i].images.fixed_height.url);
          personImage.attr("src", results[i].images.fixed_height_still.url);  
          personImage.attr("data-still", results[i].images.fixed_height_still.url);
          personImage.attr("data-state", "still");
          personImage.addClass("gif");
          gifDiv.prepend(p);
          gifDiv.prepend(personImage);
          $("#gifs-appear-here").prepend(gifDiv);

        }
      });
   
  });

$(document.body).on("click", ".gif" ,function () {
    console.log("clicked worked");
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("data-state", "animate");
        $(this).attr('src', $(this).attr("data-animate"));
    } else {
        $(this).attr("data-state", "still");
        $(this).attr('src', $(this).attr("data-still"));
    }
});

