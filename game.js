var level = 0
var started = false
var userClickedPattern = []
var gamePattern = []
var buttonColors = ["red", "blue", "green", "yellow"]


$(document).on("keydown", function() {
    if (!started) {
        $("h1").text("Level 1")
        setTimeout(function() {
            nextSequence()
        }, 800)
        
        started = true
    }
})


$(".btn").on("click", function() {

    if (started) {

        var userChosenColor = $(this).attr("id")
        animatePress(userChosenColor)
        userClickedPattern.push(userChosenColor)
        console.log(userClickedPattern)
        checkAnswer(userClickedPattern.length-1)

    }

})


function nextSequence() {

    userClickedPattern = []
    var randomNumber = Math.floor(Math.random()*4)
    var randomChosenColor = buttonColors[randomNumber]
    gamePattern.push(randomChosenColor)
    level ++
    $("h1").text(`Level ${level}`)
    $(`#${randomChosenColor}`).fadeIn(100).fadeOut(100).fadeIn(100)
    playSound(randomChosenColor)
    
}


function playSound(name) {
    var audio = new Audio(`sounds/${name}.mp3`)
    audio.play()
}


function animatePress(pressed_button) {
    $(`#${pressed_button}`).addClass("pressed")

    setTimeout(function() {
        $(`#${pressed_button}`).removeClass("pressed")
    }, 100)
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("Success")
        playSound(userClickedPattern[currentLevel])

        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(function () {
                nextSequence()
            }, 1000)
        }
    }
    else {
        console.log("Wrong")
        $("h1").text("Game Over, Press Any Key to Restart")
        playSound("wrong")
        $("body").addClass("game-over")
        setTimeout(function() {
            $("body").removeClass("game-over")
        }, 200)
        
        startOver()
    }
}


function startOver () {
    level = 0
    started = false
    gamePattern = []
}