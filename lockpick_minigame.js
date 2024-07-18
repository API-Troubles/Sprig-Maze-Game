/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started


@title: TEST: Lock picking minigame
@author: Felix Gao
@tags: ["testing", "hi reader!"]
@addedOn: 2024-00-00
*/

// items lol
const lockpick = "k";
const pin = "p";
const pinDone = "o";
const lock = "l";
const goalLine = "g";

setLegend(
  [pin, bitmap`
......0000......
......0000......
......0000......
......0000......
......0000......
......0000......
......0000......
......0000......
......0000......
......0000......
......0000......
......0000......
......0000......
......0000......
......0000......
................`],
  [pinDone, bitmap`
......DDDD......
......DDDD......
......DDDD......
......DDDD......
......DDDD......
......DDDD......
......DDDD......
......DDDD......
......DDDD......
......DDDD......
......DDDD......
......DDDD......
......DDDD......
......DDDD......
......DDDD......
................`],
  [lock, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [goalLine, bitmap`
................
................
................
................
................
................
6666666666666666
6666666666666666
6666666666666666
6666666666666666
................
................
................
................
................
................`]
)

// Setup levels and different misc. screens here
// Using 13x9 size for most maps
// NOTE SELF: Each level should have the player and a checkpoint
let level = 0
const levels = [
  map`
p.p.p.pl
.......l
gggggggl
.......l
.......l`,
]

const music = {
  correct: tune`
500: F5-500 + C5-500 + G4/500,
500: G5-500 + C5-500 + G4/500,
15000`,
  missed: tune`
500: D5/500 + G4-500,
500: G4/500 + D4-500,
15000`
}

let timer = 15;
let stopPin = false;
let pinSelection = null;

let pinsFinished = 0;

let pinSprite = null;
let yPath = cyclicIteration([0, 1, 2, 3, 4]);

let attempts = 4;

let pinTimer = setInterval(pinDown, 500);
let minigameTimer = setInterval(runTimer, 1000);
setMap(levels[level]);

// inputs for player movement control
onInput("i", () => {
  const pinSprite = getFirst("p");
  getTile(pinSprite.x, pinSprite.y).forEach(sprites => {
    
    if (sprites.type == "g") { // If pin on there!
      playTune(music.correct);
      pinSprite.type = "o";
      yPath = cyclicIteration([0, 1, 2, 3, 4]);
      pinsFinished++;
      
    } else {
      playTune(music.missed);
      attempts--;
      splashText(`${attempts}/4 trys left!`);
    }
      
    if (pinsFinished == 2) { // When we finish more pins, the rest go faster
      clearInterval(pinTimer);
      pinTimer = setInterval(pinDown, 300);
    } else if (pinsFinished >= 3) { // BURRRR
      clearInterval(pinTimer);
      pinTimer = setInterval(pinDown, 250);
    }
  });
  
  if (attempts <= 0) {
    clearInterval(pinTimer);
    clearInterval(minigameTimer);
    clearText();
    addText("You lost!", {color: color`2`});
  }
});

function pinDown() {
  try {
    pinSprite = getFirst("p");
    if (pinSprite != null) {
      pinSprite.y = yPath.next().value;
    } else if (pinsFinished == 4) {
    clearInterval(pinTimer);
    clearInterval(minigameTimer);
    splashText("victory!");
    victory = false;
    }
  } catch (error) {
    console.log(error);
  }
}

// Iterate infinitely front and back
// CREDIT: ChatGPT, modified code
function cyclicIteration(array) {
  if (array == null) {
    return null
  }
  let index = 0;
  let direction = 1;
  let directionStr = "";

  // Store the last move to calculate guard NPC animation
  let lastMove = null;

  return {
    next: function() {
      if (index === array.length - 1) {
        direction = -1;
      } else if (index === 0) {
        direction = 1;
      }

      const currentValue = array[index];
      index += direction;
      
      if (lastMove == null) {
        lastMove = currentValue;
        return {value: currentValue, directionStr: "nothing yet"};
      }
      
      let difference = lastMove[0] - currentValue[0];
      if (difference >= 1) { // If the x is increasing / moving left <<<
        directionStr = "left";
        
      } else if (difference <= -1) { // If the x is decreasing / moving right >>>
        directionStr = "right";

      } else { // else then not moving left or right
        directionStr = "up/down"
      }

      lastMove = currentValue;
      //console.log("lets final check!")
      //console.log({value: currentValue, direction: directionStr});
      return {value: currentValue, direction: directionStr};
    }
  };
}

// Add text to screen and remove it, for quick messages
function splashText(text, time = 3000) {
  let options = {y: 15, color: color`6` };
  addText(text, options=options);
  setTimeout( function() {
    clearText();
    timerText = addText(`Pick lock in ${timer} secs`, { x: 0, y: 0, color: color`2`});
  }, time); //Clear splash text and put other text back
}

function runTimer() {
  timerText = addText(`Pick lock in ${timer} secs`, { x: 0, y: 0, color: color`2`});
  if (timer <= 0) {
    clearText();
    addText("You lost!", {color: color`2`});
  }
  timer--;
}     
