// const startGame = document.getElementById("start-game");
const addWord = document.getElementById("add-word");
const input = document.getElementById("input");
const inputError = document.getElementById("input-error");
const lettersContainer = document.getElementById("letters-container");
const startNewGame = document.getElementById("new-game");
const figureParts = document.querySelectorAll(".figure-part");
const wrongLettersEl = document.getElementById("wrong-letters");
const notification = document.getElementById("notification-container");
const endGame = document.getElementById("end-game");
const desistGame = document.getElementById("desist-game");
const cancelButton = document.getElementById("cancel");

// WORDS CONTAINER
const words = [
  "alura",
  "oracle",
  "next",
  "education",
  "student",
  "programming",
  "project",
];

// SELECTED WORD
let selectedWord = words[getRandomNumber()];

// CORRECT LETTER
let correctLetters = [];

// WRONG LETTERS
let wrongLetters = [];

// ADDING A NEW WORD
addWord.addEventListener("click", function () {
  addNewWord(input.value);
});

// CANCEL
cancelButton.addEventListener("click", function () {
  input.value = "";
  window.location.hash = "game-section";
});

// STARTING NEW GAME
startNewGame.addEventListener("click", function () {
  if (!wrongLettersEl.hasChildNodes()) {
    createLines();
  } else {
    selectedWord = words[getRandomNumber()];
    wrongLetters.splice(0);
    correctLetters.splice(0);
    endGame.innerHTML = "";
    createLines();
  }

  getUserKeyboard();
  // Getting keyboard input
  updateWrongLetters();
});

// Desist game
desistGame.addEventListener("click", function () {
  correctLetters.splice(0);
  wrongLetters.splice(0);
  selectedWord = words[getRandomNumber()];
  createLines();
  getUserKeyboard();
  // Getting keyboard input
  updateWrongLetters();
});

// IT GENERATES A RANDOM NUMBER
function getRandomNumber() {
  return Math.floor(Math.random() * words.length);
}

// FUNCTION THAT VALIDATES USER'S INPUT
function invalidInput(str) {
  // if user's input is invalid it returns "true" otherwise it returns "false"
  const specialChars = /[`áéíóú´!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~0-9]/;
  return specialChars.test(str);
}

// FUNCTION IN CHAGER OF ADDING NEW A WORD
function addNewWord(word) {
  // VALIDATING THE INPUT
  if (input.value.length <= 0) {
    inputError.innerHTML = "No se ha agregado ninguna palabra.";
    return;
  } else if (invalidInput(input.value)) {
    inputError.innerHTML =
      "No se aceptan números, símbolos ni carácteres especiales.";
    return;
  } else {
    inputError.innerHTML = "";
    words.push(word);
    input.value = "";
    window.location.hash = "game-section";
  }
}

// Lines to recevie letter
function createLines() {
  lettersContainer.innerHTML = `${selectedWord
    .split("")
    .map(
      (letter) =>
        `<div class="line">${
          correctLetters.includes(letter) ? letter : ""
        }</div>`
    )
    .join("")}`;

  const innerWord = lettersContainer.innerText.replace(/\n/g, "");
  console.log(innerWord);
  console.log(selectedWord);

  if (innerWord.toUpperCase() === selectedWord.toUpperCase()) {
    endGame.classList.remove("error");
    endGame.classList.add("success");
    endGame.innerHTML = "Ganaste. ¡Felicidades!";
  }
}

// WRONG LETTERS
function updateWrongLetters() {
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? `<h2>Wrong letters</h2>` : ""}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;

  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  if (wrongLetters.length === figureParts.length) {
    endGame.classList.remove("success");
    endGame.classList.add("error");
    endGame.innerHTML = "¡Fin del juego!";
  }
}

// GETTING USER'S INPUT FROM KEYBOARD
function getUserKeyboard() {
  window.addEventListener("keydown", function (e) {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
      const letter = e.key;

      if (selectedWord.includes(letter)) {
        if (!correctLetters.includes(letter)) {
          correctLetters.push(letter);
          createLines();
        }
      } else {
        if (!wrongLetters.includes(letter)) {
          wrongLetters.push(letter);
          updateWrongLetters();
        }
      }
    }
  });
}
