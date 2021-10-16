var buttonColours = ["red", "blue", "green", "yellow"] ;

var gamePattern = [];
var userClickedPattern = [];

function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100) ;
  playSound(randomChosenColour);
}

function playSound(color){
  var sound = new Audio("sounds/" + color + ".mp3");
  sound.play();
}

$(".btn").click(function(){
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(buttonColours.indexOf(userChosenColour));
});


function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  }, 100 )
}


var level = 0 ;
var started = false;
$(document).on('keydown', function(){
  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function checkAnswer(currentLevel){

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      } , 1000);
    }
  } else {
    playSound("wrong");
    $("#level-title").text("Game Over please start again");
    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}


function startOver(){
  started = false;
  level = 0;
  userClickedPattern = [];
}
