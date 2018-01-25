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
var journey = [];
var stepsSoFar = 0;
// function that return the size of the maze (array with two elements)
function mazeSizeFn(maze) {
  var yAxis = maze.length;
  var xAxis = maze[0].length;
  return [yAxis, xAxis];
}

// helper for personInitialPosition, returns the index in the inner array (a number)
function findPerson(content) {
  // return content == '@';
  return content !== 'X' && content !== "E" && content !== " ";

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
      else {
        continue;
      }
    }

  }

}

console.log(personPositionFn());

function personFacingFn() {
  var position = personPositionFn();
  return maze[position[0]][position[1]];
}

//console.log(personPositionFn());
//console.log(personFacingFn());

// returns surroundings (N, E, S, W)
function surroundingsFn() {

  var currentPosition = personPositionFn();
  if(!currentPosition){
    debugger;
  }
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

function orient(){
  var currentPosition = personPositionFn();
  var yAxisPosition = currentPosition[0];
  var xAxisPosition = currentPosition[1];
  var showPerson = maze[yAxisPosition][xAxisPosition];

  if (showPerson == "@") {
    maze[yAxisPosition][xAxisPosition] = "^";
  }

}

// returns a string with chevron facing the next direction;
function nextDirection(direction) {
  if (direction == "north") {
    return "^";
  }
  else if (direction == "east") {
    return ">";
  }
  else if (direction == "south"){
    return "v";
  }
  else if (direction == "west"){
    return "<";
  }
}


// returns array of [0]:[yAxixPosition, xAxisPosition] of the next step,
// [1] content of the next tile (empty or exit),
// [2] the direction it's about to move to help orient chevron

function whereToGo() {
  var surroundings = surroundingsFn();
  var personFacing = personFacingFn();
  console.log(surroundings, personFacing);

  if (personFacing == "^") {
    if (surroundings.north !== "X") {
      return [surroundings.northCoord, surroundings.north, "north"];
    } else if (surroundings.west !== "X") {
      return [surroundings.westCoord, surroundings.west, "west"];
    }
  } else if (personFacing == ">") {
    if (surroundings.east !== "X") {
      return [surroundings.eastCoord, surroundings.east, "east"];
    } else if (surroundings.north !== "X") {
      return [surroundings.northCoord, surroundings.north, "north"];
    }
  } else if (personFacing == "v") {
    if (surroundings.south !== "X") {
      return [surroundings.southCoord, surroundings.south, "south"];
    } else if (surroundings.north !== "X") {
      return [surroundings.eastCoord, surroundings.east, "east"];
    }
  } else if (personFacing == "<") {
    if (surroundings.west !== "X") {
      return [surroundings.westCoord, surroundings.west, "west"];
    } else if (surroundings.south !== "X") {
      return [surroundings.southCoord, surroundings.south, "south"];
    }
  }
}

function move(){
  var destination = whereToGo();
  var coordinatesOfMove = destination[0];
  var coordinatesOfMoveY = coordinatesOfMove[0];
  var coordinatesOfMoveX = coordinatesOfMove[1];
  var emptyOrExit = destination[1];
  var directionOfMove = destination[2];
  console.log (coordinatesOfMove, emptyOrExit, directionOfMove);

  var personPosition = personPositionFn();
  var personPreviousY = personPosition[0];
  var personPreviousX = personPosition[1];

  // move empty space to where the person was
 maze[personPreviousY][personPreviousX] = " ";

  // move person to where the space was
var newPersonDirection = "";

if (directionOfMove == "north") {
  newPersonDirection = "^";
} else if ( directionOfMove == "east") {
  newPersonDirection = ">";
} else if (directionOfMove == "south") {
  newPersonDirection = "v";
} else if (directionOfMove == "west") {
  newPersonDirection = "<";
}

maze[coordinatesOfMoveY][coordinatesOfMoveX] = newPersonDirection;

journey.push(personPosition);
// TODO implement clearing console before printing the new maze
console.log(maze);
stepsSoFar ++;

if(emptyOrExit == "E") {
  journey.push(coordinatesOfMove);
  return "completed";
} else {
  console.log ("Steps so far: ${stepsSoFar}");
  return "continue";
}

  // console log the maze

}

function walkTheMaze(){
  orient();
  console.log(maze);
  whereToGo();
  debugger;
  if (move() != "completed"){
    move();
  }
  else {
    console.log("FINISHED");
    console.log(journey);
    console.log(stepsSoFar);
  }
}

walkTheMaze();
