var gameOn = false;
var gameIsRunning = false;
var words = ["helloworld", "computer", "javascript", "southernmethodistuniversity", "programming", "computerscience"];
var word;
var wordContainer = document.getElementById("wordContainer");
var triesContainer = document.getElementById("triesContainer");
var guessesContainer = document.getElementById("guessesContainer");
var winsContainer = document.getElementById("winsContainer");
var guesses = [];
var wordPrompt = [];
var triesLeft = 10;
var winCount = 0;

function selectNewWord() {
    randomNumber = Math.floor(Math.random()*(words.length));
    word = words[randomNumber];
    console.log("word is " + word);
}

function resetWordPrompt() {
    for (i = 0; i < word.length; i++) {
        wordPrompt[i] = "_";
    }
}

function resetWordContainer() {
    wordContainer.textContent = "";
}

function updateWordContainer() {
    for (i = 0; i < word.length; i++) {
        var letterTextNode = document.createTextNode(wordPrompt[i].toUpperCase() + " ");
        wordContainer.appendChild(letterTextNode);
    }
}

function setTriesContainer() {
    triesContainer.textContent = "Tries: ";
    for (i = 0; i < triesLeft; i++) {
        var letterTextNode = document.createTextNode("X ");
        triesContainer.appendChild(letterTextNode);
    }
}

function guessLetter(l) {
    if (guesses.indexOf(l) == -1) {
        guesses[guesses.length] = l;
        updateGuessContainer(l);

    //correct answer
        if (word.indexOf(l) > -1) {
            for (i = 0; i < word.length; i++) {
                if (l == word[i]) {
                    wordPrompt[i] = l;
                }
            }
            resetWordContainer();
            updateWordContainer();

            //check for win
            if(wordPrompt.indexOf("_") == -1) {
                win();
                resetGame();
            }
        }

        //wrong answer
        else {
            triesLeft = triesLeft - 1;
            setTriesContainer();

            //check for loss
            if(triesLeft == 0) {
                resetGame();   
            }
        }
    }
}

document.onkeydown = function (event) {
    if (gameIsRunning) {
        if (gameIsRunning &&
            (event.key == "q" ||
            event.key == "w" ||
            event.key == "e" ||
            event.key == "r" ||
            event.key == "t" ||
            event.key == "y" ||
            event.key == "u" ||
            event.key == "i" ||
            event.key == "o" ||
            event.key == "p" ||
            event.key == "a" ||
            event.key == "s" ||
            event.key == "d" ||
            event.key == "f" ||
            event.key == "g" ||
            event.key == "h" ||
            event.key == "j" ||
            event.key == "k" ||
            event.key == "l" ||
            event.key == "z" ||
            event.key == "x" ||
            event.key == "c" ||
            event.key == "v" ||
            event.key == "b" ||
            event.key == "n" ||
            event.key == "m"))
        guessLetter(event.key);
    }
    else {
        startGame();
    }
} 

function updateGuessContainer(l) {
    var guessTextNode = document.createTextNode((l + " ").toUpperCase());
    guessesContainer.appendChild(guessTextNode);
}

function resetGuesses() {
    guesses.length = 0;
    guessesContainer.textContent = "Guesses: ";
}

function resetGame() {
    resetWordContainer();
    selectNewWord();
    resetWordPrompt();
    updateWordContainer();
    resetGuesses();
    triesLeft = 10;
    setTriesContainer();
}

function startGame() {
    selectNewWord();
    resetWordPrompt();
    resetWordContainer();
    updateWordContainer();
    setTriesContainer();
    updateWins();
    gameIsRunning = true;
}

function updateWins() {
    winsContainer.textContent = "Wins: " + winCount;
}
function win() {
    winCount++;
    updateWins();
