var buttonKeys = ["w", "a", "s", "d", "j", "k", "l"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// Load High Score from Local Storage
var highScore = localStorage.getItem("drumHighScore") || 0;
document.getElementById("high-score").innerText = highScore;

// --- EVENT LISTENERS ---

// 1. START BUTTON LISTENER
document.getElementById("start-btn").addEventListener("click", function() {
    if (!started) {
        startGame();
    }
});

// 2. KEYBOARD LISTENER
document.addEventListener("keydown", function(event) {
  if (!started) {
    // Optional: Enable this if you want keys to ALSO start the game
    // startGame(); 
  } else {
    if (buttonKeys.includes(event.key)) {
        handleInput(event.key);
    }
  }
});

// 3. MOUSE CLICK LISTENER
var drums = document.querySelectorAll(".drum");
for (var i = 0; i < drums.length; i++) {
  drums[i].addEventListener("click", function() {
    var userChosenKey = this.innerHTML; 
    handleInput(userChosenKey);
  });
}

// --- GAME LOGIC ---

function startGame() {
    started = true;
    level = 0;
    gamePattern = [];
    document.getElementById("start-btn").style.display = "none"; // Hide button
    nextSequence();
}

function handleInput(key) {
  if(!started) return; 

  userClickedPattern.push(key);
  
  // Use your function to play sound
  makeSound(key);
  
  animatePress(key);
  checkAnswer(userClickedPattern.length - 1);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    // GAME OVER LOGIC
    
    // Play wrong sound (handled manually since it's not in the switch case)
    var wrongAudio = new Audio("sounds/wrong.mp3");
    wrongAudio.play();
    
    document.querySelector("body").classList.add("game-over");
    document.getElementById("level-title").innerText = "Game Over!";
    
    // Show start button again
    document.getElementById("start-btn").style.display = "inline-block";
    document.getElementById("start-btn").innerText = "Restart";

    setTimeout(function() {
      document.querySelector("body").classList.remove("game-over");
    }, 200);

    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  
  // Update UI
  document.getElementById("level-title").innerText = "Level " + level;
  document.getElementById("current-level").innerText = level;

  // Check High Score
  if (level > highScore) {
      highScore = level;
      localStorage.setItem("drumHighScore", highScore);
      document.getElementById("high-score").innerText = highScore;
  }

  var randomNumber = Math.floor(Math.random() * 7);
  var randomChosenKey = buttonKeys[randomNumber];
  gamePattern.push(randomChosenKey);

  animatePress(randomChosenKey);
  
  // Use your function for the computer's turn
  makeSound(randomChosenKey);
}

function startOver() {
  started = false;
  gamePattern = [];
  level = 0;
}

function animatePress(currentKey) {
  var activeButton = document.querySelector("." + currentKey);
  if(activeButton) {
      activeButton.classList.add("pressed");
      setTimeout(function() {
        activeButton.classList.remove("pressed");
      }, 100);
  }
}

// --- YOUR CUSTOM SOUND FUNCTION ---
function makeSound(key) {
    switch (key) {
        case "w":
            var a1 = new Audio("sounds/tom-1.mp3");
            a1.play();
            break;
        case "a":
            var a2 = new Audio("sounds/tom-2.mp3");
            a2.play();
            break;
        case "s":
            var a3 = new Audio("sounds/tom-3.mp3");
            a3.play();
            break;
        case "d":
            var a4 = new Audio("sounds/tom-4.mp3");
            a4.play();
            break;
        case "j":
            var a5 = new Audio("sounds/snare.mp3");
            a5.play();
            break;
        case "k":
            var a6 = new Audio("sounds/crash.mp3");
            a6.play();
            break;
        case "l":
            var a7 = new Audio("sounds/kick-bass.mp3");
            a7.play();
            break;
        default:
            break;
    }
}