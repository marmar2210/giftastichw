var topics = ["Kelp Forest", "Sharks", "Dolphins", "Penguins", "Sea Turtles"];

// Show Buttons
function showButtons() {
  $("#buttonHolder").empty();
  for (var i = 0; i < topics.length; i++) {
    var animalType = topics[i];
    console.log(animalType);
    var button = $("<button>");
    button.text(animalType);
    button.addClass("gifBtn");
    button.attr("data-animal", animalType);
    $("#buttonHolder").append(button);
  }
}
showButtons();
displayGifs();

// display gifs & ajax

function displayGifs() {
  $(".gifBtn").on("click", function() {
    $("#gifs-appear-here").empty();

    var animal = $(this).attr("data-animal");

    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      animal +
      "&api_key=uKX1nS2ktlKRylod1a50NtrrJHEyqNZE&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // data coming back
      .then(function(response) {
        console.log(queryURL);

        console.log(response);
        // storing the data
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var p = $("<p>").text("Rating: " + results[i].rating);

          var animalImage = `<img class="gif" data-state="still" src="${results[i].images.fixed_height_still.url}" data-animate="${results[i].images.fixed_height.url}" data-still="${results[i].images.fixed_height_still.url}">`;

          $("#gifs-appear-here").prepend(p);
          $("#gifs-appear-here").prepend(animalImage);
        }
      });
  });
}

// Click event for gifs
$(document).on("click", ".gif", function(e) {
  var state = $(this).attr("data-state");
  var animate = e.currentTarget.dataset.animate;
  var still = e.currentTarget.dataset.still;

  if (state === "still") {
    $(this).attr("src", animate);
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", still);
    $(this).attr("data-state", "still");
  }
});

$("#add-animal").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input value
  var newAnimal = $("#animal-input")
    .val()
    .trim();

  topics.push(newAnimal);

  showButtons();
  displayGifs();
});
