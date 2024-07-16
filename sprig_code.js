/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started


@title: Maze Game
@author: Felix Gao
@tags: ["Puzzle", "Prision"]
@addedOn: 2024-00-00
*/

// People lol
const Player = "p";
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

// Music!
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
.D.....DD.....D.
.......DD.......
.......DD.......
.D.....DD.....D.
.D.....DD.....D.
.D.....DD.....D.
.D..DD.DD.DD..D.
.....DDDDDD.....
......DDDD......
.D.....DD.....D.
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
................
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
www.wwwawwwaw
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
wwwawwwawwwww
w...w...w....
w...w...w....
w...w...w....`,
  map`
....w.....w.k
....w.....w..
wwwawwwwaaw..
.......h..w..
p......h..wvv
wwwwwwxw..w..
.......w..w..
.......w..h..
llwwwwww..h..`
]

const misc = {
  lost: map`
wwwwwwwwwwwww
w...........w
w...........w
w...........w
w...........w
wwwawwwawwwaw
w...w...w...w
w...w...w...w
w..pw...w...w
wwwwwwwwwwwww`,
  victory: map`
.............
.............
.............
.............
.............
.............
.............
.............
.............`,
  tutorial: map`
.............
.p...........
.............
.h...........
.............
.z...........
.............
.k...........
.............`
}

// Misc settings
var HasKey = false;

var tutorial = true;
setMap(misc.tutorial)
let x_align = 4;
addText("< You!", options = { x: x_align, y: 3, color: color`0` });
addText("< Avoid lasers", options = { x: x_align, y: 6, color: color`0` });
addText("< Locked doors", options = { x: x_align, y: 9, color: color`0` });
addText("< Key = open", options = { x: x_align, y: 12, color: color`0` });
addText("Press 'L' to start!", options = { x: 1, y: 14, color: color`0` });


setSolids([Player, Wall, Door, DoorHorz, DoorLocked, DoorLockedHorz]);
setPushables({
  [Player]: []
})

const playback = playTune(music.background, Infinity)

let timer = 600;

// inputs for player movement control
onInput("w", () => {
  getFirst(Player).y -= 1;
});

onInput("a", () => {
  getFirst(Player).x -= 1;
});

onInput("s", () => {
  getFirst(Player).y += 1;
});

onInput("d", () => {
  getFirst(Player).x += 1;
});

// I'm too lazy to replay my entire game every edit lol
onInput("j", () => {
  nextLevel();
});

onInput("l", () => { // Start game!
  if (tutorial) {
    setMap(levels[0]);
    tutorial = false;
  }
});

function setCaught() {
  playback.end();
  playTune(music.caught);
  addText("You got caught!", options = { x: 3, y: 6, color: color`3` });
  setMap(misc.caught);
  clearInterval(game);
}

/* Credit for this function: Tutroial :D */
function nextLevel() {
  let game = setInterval(updateGame, 1000);
  level = level + 1;

  const currentLevel = levels[level];

  if (currentLevel !== undefined) {
    setMap(currentLevel);
  } else {
    addText("You WIN!", { y: 4, color: color`D` });
    playback.end();
    playTune(music.victory);
    setMap(misc.victory);
  }
}


/* After ALL THAT SETUP ABOVE ME comes the fun part! */

afterInput(() => {
  /* If touch active laser then player die */
  const items_insides = getTile(getFirst("p").x, getFirst("p").y);
  for (let sprite of items_insides) {
    if (sprite["_type"] == "h" || sprite["_type"] == "v") {
      setCaught()
    }
  }
  /* If touch key then add key to inv */
  for (let sprite of items_insides) {
    if (sprite["_type"] == "k") {
      try {
        getFirst("z").remove();
      } catch (error) {
        console.log(error);
      }
      try {
        getFirst("x").remove();
      } catch (error) {
        console.log(error);
      }
      sprite.remove();
    }
  }

  /* If touch checkpoint promote next level! */
  for (let sprite of items_insides) {
    if (sprite["_type"] == "l") {
      nextLevel();
    }
  }
})

/* Enable and disable all lasers every 1 sec, run timer */
/* TODO: Ability to alternate lasers */
/* CREDIT TIMER: Thanks to https://sprig.hackclub.com/~/pIrXiIjFINorvL2bCYM9! */
function updateGame() {
  timerText = addText(`Escape in ${timer} secs`, { x: 1, y: 0, color: color`2`});
  
  try { // Convert all horizontal off lasers to on
    getAll("j").forEach(sprite => {
      sprite.type = "h";
    });
  } catch (error) {
    console.log(error);
  }
  try { // Convert all vertical off lasers to on
    getAll("c").forEach(sprite => {
      sprite.type = "v";
    });
  } catch (error) {
    console.log(error);
  }
  try { // Convert all horizontal on lasers to offj
    getAll("h").forEach(sprite => {
      sprite.type = "j";
    });
  } catch (error) {
    console.log(error);
  }
  try { // Convert all vertical on lasers to off
    getAll("v").forEach(sprite => {
      sprite.type = "c";
    });
  } catch (error) {
    console.log(error);
  }
  const items_insides = getTile(getFirst("p").x, getFirst("p").y);
  for (let sprite of items_insides) {
    if (sprite["_type"] == "h" || sprite["_type"] == "v") {
      setCaught()
    }
  if (timer <= 0) {
        setCaught();
    }
  timer--;
  }
}
