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

// Music!
const music = {
  caught: tune`
500: A4-500 + G4-500 + F4-500 + E4-500,
500,
500: G4-500 + F4-500 + E4-500 + D4-500,
14500`,
  background: tune`
500: C5/500,
500: B4/500,
500: A4/500,
500: B4/500,
1000,
500: C5/500,
500: B4/500,
500: A4/500,
500: B4/500,
1000,
500: C5/500,
500: B4/500,
500: A4/500,
1500,
500: C5/500,
500: B4/500,
500: A4/500,
1500,
500: C5/500,
500: B4/500,
500: A4/500,
1500,
500: C5/500,
500: B4/500`,
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
..h........hl
..h........hl
..h........hl
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


const guardPath = [
  null,
  null,
  [
    [7,4],
    [6,4],
    [5,4],
    [4,4],
    [3,4]
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
let game = null;
let guardAI = null;
let iterator = null;

// Tutorial prompt
let x_align = 4;
setMap(misc.tutorial)
addText("< You!", options = { x: x_align, y: 3, color: color`0` });
addText("< Avoid lasers", options = { x: x_align, y: 6, color: color`0` });
addText("< Locked doors", options = { x: x_align, y: 9, color: color`0` });
addText("< Key = open", options = { x: x_align, y: 12, color: color`0` });
addText("Press 'L' to start!", options = { x: 1, y: 14, color: color`0` });

setSolids([player, player2, guard, wall, door, doorHorz, doorLocked, doorLockedHorz]);
setPushables({
  [player]: []
})

const playback = playTune(music.background, Infinity)

let timer = 600;

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

// I'm too lazy to replay my entire game every edit lol
onInput("j", () => {
  nextLevel();
});

onInput("l", () => { // Start game!
  if (tutorial) {
    setMap(levels[0]);
    clearText()
    game = setInterval(updateGame, 1000);
    guardAI = setInterval(runGuard, 2000);
    var timer = 600;
    iterator = cyclicIteration(guardPath[level]);
    console.log(iterator);
    tutorial = false;
  }
});

function getPlayerSprite() {
  let playerModel = null;
  if (getFirst("p") !== undefined) {
      playerModel = getFirst("p");
  } else if (getFirst("o") !== undefined) {
      playerModel = getFirst("p");
  } else {
    throw new Error('No player sprite');
  }
  console.log(`Player Coords: (${playerModel.x}, ${playerModel.y})`)
  return {x: playerModel.x, y: playerModel.y};
}

function blockHas(block, item) {
  for (let sprite of block) {
    if (sprite.type == item) {
      return true;
    }
  }
  return false;
}



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

function runGuard() {
  if (iterator !== null) {
    const coords = iterator.next().value;
    const guard = getFirst("g");
    guard.x = coords[0];
    guard.y = coords[1];
  }
}

function setCaught() {
  playback.end();
  playTune(music.caught);
  addText("You got caught!", options = { x: 3, y: 3, color: color`3` });
  addText("Press 'L' to", options = { x: 4, y: 5, color: color`0` });
  addText("lockpick out", options = { x: 4, y: 6, color: color`0` })
  setMap(misc.lost);
  clearInterval(game);
  clearInterval(guardAI);
  tutorial = true;
  level = 0;
}

/* Credit for this function: Tutorial :D */
function nextLevel() {
  level = level + 1;

  const currentLevel = levels[level];

  if (currentLevel !== undefined) {
    iterator = cyclicIteration(guardPath[level]);
    guardAI = 
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
  // If touch active laser then player die 
  let playerSprite = getPlayerSprite()
  let itemsInside = getTile(player_sprite.x, player_sprite.y);
  
  if (blockHas(itemsInside, "h") || blockHas(itemsInside, "h")) {
    setCaught()
  }
  /* If touch key then open all doors*/
  if (blockHas(itemsInside, "k")) {
    try {
      //getAll("z").forEach((door) => console.log(element));
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
    if (sprite.type == "l") {
      nextLevel();
    }
  }
})

/* Enable and disable all lasers every 1 sec, run timer */
/* TODO: Ability to alternate lasers */
/* CREDIT TIMER: Thanks to https://sprig.hackclub.com/~/pIrXiIjFINorvL2bCYM9! */
var laserOn = false;
var guardPos = 0;
function updateGame() {
  timerText = addText(`Escape in ${timer} secs`, { x: 1, y: 0, color: color`2`});
  if (laserOn) {
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
    laserOn = false;
  } else {
    try { // Convert all horizontal on lasers to off
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
    laserOn = true;
  }

  if (getFirst("p") !== undefined) {
    var items_insides = getTile(getFirst("p").x, getFirst("p").y);
  } else if (getFirst("o") !== undefined) {
    var items_insides = getTile(getFirst("o").x, getFirst("o").y);
  } else {
    throw new Error('No player sprite');
  }
  for (let sprite of items_insides) {
    if (sprite.type == "h" || sprite.type == "v") {
      setCaught()
    }
    if (timer <= 0) {
      setCaught();
    }
  }
  timer--;
}          
