// Declare variables
const qwertyElement = document.getElementById("qwerty");
const phraseElement = document.getElementById("phrase");
let missed = 0;

// Event listener for the 'Start game' button
const overlay = document.getElementById("overlay");
const resetButton = document.getElementsByClassName("btn__reset")[0];

resetButton.addEventListener("click", function () {
  reset();
  overlay.style.display = "none";
});

//Phrases array that contains strings to guess
const phrases = [
  "A WORK OF GENIUS",
  "A PIECE OF CAKE",
  "A STROKE OF GENIUS",
  "COOL AS A CUCUMBER",
  "HAVE A GREAT DAY",
];

//getRandomPhraseArray fucntion
function getRandomPhraseAsArray(arr) {
  const randomPhrase = arr[Math.floor(Math.random() * arr.length)];
  console.log(randomPhrase);
  const characterArray = randomPhrase.split("");
  console.log(characterArray);
  return characterArray;
}

/*Setting the game display*/

//addPhrasetoDisplay function
function addPhraseToDisplay(arr) {
  for (char of arr) {
    const ul = document.getElementsByTagName("ul")[0];
    const listItem = document.createElement("li");
    listItem.textContent = char;
    if (listItem.textContent !== " ") {
      listItem.className = "letter";
    }
    ul.appendChild(listItem);
  }
}

//Create a checkLetter function
// call function from an event listener on button events from keyboard

function checkLetter(button) {
  const letters = document.getElementsByClassName("letter");
  let matchingLetter = null;

  for (letter of letters) {
    if (letter.textContent === button.textContent.toUpperCase()) {
      letter.className += " show";
      matchingLetter = letter.textContent;
      console.log(matchingLetter);
    }
  }
  return matchingLetter;
}

//Create a checkWin function
function checkWin() {
  const lettersWithTwoClasses = document.getElementsByClassName("letter show");
  const lettersWithOneClass = document.getElementsByClassName("letter");
  if (lettersWithTwoClasses.length === lettersWithOneClass.length) {
    title = document.getElementsByClassName("title")[0];
    title.textContent = "You win!";
    resetButton.textContent = "Play again";
    resetButton.style.color = "#78CF82";
    overlay.style.backgroundColor = "#78CF82";
    overlay.style.display = null;
  } else if (missed >= 5) {
    title = document.getElementsByClassName("title")[0];
    title.textContent = "You lose!";
    resetButton.textContent = "Try again";
    resetButton.style.color = "#D94545";
    overlay.style.backgroundColor = "#D94545";
    overlay.style.display = null;
  }
}

const keyboardDiv = document.getElementById("qwerty");
const keyboardButtons = keyboardDiv.getElementsByTagName("button");

//give each keyboard button an event listener
for (keyboardButton of keyboardButtons) {
  keyboardButton.addEventListener("click", function (event) {
    const button = event.target;

    // disable button
    button.className += " chosen";
    button.disabled = true;
    //Match letter to button pressed
    const letterFound = checkLetter(button);
    // count missed guesses
    if (!letterFound) {
      missed++;
      button.className += " chosen__false";
      const hearts = document.getElementsByTagName("img");
      hearts[missed - 1].style.opacity = "0.25";
    }
    checkWin();
  });
}

//reset game
function reset() {
  // empty phrase ul
  const ul = document.getElementsByTagName("ul")[0];
  ul.textContent = "";

  const phraseArray = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(phraseArray);
  missed = 0;
  const hearts = document.getElementsByTagName("img");
  for (heart of hearts) {
    heart.style.opacity = "1.0";
  }
  for (keyboardButton of keyboardButtons) {
    keyboardButton.className = null;
    keyboardButton.disabled = false;
  }
}
