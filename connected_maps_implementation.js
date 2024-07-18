/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Test: Connected Maps
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const player = "p"
const wall = "w"
const yellow = "y"

setLegend(
  [player, bitmap`
................
................
.......000......
.......0.0......
......0..0......
......0...0.0...
....0003.30.0...
....0.0...000...
....0.05550.....
......0...0.....
.....0....0.....
.....0...0......
......000.......
......0.0.......
.....00.00......
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
  [yellow, bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666`]
)

setSolids([player, wall]);


const levels = [
  [
    map`
.............
.w.........w.
.............
.............
......p......
.............
.............
.............
.............`, 
    map`
.............
.w.........w.
.............
.w...........
......p......
.............
.............
.............
.............`, 
    map`
.............
.w.........w.
.............
.w...........
......p......
.w...........
.............
.............
.............`
  ],
  [
    map`
.............
.w.........w.
.............
..........pw.
.............
.............
.............
.............
.............`, 
    map`
.............
.w.........w.
.............
.w.........w.
......p......
.............
.............
.............
.............`, 
    map`
.............
.w.........w.
.............
.w.........w.
......p......
.w...........
.............
.............
.............`
  ],
  [
    map`
.............
.w.........w.
.............
...........w.
......p......
...........w.
.............
.............
.............`,
    map`.............
.w.........w.
.............
.w.........w.
......p......
...........w.
.............
.............
.............`, 
    map`
.............
.w.........w.
.............
.w.........w.
......p......
.w.........w.
.............
.............
.............`
  ]
]
let levelX = 1
let levelY = 0


setMap(levels[levelY][levelX]);

setPushables({
  [ player ]: []
})

onInput("w", () => {
  const savedPlayerSprite = getFirst(player);
  getFirst(player).y -= 1
  if (getFirst(player).y == 0) {
    try {
      setMap(levels[levelY - 1][levelX]);
      getFirst(player).x = savedPlayerSprite.x;
      getFirst(player).y = height() - 1;      
      levelY -= 1;
    } catch (error) {
      console.log(`Attempted to move up:\n${levelY} ${levelX}`)
    }
  }
})

onInput("a", () => {
  const savedPlayerSprite = getFirst(player);
  getFirst(player).x -= 1
  if (getFirst(player).x == 0) {
    try {
      setMap(levels[levelY][levelX - 1]);
      getFirst(player).x = width() - 1;
      getFirst(player).y = savedPlayerSprite.y;
      levelX -= 1;
    } catch (error) {
      console.log(`Attempted to move left:\n${levelY} ${levelX}`)
    }
  }  
})

onInput("s", () => {
  const savedPlayerSprite = getFirst(player);
  getFirst(player).y += 1
  if (getFirst(player).y == height() - 1) {
    try {
      setMap(levels[levelY + 1][levelX]);
      getFirst(player).x = savedPlayerSprite.x;
      getFirst(player).y = 0;
      levelY += 1;
    } catch (error) {
      console.log(`Attempted to move down:\n${levelY} ${levelX}`)
    }
  }    
})

onInput("d", () => {
  const savedPlayerSprite = getFirst(player);
  getFirst(player).x += 1
  if (getFirst(player).x == width() - 1) {
    try {
      setMap(levels[levelY][levelX + 1]);
      getFirst(player).x = 0;
      getFirst(player).y = savedPlayerSprite.y;
      levelX += 1;
    } catch (error) {
      console.log(`Attempted to move right:\n${levelY} ${levelX}`)
    }
  }  
})

afterInput(() => {
  
})
