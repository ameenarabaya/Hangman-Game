//letters
const letters = "abcdefghijklmnopqrstuvwxyz";
// get array from letters
let lettersArray = Array.from(letters);
//select letters container
let letterscontainer = document.querySelector(".letters");
//Generate Letters
lettersArray.forEach(letter => {
    let span = document.createElement("span");
    let theletter = document.createTextNode(letter);
    span.appendChild(theletter);
    span.className = "letter-box";
    letterscontainer.appendChild(span);
});
const words = {
    programming: ["Php", "JavaScript", "go", "scale", "fortan", "Java", "mysql", "python"],
    movies: ["prestige", "inception", "parasite", "interstellar", "whiplash", "memento", "coco", "up"],
    people: ["Albert Einstein", "Hitchcock", "Alexander", "cleopatra", "Mahatama", "Ghandi"],
    countries: ["syria", "palestine", "yemen", "Egypt", "Bahrain", "Qatar"]
}
// random property
let allkeys = Object.keys(words);
let randomPropNumber = Math.floor(Math.random() * allkeys.length);
let randomPropName = allkeys[randomPropNumber];
let randomPropValue = words[randomPropName];
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
let randomValueValue = randomPropValue[randomValueNumber];

//set category info
document.querySelector(".game-info .catogery span").innerHTML = randomPropName;
//select letters Guess Element
let letterGuessscontainer = document.querySelector(".letters-guess");
//convert chosen word to Array
let letterAndSpace = Array.from(randomValueValue);
letterAndSpace.forEach(letter => {
    let emptyspan = document.createElement("span");
    if (letter === ' ') {
        //add class to span
        emptyspan.className = "with-space";
    }
    letterGuessscontainer.appendChild(emptyspan);
});
let guessSpans = document.querySelectorAll(".letters-guess span");
let wrongAttempts = 0;
let correctAttempts = 0;
let theDraw = document.querySelector(".hangman-draw");
document.addEventListener("click", (e) => {
    let thestatus = false;
    if (e.target.className === "letter-box") {
        e.target.classList.add("clicked");
        let theClickLetter = e.target.innerHTML.toLowerCase();
        let thechosenword = Array.from(randomValueValue.toLowerCase());
        // the chosen word
        thechosenword.forEach((wordletter, wordindex) => {
            if (theClickLetter == wordletter) {
                thestatus = true;
                correctAttempts++;
                console.log(correctAttempts);
                //loop on all guess spans
                guessSpans.forEach((span, spanIndex) => {
                    if (wordindex === spanIndex) {
                        span.innerHTML = theClickLetter;
                    }
                });
            }
        });
        if (thestatus !== true) {
            wrongAttempts++;
            theDraw.classList.add(`wrong-${wrongAttempts}`);
            document.getElementById("fail-letter").play();
        }
        else {
            document.getElementById("success").play();
        }
        if (wrongAttempts === 8) {
            endGame();
            letterscontainer.classList.add("finished");
        }
        if (correctAttempts === randomValueValue.length) {
            congratolation();
        }
    }

});
function endGame() {
    let div = document.createElement("div");
    let divtext = document.createTextNode(`Game Over , The word is ${randomValueValue}`);
    div.appendChild(divtext);
    div.className = "popup";
    document.body.appendChild(div);
    document.getElementById("fail").play();

}
function congratolation() {
    let successdiv = document.createElement("div");
    let successdivtext = document.createTextNode(`congratulations,you feild ${wrongAttempts} times`);
    successdiv.appendChild(successdivtext);
    successdiv.className = "succ";
    document.body.appendChild(successdiv);
    document.getElementById("success-game").play();

}