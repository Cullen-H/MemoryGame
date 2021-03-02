const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

function hideCards(card1, card2) {
    card1.style.backgroundColor = null;
    card2.style.backgroundColor = null;
}

// TODO: Implement this function!
let cardsPicked = 0;
let cardArr = [];
cardArr.length = 2;
let canClick = true;
let cardsFinished = 0;
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
    
    if (canClick) {
        cardsPicked++;
        cardArr[cardsPicked-1] = event.target;
        cardArr[cardsPicked-1].style.backgroundColor = cardArr[cardsPicked-1].className;
        if (cardsPicked === 2) {
            if (cardArr[0] == cardArr[1]) {
                cardArr[1] = null;
                cardsPicked--;
            } else if (cardArr[0].style.backgroundColor === cardArr[1].style.backgroundColor) {
                cardArr[0] = null;
                cardArr[1] = null;
                cardsPicked = 0;
                cardsFinished += 2;
            } else {
                console.log("pass2");
                canClick = false;

                setTimeout(function() {
                    cardArr[0].style.backgroundColor = null;
                    cardArr[1].style.backgroundColor = null;
                    cardsPicked = 0;
                    canClick = true;
                }, 1000);
            }
        }
    }
    if (cardsFinished >= 10) {
        setTimeout(function () {
            alert("Congrats! You Win!");
            window.location.reload();
        }, 200);
    }
}

// when the DOM loads
createDivsForColors(shuffledColors);
