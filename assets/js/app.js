
var favPeople =["Val Kilmer", "Arnold Swartznegger", "Samuel L Jackson", "Elon Musk", "Conor McGreggor", "Jon Bernthal", "Clint Eastwood", "Anson Mount"]
var firstRun = true


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

if (firstRun){
addButtons();
firstRun = false;
}
$("#add-person").on("click", function(event){
    event.preventDefault();
    var person = $("#person").val().trim();
    console.log("Person = " + person);
    favPeople.push(person);
    console.log(favPeople);
    addButtons();

});

$(".person-btn").on("click", function() {
    var person = $(this).attr("data-person");
    console.log(person);

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      person + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div>");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var personImage = $("<img>");
          personImage.attr("src", results[i].images.fixed_height.url);

          gifDiv.prepend(p);
          gifDiv.prepend(personImage);

          $("#gifs-appear-here").prepend(gifDiv);
        }
      });
   
  });

