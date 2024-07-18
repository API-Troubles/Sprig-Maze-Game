/*
Find the test code here!
https://sprig.hackclub.com/share/rrr8zIwj5bAAxlt5Sk5u

Note; Only works down fornow

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
  getFirst(player).y -= 1
  console.log(getFirst(player).y)
  if (getFirst(player).y == 0) {
    try {
      setMap(levels[levelY - 1][levelX]);
      levelY -= 1;
    } catch (error) {
      console.log(`Attempted to move up:\n${levelY} ${levelX}`)
    }
  }
})

onInput("a", () => {
  getFirst(player).x -= 1
})

onInput("s", () => {
  getFirst(player).y += 1
  console.log(getFirst(player).y)
  console.log(width() - 1)
  if (getFirst(player).y == height() - 1) {
    try {
      setMap(levels[levelY + 1][levelX]);
      levelY += 1;
    } catch (error) {
      console.log(`Attempted to move down:\n${levelY} ${levelX}`)
    }
  }    
})

onInput("d", () => {
  getFirst(player).x += 1
})


function changeMap(X, Y) {
  //Ensure we're not going off the map
  playerSprite = getFirst(player);
  if (Y <= levels.length && Y >= 0) {
    levelY = Y
    setMap(levels[levelY][X]);
  }
}

afterInput(() => {
  
})
