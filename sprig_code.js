/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Maze Game
@author: Felix Gao
@tags: ["Puzzle", "Prision"]
@addedOn: 2024-00-00

/* Music! */
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


/* People models! */
const Player = "p";
const Guard = "g";

/* Enemies! */
const laserVert = "v";
const laserVertOff = "o";

const laserHorz = "h";
const laserHorzOff = "f";

/* Misc */
const LevelUp = "l"
const Wall = "w";

/* This door is never unlockable */
const Door = "d";
const DoorHorz = "a";
  
const DoorLocked = "z";
const DoorLockedHorz = "x";

const Key = "k";
const Objective = "m";

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

function setCaught() {
  playback.end();
  playTune(music.caught);
  addText("You got caught!", options = { x: 3, y: 6, color: color`3` });
  clearInterval(timer);
  setMap(misc[0]);
  clearInterval(game);
}

/* Credit for this function: Tutroial :D */
function nextLevel() {
  level = level + 1;

  const currentLevel = levels[level];

  if (currentLevel !== undefined) {
    setMap(currentLevel);
  } else {
    addText("You WIN!", { y: 4, color: color`D` });
    playback.end();
    playTune(music.victory);
  }
}

/* Setup levels and different misc. screens here */
/* Using 13x9 size for most maps */
/* NOTE SELF: Each level should have the player and a checkpoint */
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

const misc = [
  map`
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
  map``,
  map`
.............
.p...........
.............
.h...........
.............
.z...........
.............
.k...........
.............`
]

/* Misc settings */
var HasKey = false;

setMap(levels[level])

setSolids([Player, Wall, Door, DoorHorz, DoorLocked, DoorLockedHorz]);
setPushables({
  [Player]: []
})

const playback = playTune(music.background, Infinity)

// 10 minute timer!
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

/* I'm too lazy to repeat my entire game every edit lol */
onInput("j", () => {
  nextLevel();
});

let clear = false;

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

/* Enable and disable all lasers every 2 sec */
/* TODO: Ability to alternate lasers */
/* CREDIT TIMER: Thanks to https://sprig.hackclub.com/~/pIrXiIjFINorvL2bCYM9! */
function updateGame() {
  timerText = addText(`Escape in ${timer} secs`, { x: 1, y: 0, color: color`2` });
  if (clear) {
    getAll("f").forEach(sprite => {
      sprite.type = "h";
    });

    getAll("o").forEach(sprite => {
      sprite.type = "v";
    });
    clear = false;
  } else {
    getAll("h").forEach(sprite => {
      sprite.type = "f";
    });

    getAll("v").forEach(sprite => {
      sprite.type = "o";
    });
    clear = true;
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

let game = setInterval(updateGame, 1000);
