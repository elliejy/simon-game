
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userChosenPattern = [];

var level = 0;
var started = false;

$(document).keydown(function() {
    if (!started) {
        $("#level-title").text("Level "+ level);
        nextSequence();
        started = true;
    }
});


function checkAnswer(currentLevel){
   
        if (gamePattern[currentLevel] === userChosenPattern[currentLevel]){
            console.log("success");
            if (userChosenPattern.length === gamePattern.length){
                setTimeout(function () { nextSequence(); }, 1000);
            }
        }
        else {
            console.log("wrong");
            playSound("wrong");
            $("body").addClass("game-over");
            setTimeout(function () { $("body").removeClass("game-over")}, 200);
            $("h1").text("Game Over, Press Any Key to Restart");
            startOver();
        }
    
   
}

function nextSequence(){
    userChosenPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    animatePress(randomChosenColour);
    playSound(randomChosenColour);
      
}


$(".btn").click(function () {
    var userChosenColour = this.id;
    userChosenPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);

    checkAnswer(userChosenPattern.length-1);

})

function startOver(){
    level = 0;
    gamePattern=[];
    started = false;
}

// Shared Functions

function playSound(color) {
    var audio = new Audio("sounds/"+ color + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("." + currentColor).addClass("pressed");
    setTimeout(function () { $("." + currentColor).removeClass("pressed"); }, 100);
}