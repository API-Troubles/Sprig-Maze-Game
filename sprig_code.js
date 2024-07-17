/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started


@title: Maze Game
@author: Felix Gao
@tags: ["Puzzle", "Prison"]
@addedOn: 2024-00-00
*/

// People lol
const Player = "p";
const Player2 = "o";
const Guard = "g";

// Misc
const LevelUp = "l"
const Wall = "w";

// Lasers!
const laserVert = "v";
const laserVertOff = "c";

const laserHorz = "h";
const laserHorzOff = "j";

// This door is never unlockable
const Door = "d";
const DoorHorz = "s";
  
const DoorLocked = "z";
const DoorLockedHorz = "x";

const Key = "k";
const Objective = "m";
const Hammer = "u";

setLegend(
  [Player, bitmap`
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
  [Player2, bitmap`
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
  [Wall, bitmap`
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
  [LevelUp, bitmap`
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
  [Door, bitmap`
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
  [DoorHorz, bitmap`
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
  [DoorLocked, bitmap`
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
  [DoorLockedHorz, bitmap`
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
  [Key, bitmap`
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
  [Objective, bitmap`
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
  [Guard, bitmap`
................
................
..333333333333..
..333333333333..
..333333333333..
..333333003003..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
................
................`]
  [Hammer, bitmap`
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
....w.....w.k
....w.....w..
www.wwwwssw..
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
....w...w....
....wlllw....`,
  map`
....w...w....
....w...wwwww
....wvvvw.m.w
wwwww...w...w
w...h...wwxww
w...w.......w
w.k.w..g....w
w...w.......w
wwwwwwwwwwwww`,
  map`
...w....w....
...w..k.w....
wwwwvwwwwwwww
..h........zl
..h......g.zl
..h........zl
wvwwwsswwwwww
...w....w....
...w....w....`
  
]

// Misc settings

const guardPath = [
  null,
  null,
  [
    [0,0],
    [0,1],
    [0,2]
  ]
]

const screenText = [
  [{}, {}, {}],
  null,
  [{}]
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
  tutorial: map`
.............
.p...........
.............
.h...........
.............
.z...........
.............
.k...........
.............`,
  tutorial: map``
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

var HasKey = false;
var tutorial = true;
let Game = null;
let iterator = null;
let timer = 600;

const playback = playTune(music.background, Infinity);

setSolids([Player, Player2, Wall, Door, DoorHorz, DoorLocked, DoorLockedHorz]);

setPushables({
  [Player]: []
});

// Tutorial prompt
let x_align = 4;
function tutorialFriendly() {
  setMap(misc.tutorialFriendly)
  addText("< You!", options = { x: x_align, y: 3, color: color`0` });
  addText("< Next Lv", options = { x: x_align, y: 6, color: color`0` });
  addText("< Locked door", options = { x: x_align, y: 9, color: color`0` });
  addText("< Key = open", options = { x: x_align, y: 12, color: color`0` });
  addText("Press 'L' to play!", options = { x: 1, y: 14, color: color`0` });
}

function tutorialHostile() {
  setMap(misc.tutorialHostile)
  addText("< Avoid Guards", options = { x: x_align, y: 3, color: color`0` });
  addText("< Avoid lasers", options = { x: x_align, y: 6, color: color`0` });
  addText("Press 'L' to play!", options = { x: 1, y: 14, color: color`0` });
}

// inputs for player movement control
onInput("w", () => {
  try {
    getFirst(Player).y -= 1;
  } catch (error) {
    getFirst(Player2).y -= 1;
  }
});

onInput("a", () => {
  try {
    getFirst(Player).x -= 1;
    getFirst("p").type = "o";
  } catch (error) {
    getFirst(Player2).x -= 1;
  }
});

onInput("s", () => {
  try {
    getFirst(Player).y += 1;
  } catch (error) {
    getFirst(Player2).y += 1;
  }
});

onInput("d", () => {
  try {
    getFirst(Player2).x += 1;
    getFirst("o").type = "p";
  } catch (error) {
    getFirst(Player).x += 1;
  }
});

onInput("j", () => {
  nextLevel();
});

onInput("l", () => { // Start game!
  if (tutorial) {
    setMap(levels[0]);
    clearText()
    Game = setInterval(updateGame, 1000);
    var timer = 600;
    iterator = cyclicIteration(guardPath[level]);
    console.log(iterator);
    tutorial = false;
  }
});


// Iterate infinitely front and back
// CREDIT: ChatGPT
function cyclicIteration(array) {
  if (array === null) {
    return null
  }
  let index = 0;
  let direction = 1;

  return {
    next: function() {
      if (index === array.length - 1) {
        direction = -1;
      } else if (index === 0) {
        direction = 1;
      }

      const currentValue = array[index];
      index += direction;

      return {value: currentValue};
    }
  };
}

function blockHas(block, sprite) {
  for (let sprites of block) {
    if (sprites.type == sprite) {
      return true;
    }
  return false;

function getPlayer() {
  let player = null;
  if (getFirst("p") != undefined) {
    var player = getFirst("p");
  } else if (getFirst("o") != undefined) {
    var player = getFirst("o");
  } else {
    throw new Error('No player sprite');
  }
  return {x: player.x, y: player.y}
}


// Aw man I got caught by a guard!
function setCaught() {
  playback.end();
  playTune(music.caught);
  addText("You got caught!", options = { x: 3, y: 3, color: color`3` });
  addText("Press 'L' to", options = { x: 4, y: 5, color: color`0` });
  addText("lockpick out", options = { x: 4, y: 6, color: color`0` })
  setMap(misc.lost);
  clearInterval(Game);
  tutorial = true;
}

/* Credit for this function: Tutorial :D */
function nextLevel() {
  level = level + 1;

  const currentLevel = levels[level];

  if (currentLevel !== undefined) {
    iterator = cyclicIteration(guardPath[level]);
    setMap(currentLevel);
  } else {
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
    getFirst("g").x = coords[0];
    getFirst("g").y = coords[1];
  } else {
    console.log(iterator);
  }
}

// Most player physics is here
afterInput(() => {
  player = getPlayer();
  block = getTile(player.x, player.y);
  // If touch active laser then player die 
  if (blockHas(block, "h") || blockHas(block, "v")) {
    setCaught()
  }
  
  // If touch key then open all door
  if (blockHas(block, "k") {
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
}

  // If touch checkpoint promote next level!
  if (blockHas(block, "l") {
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
      getAll("j").forEach(sprite => {sprite.type = "h");
    } catch (error) {
      console.log(error);
    }
    try { // Convert all vertical off lasers to on
      getAll("c").forEach(sprite => {sprite.type = "v");
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

  player = getPlayer();
  block = getTile(player.x, player.y);

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
