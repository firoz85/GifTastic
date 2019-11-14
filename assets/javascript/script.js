

var animalsArr = ["Kangaroo", "Tiger", "Koala", "Goat", "Cow",
                  "Giraffe", "Horse", "Deer", "Elephant", "Lizard",
                  "Panda"];
                  

// create button according to animals name
function animalButtons() {
  $("#buttonPanel").empty();

  for (var i = 0; i < animalsArr.length; i++) {
    var button = $("<button>");
    button.addClass("animalButton");
    button.attr("data-animal", animalsArr[i]);
    button.text(animalsArr[i]);

    $("#buttonPanel").append(button);
  }
}

function animalGifs() {
  var animalName = $(this).attr("data-animal");
  var animalStr = animalName.split(" ").join("+");
  
  // Giphy Api Key
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animalStr +
                 "&api_key=YUZbC2S3DdxaWBqFBc3MNzOxK5Z7VuQL";
  $.ajax({
    method: "GET",
    url: queryURL,
  })
  .done(function( result ) {
    var dataArray = result.data;

    $("#gifPanel").empty();
    for (var i = 0; i < dataArray.length; i++) {
      var newDiv = $("<div>");
      newDiv.addClass("animalGif");

      var newRating = $("<h2>").html("Rating: " + dataArray[i].rating);
      newDiv.append(newRating);

      var newImg = $("<img>");
      newImg.attr("src", dataArray[i].images.fixed_height_still.url);
      newImg.attr("data-still", dataArray[i].images.fixed_height_still.url);
      newImg.attr("data-animate", dataArray[i].images.fixed_height.url);
      newImg.attr("data-state", "still");
      newDiv.append(newImg);
      $("#gifPanel").append(newDiv);
    }
  });
}

function animateAnimalGif() {
  var state = $(this).find("img").attr("data-state");
  if (state === "still") {
    $(this).find("img").attr("src", $(this).find("img").attr("data-animate"));
    $(this).find("img").attr("data-state", "animate");
  } else {
    $(this).find("img").attr("src", $(this).find("img").attr("data-still"));
    $(this).find("img").attr("data-state", "still");
  }
}

$(document).ready(function() {
  animalButtons();
});

$(document).on("click", ".animalButton", animalGifs);

$(document).on("click", ".animalGif", animateAnimalGif);
