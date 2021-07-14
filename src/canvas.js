// Deal with drawing the board onto the canvas

function displayCanvas(context, width, height, array) {
  /*
        [     0 1 2
            0[0,0,0],
            1[0,0,0],
            2[0,0,0]
        ]
        top right is array[0][0],
        top left is array[0][2]...
    */

  let numberOfElementX = array[0].length,
    numberOfElementY = array.length;

  let elementWidth = width / numberOfElementX;
  let elementHeight = height / numberOfElementY;

  // Erase the old layer
  context.clearRect(0, 0, width, height);

  for (let x = 0; x < numberOfElementX; x++) {
    for (let y = 0; y < numberOfElementY; y++) {
      context.fillStyle = array[y][x] ? "blue" : "red";

      context.fillRect(
        x * elementWidth,
        y * elementHeight,
        elementWidth,
        elementHeight
      );

      context.fillStyle = 'black';

      context.strokeRect(
        x * elementWidth,
        y * elementHeight,
        elementWidth,
        elementHeight);
      
    }
  }
}

export { displayCanvas };
