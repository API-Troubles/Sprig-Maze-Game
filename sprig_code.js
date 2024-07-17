/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started


@title: Escape Arcade Prision!
@author: Felix Gao
@tags: ["Puzzle", "Prison"]
@addedOn: 2024-00-00
*/

// People lol
const player = "p";
const player2 = "o";

const guard = "g";
const guard2 = "f";

// Misc
const levelUp = "l"
const wall = "w";

// Lasers!
const laserVert = "v";
const laserVertOff = "c";

const laserHorz = "h";
const laserHorzOff = "j";

// This door is never unlockable
const door = "d";
const doorHorz = "s";
  
const doorLocked = "z";
const doorLockedHorz = "x";

const key = "k";
const objective = "m";
const hammer = "u";

setLegend(
  [player, bitmap`
................
................
..666666666666..
..666666666666..
..666666666666..
..666666666666..
..666666006006..
..666666006006..
..666666666666..
..666666666666..
..666666666666..
..666666666666..
..666666666666..
..666666666666..
................
................`],
  [player2, bitmap`
................
................
..666666666666..
..666666666666..
..666666666666..
..666666666666..
..600600666666..
..600600666666..
..666666666666..
..666666666666..
..666666666666..
..666666666666..
..666666666666..
..666666666666..
................
................`],
  [guard, bitmap`
................
................
..333333333333..
..333333333333..
..333333333333..
..333333003003..
..333333003003..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
................
................`],
  [guard2, bitmap`
................
................
..333333333333..
..333333333333..
..333333333333..
..300300333333..
..300300333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
................
................`],
  [wall, bitmap`
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
  [laserVert, bitmap`
................
................
................
................
................
L..............L
L1............1L
L13333333333331L
L1............1L
L..............L
................
................
................
................
................
................`],
  [laserVertOff, bitmap`
................
................
................
................
................
L..............L
L1............1L
L1............1L
L1............1L
L..............L
................
................
................
................
................
................`],
  [laserHorz, bitmap`
......LLLLL.....
.......111......
........3.......
........3.......
........3.......
........3.......
........3.......
........3.......
........3.......
........3.......
........3.......
........3.......
........3.......
........3.......
.......111......
......LLLLL.....`],
  [laserHorzOff, bitmap`
......LLLLL.....
.......111......
................
................
................
................
................
................
................
................
................
................
................
................
.......111......
......LLLLL.....`],
  [levelUp, bitmap`
................
.DDD..DDDD..DDD.
.D............D.
.D............D.
................
................
.D............D.
.D............D.
.D............D.
.D............D.
................
................
.D............D.
.D............D.
.DDD..DDDD..DDD.
................`],
  [door, bitmap`
....LLLLLLL.....
....L11111L.....
....L11111L.....
....L11111L.....
....L11111L.....
....L11111L.....
....L11111L.....
....L11111L.....
....L11111L.....
....L11111L.....
....L11111L.....
....L11111L.....
....L11111L.....
....L11111L.....
....L11111L.....
....LLLLLLL.....`],
  [doorHorz, bitmap`
................
................
................
................
LLLLLLLLLLLLLLLL
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
LLLLLLLLLLLLLLLL
................
................
................
................
................`],
  [doorLocked, bitmap`
.....LLLLLLL....
.....L11111L....
.....L11111L....
.....L11111L....
.....L16661L....
.....L61116L....
.....L61116L....
.....L16661L....
.....L11611L....
.....L11661L....
.....L11611L....
.....L11661L....
.....L11111L....
.....L11111L....
.....L11111L....
.....LLLLLLL....`],
  [doorLockedHorz, bitmap`
................
................
................
................
................
LLLLLLL66LLLLLLL
L11111611611111L
L11111611611111L
L11111166111111L
L11111161111111L
L11111166111111L
LLLLLLL6LLLLLLLL
.......66.......
................
................
................`],
  [key, bitmap`
................
................
................
................
......999.......
.....9...9......
.....9...9......
......999.......
.......9........
.......99.......
.......9........
.......99.......
................
................
................
................`],
  [objective, bitmap`
................
.......99.......
.......99.......
.......99.......
.......99.......
.......99.......
.......99.......
.......99.......
.......99.......
.......99.......
.......99.......
................
.......99.......
.......99.......
................
................`],
  [hammer, bitmap`
................
.....111........
.....1111.......
......1111......
.......1111.....
........1111....
........C1111...
.......CCC1111..
......CCC..111..
.....CCC....11..
....CCC......1..
...CCC..........
..CCC...........
.CCC............
CCC.............
.C..............`]
)

// Setup levels and different misc. screens here
// Using 13x9 size for most maps
// NOTE SELF: Each level should have the player and a checkpoint
let level = 0
const levels = [
  map`
wwwwwwwwwwwww
w...........w
w..........lw
w...........w
w...........w
www.wwwswwwsw
w...w...w...w
w...w...w...w
w..pw...w...w
wwwwwwwwwwwww`,
  map`
........w....
........w....
........wwwww
........h...l
p.......h...l
wwwswwwswwwww
w...w...w....
w...w...w....
w...w...w....`,
  map`
.......w..w.k
.......w..w..
wwwwww.wssw..
.......j..w..
p......jg.wvv
wwwwwwxw..w..
.......w..w..
.......w..h..
llwwwwww..h..`,
  map`
p.w....w.....
..w....w....k
..w....w.....
..wwxwwwwvwww
..h..........
..h........g.
vvwwvwwwwswww
..w....w.....
llw....w.....`,
  map`
p.w...w...w..
..w...w...w..
..www.wwwswww
...h...h.....
...h...h.....
wwwwwxwwwvwww
.......w.....
.......w...k.
llwwwwww.....`,
  map`
..w..........
p.wwwwwwwwwww
..h........h.
..h........h.
..h........h.
sswwwwww.wwww
..w.......w..
..w.......w..
..w.......w..`,
  map`
....h...h...l
....h.g.h...l
....h...h...l
wwwwwvvvwwwww
....w...w....
....w...w....
....w...w....
....wsssw....
....w...w....`,
/*  map`
....w...w....
....w...wwwww
....wvvvw.m.w
wwwww...w...w
w...h...wwxww
w...w.......w
w.k.w..g....w
w...w.......w
wwwwwwwwwwwww`, */
  map`
...w....w....
...w..k.w....
wwwwvwwwwwwww
..h........zl
..h......g.zl
..h........zl
wvwwwsswwwwww
...w....w....
...w....w....`,
  map`
...h...hz...l
...h.g.hz...l
...h...hz...l
wvwwvvvwwwwww
...w...w.kw..
...w...w..w..
...h...h..d..
...w...w..w..
...w...w..w..`,
  map``
  
]

// Misc settings

const guardPath = [
  null,
  null,
  [
    [8,4],
    [7,4],
    [6,4],
    [5,4],
    [4,4],
    
  ]
]

const screenText = [
  [
    ["Quick! >>>", { x: 4, y: 3, color: color`0`}]
  ], [
    ["Watch out!", { x: 2, y: 3, color: color`0`}],
    ["lasers! >", { x: 2, y: 5, color: color`0`}]
  ], [
    ["Guard!", { x: 1, y: 3, color: color`0`}]
  ]
]

const misc = {
  lost: map`
wwwwwwwwwwwww
w...........w
w...........w
w...........w
w...........w
wwwswwwswwwsw
w...w...w...w
w...w...w...w
w..pw...w...w
wwwwwwwwwwwww`,
  victory: map`
.w...........
.w...........
ww...........
.d...........
.d...........
ww...........
.w....p......
.w...........
.w...........`,
  tutorialFriendly: map`
.............
.p...........
.............
.l...........
.............
.z...........
.............
.k...........
.............`,
  tutorialHostile: map`
.............
.g...........
.............
.h...........
.............
.............
.............
.............
.............`
}

const music = {
  caught: tune`
500: A4-500 + G4-500 + F4-500 + E4-500,
500,
500: G4-500 + F4-500 + E4-500 + D4-500,
14500`,
  background: tune`
500: C5-500 + A4~500 + G5~500 + F5-500,
500: G4/500 + F5-500,
500: G4/500 + G5~500,
500: D4-500 + B4/500,
500: C5-500 + A4~500 + G5~500 + F5-500,
500: G4/500 + F5-500,
500: G4/500 + G5~500,
500: D4-500 + B4/500,
500: C5-500 + A4~500 + G5~500 + F5-500,
500: G4/500 + F5-500,
500: G4/500 + G5~500,
500: D4-500 + B4/500,
500: C5-500 + A4~500 + G5~500 + F5-500,
500: G4/500 + F5-500,
500: G4/500 + G5~500,
500: D4-500 + B4/500,
500: C5-500 + A4~500 + G5~500 + F5-500,
500: G4/500 + F5-500,
500: G4/500 + G5~500,
500: D4-500 + B4/500,
500: C5-500 + A4~500 + G5~500 + F5-500,
500: G4/500 + F5-500,
500: G4/500 + G5~500,
500: D4-500 + B4/500,
500: C5-500 + A4~500 + G5~500 + F5-500,
500: G4/500 + F5-500,
500: G4/500 + G5~500,
500: D4-500 + B4/500,
500: C5-500 + A4~500 + G5~500 + F5-500,
500: G4/500 + F5-500,
500: G4/500 + G5~500,
500: D4-500 + B4/500`,
  victory: tune`
410.958904109589: E4-410.958904109589,
410.958904109589: F4-410.958904109589,
410.958904109589: B4-410.958904109589,
410.958904109589: C5-410.958904109589 + C4^410.958904109589,
410.958904109589,
410.958904109589: C4-410.958904109589 + C5^410.958904109589,
10684.931506849314`
}

let tutorial = true;
let restart = false;
let game = null;
let guardAI = null;
let iterator = null;
let timer = 600;

let playback = playTune(music.background, Infinity);

setSolids([player, player2, wall, door, doorHorz, doorLocked, doorLockedHorz, guard, guard2]);

setPushables({
  [player]: []
});

// Tutorial prompt
let x_align = 4;

// Tutorial text is stored in a var for convenience
let tutorialText = [
  [
    ["< You!", { x: x_align, y: 3, color: color`0`}],
    ["< Next Lv", { x: x_align, y: 6, color: color`0`}],
    ["< Locked door", { x: x_align, y: 9, color: color`0`}],
    ["< Key = open", { x: x_align, y: 12, color: color`0`}],
  ],
  [
    ["< Avoid Guards", { x: x_align, y: 3, color: color`0` }],
    ["< Avoid lasers", { x: x_align, y: 6, color: color`0` }]
  ]
]

setMap(misc.tutorialFriendly);
tutorialText[0].forEach((text) => addText(text[0], options=text[1]));
addText("Press 'L' to play!", options = { x: 1, y: 14, color: color`0` });
let tutorialScreen = setInterval(tutorialAnimation, 4000);

let tutorialFlag = false;
function tutorialAnimation() {
  clearText();
  if (tutorialFlag) {
    setMap(misc.tutorialFriendly);
    tutorialText[0].forEach((text) => addText(text[0], options=text[1]));
    addText("Press 'L' to play!", options = { x: 1, y: 14, color: color`0` });
    tutorialFlag = false;
  } else {
    setMap(misc.tutorialHostile);
    tutorialText[1].forEach((text) => addText(text[0], options=text[1]));
    addText("Press 'L' to play!", options = { x: 1, y: 14, color: color`0` });
    tutorialFlag = true;
    
  }
}
// End tutorial!


// inputs for player movement control
onInput("w", () => {
  if (!tutorial) {
    try {
      getFirst(player).y -= 1;
    } catch (error) {
      getFirst(player2).y -= 1;
    }
  }
});

onInput("a", () => {
  if (!tutorial) {
    try {
      getFirst(player).x -= 1;
      getFirst("p").type = "o";
    } catch (error) {
      getFirst(player2).x -= 1;
    }
  }
});

onInput("s", () => {
  if (!tutorial) {
    try {
      getFirst(player).y += 1;
    } catch (error) {
      getFirst(player2).y += 1;
    }
  }
});

onInput("d", () => {
  if (!tutorial) {
    try {
      getFirst(player2).x += 1;
      getFirst("o").type = "p";
    } catch (error) {
      getFirst(player).x += 1;
    }
  }
});

onInput("j", () => {
  nextLevel();
});

onInput("l", () => {
  if (tutorial) { // Start the game!
    clearInterval(tutorialScreen);
    setMap(levels[0]);
    clearText();
    game = setInterval(updateGame, 1000);
    guardAI = setInterval(runGuard, 2000);
    iterator = cyclicIteration(guardPath[level]);
    screenText[0].forEach((text) => addText(text[0], options=text[1]));
    tutorial = false;
  } else if (restart) { // Restart game if caught
    level = 0;
    var timer = 600;
    setMap(levels[0]);
    clearText()
    game = setInterval(updateGame, 1000);
    guardAI = setInterval(runGuard, 2000);
    iterator = cyclicIteration(guardPath[level]);
    playback = playTune(music.background, Infinity);
    restart = false;
  }
});

function blockHas(block, item) {
  for (let sprite of block) {
    if (sprite.type == item) {
      return true;
    }
  }
  return false;
}

function getPlayer() {
  let playerModel = null;
  if (getFirst("p") !== undefined) {
      playerModel = getFirst("p");
  } else if (getFirst("o") !== undefined) {
      playerModel = getFirst("o");
  } else {
    throw new Error('No player sprite');
  }
  console.log(`Player Coords: (${playerModel.x}, ${playerModel.y})`)
  return {x: playerModel.x, y: playerModel.y};
}

function getGuard() {
  let GuardModel = null;
  if (getFirst("g") !== undefined) {
      GuardModel = getFirst("g");
  } else if (getFirst("f") !== undefined) {
      GuardModel = getFirst("f");
  }
  return GuardModel;
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

// Aw man I got caught by a guard!
function setCaught() {
  playback.end();
  playTune(music.caught);
  addText("You got caught!", options = { x: 3, y: 3, color: color`3` });
  addText("Press 'L' to", options = { x: 4, y: 5, color: color`0` });
  addText("lockpick out", options = { x: 4, y: 6, color: color`0` })
  setMap(misc.lost);
  clearInterval(game);
  clearInterval(guardAI);
  restart = true;
  level = 0;
}

/* Credit for this function: Tutorial :D */
function nextLevel() {
  clearText();
  level++;

  const currentLevel = levels[level];

  if (currentLevel !== undefined) {
    iterator = cyclicIteration(guardPath[level]);
    setMap(currentLevel);
    if (screenText[level] != null) {
      screenText[level].forEach((text) => addText(text[0], options=text[1]));
    }
  } else { // No more maps to load so victory!
    addText("You WIN!", { y: 4, color: color`D` });
    playback.end();
    playTune(music.victory);
    setMap(misc.victory);
  }
}


/* After ALL THAT SETUP ABOVE ME comes the fun part! */

// Guard logic
function runGuard() {
  if (iterator !== null) {
    const coords = iterator.next();
    const guardSprite = getGuard();

    console.log(guardSprite);
    guardSprite.x = coords.value[0];
    guardSprite.y = coords.value[1];

    if (coords.direction == "left") {
      try {
        guardSprite.type = "f";
      } catch (error) {
        console.log(error);
      }
      guardSprite.type = "f";
    } else if (coords.direction == "right") {
      try {
        guardSprite.type = "g";
      } catch (error) {
        console.log(error);
      }
    }
  }
}

// Most player physics is here
afterInput(() => {
  playerSprite = getPlayer();
  block = getTile(playerSprite.x, playerSprite.y);
  // If touch active laser then player die 
  if (blockHas(block, "h") || blockHas(block, "v")) {
    setCaught()
  }
  
  // If touch key then open all door
  if (blockHas(block, "k")) {
    try {
      getAll("x").forEach((door) => door.remove());
    } catch (error) {
      console.log(error);
    }
    try {
      getAll("x").forEach((door) => door.remove());
    } catch (error) {
      console.log(error);
    }
    getFirst("k").remove();
  }

  // If touch checkpoint promote next level!
  if (blockHas(block, "l")) {
      nextLevel();
  }

  // If in 3x3 range of guard, caught!
  let guard = getFirst("g");
  if (guard != null) {
    for (let x = guard.x - 1; x <= guard.x + 1; x++) {
      for (let y = guard.y - 1; y <= guard.y + 1; y++) {
        const sprites = getTile(x, y);

        // Can't use the func I built D:
        for (let sprite of sprites) {
          if (sprite.type == "p" || sprite.type == "o") {
            setCaught();
          }
        }
      }
    }
  }
});

/* Enable and disable all lasers every 1 sec, run timer */
/* CREDIT TIMER: Thanks to https://sprig.hackclub.com/~/pIrXiIjFINorvL2bCYM9! */
var laserOn = false;
function updateGame() {
  timerText = addText(`Escape in ${timer} secs`, { x: 1, y: 0, color: color`2`});
  if (laserOn) {
    try { // Convert all horizontal off lasers to on
      getAll("j").forEach(sprite => sprite.type = "h");
    } catch (error) {
      console.log(error);
    }
    try { // Convert all vertical off lasers to on
      getAll("c").forEach(sprite => sprite.type = "v");
    } catch (error) {
      console.log(error);
    }
    laserOn = false;
  } else {
    try { // Convert all horizontal on lasers to off
      getAll("h").forEach(sprite => sprite.type = "j");
    } catch (error) {
      console.log(error);
    }
    try { // Convert all vertical on lasers to off
      getAll("v").forEach(sprite => sprite.type = "c");
    } catch (error) {
      console.log(error);
    }
    laserOn = true;
  }

  playerSprite = getPlayer();
  block = getTile(playerSprite.x, playerSprite.y);

  //  Check if lasers touching player every sec
  if (blockHas(block, "h") || blockHas(block, "v")) {
    setCaught()
  }

  // Check if times out and Hakkuun has woken up!
  if (timer <= 0) {
    setCaught();
  }
  timer--;
}          
