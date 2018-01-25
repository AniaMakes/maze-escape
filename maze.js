var maze = [
  ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'E', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
  ['X', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'X', ' ', ' ', ' ', ' ', ' ', 'X'],
  ['X', ' ', 'X', 'X', 'X', 'X', 'X', 'X', 'X', ' ', 'X', 'X', 'X', ' ', 'X'],
  ['X', ' ', 'X', ' ', 'X', ' ', 'X', ' ', ' ', ' ', ' ', ' ', 'X', ' ', 'X'],
  ['X', ' ', ' ', ' ', 'X', ' ', 'X', ' ', 'X', ' ', 'X', ' ', 'X', ' ', 'X'],
  ['X', ' ', 'X', ' ', 'X', ' ', 'X', ' ', 'X', ' ', 'X', ' ', 'X', ' ', 'X'],
  ['X', ' ', ' ', ' ', 'X', ' ', 'X', ' ', 'X', ' ', 'X', ' ', 'X', ' ', 'X'],
  ['X', ' ', 'X', ' ', 'X', ' ', ' ', ' ', 'X', ' ', 'X', ' ', 'X', ' ', 'X'],
  ['X', 'X', 'X', ' ', 'X', ' ', 'X', ' ', 'X', ' ', 'X', ' ', 'X', ' ', 'X'],
  ['X', ' ', ' ', ' ', 'X', ' ', ' ', '@', 'X', ' ', 'X', 'X', 'X', ' ', 'X'],
  ['X', ' ', 'X', 'X', 'X', 'X', 'X', 'X', 'X', ' ', 'X', ' ', ' ', ' ', 'X'],
  ['X', ' ', ' ', ' ', 'X', ' ', 'X', ' ', ' ', ' ', 'X', ' ', 'X', 'X', 'X'],
  ['X', ' ', 'X', ' ', 'X', ' ', 'X', 'X', 'X', 'X', 'X', ' ', ' ', ' ', 'X'],
  ['X', ' ', 'X', ' ', 'X', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'X', ' ', 'X'],
  ['X', ' ', 'X', ' ', 'X', ' ', 'X', 'X', 'X', 'X', 'X', ' ', 'X', ' ', 'X'],
  ['X', ' ', 'X', ' ', 'X', ' ', 'X', ' ', ' ', ' ', 'X', ' ', 'X', ' ', 'X'],
  ['X', 'X', 'X', ' ', 'X', 'X', 'X', ' ', 'X', ' ', 'X', 'X', 'X', ' ', 'X'],
  ['X', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'X'],
  ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X']
];

// function that return the size of the maze (array with two elements)
function mazeSizeFn(maze) {
  var yAxis = maze.length;
  var xAxis = maze[0].length;
  return [yAxis, xAxis];
}

// helper for personInitialPosition, returns the index in the inner array (a number)
function findPerson(content) {
  return content == '@';
}

// returns position of the person (array with two elements, yAxisCoord & xAxisCoord), so that you can access the location by maze[yAxisCoord][xAxisCoord]
function personPositionFn() {
  var mazeSize = mazeSizeFn(maze);
  var yAxisLength = mazeSize[0];
  var xAxisLength = mazeSize[1];

  for (var yAxisIterator = 0; yAxisIterator < yAxisLength; yAxisIterator++) {
    for (var xAxisIterator = 0; xAxisIterator < xAxisLength; xAxisIterator++) {
      var xPosition = maze[yAxisIterator].findIndex(findPerson);
      if (xPosition != -1) {
        return [yAxisIterator, xPosition];
      }
    }

  }
}

function personFacingFn() {
  var position = personPositionFn();
  return maze[position[0]][position[1]];
}

console.log(personPositionFn());
console.log(personFacingFn());

// returns surroundings (N, E, S, W)
function surroundingsFn() {
  var currentPosition = personPositionFn(maze);
  var yAxisPosition = currentPosition[0];
  var xAxisPosition = currentPosition[1];

  var north = maze[yAxisPosition - 1][xAxisPosition];
  var east = maze[yAxisPosition][xAxisPosition + 1];
  var south = maze[yAxisPosition + 1][xAxisPosition];
  var west = maze[yAxisPosition][xAxisPosition - 1];

  var surroundingsObject = {
    "north": north,
    "northCoord": [yAxisPosition - 1, xAxisPosition],
    "east": east,
    "eastCoord": [yAxisPosition, xAxisPosition + 1],
    "south": south,
    "southCoord": [yAxisPosition + 1, xAxisPosition],
    "west": west,
    "westCoord": [yAxisPosition, xAxisPosition - 1]
  };

  return surroundingsObject;
}

console.log(surroundingsFn());

function changeDirection(){
  var currentPosition = personPositionFn(maze);
  var yAxisPosition = currentPosition[0];
  var xAxisPosition = currentPosition[1];
  var showPerson = maze[yAxisPosition][xAxisPosition];

  if (showPerson == "@"){
    maze[yAxisPosition][xAxisPosition] = "^";
  }
  // placeholder which will tell us which way to face

}


// returns array of [yAxixPosition, xAxisPosition] of the next step
function whereToGo(){
  var surroundings = surroundingsFn();
  var personFacing = personFacingFn();

  if (personFacing == "^"){
    if surroundings.north !== "X" {
      return [surroundings.northCoord, surroundings.north];
    } else if {
      return [surroundings.westCoord, surroundings.west];
    }
  }

}
