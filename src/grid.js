/*
    Class handling the manipulation of the board of the game
*/

class Grid {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.board = this.initBoard();
  }

  initBoard() {
    let board = new Array(this.height);
    for (let i = 0; i < this.height; i++) {
      board[i] = new Array(this.width);
      for (let j = 0; j < this.width; j++) {
        board[i][j] = 0;
      }
    }
    return board;
  }

  randomBinary(treshold) {
    return Math.random() > treshold ? 1 : 0;
  }

  randomize(treshold) {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        this.board[i][j] = this.randomBinary(treshold);
      }
    }
  }

  /*
        rule 1 : If the surrounding of the cell contains less (strictly) than 2 cells alive,
            it dies
        rule 2 : If there's 2 or 3 cells alive, then the current cell stays alive
        rule 3 : If there's more cells alive than 3, then it dies
        rule 4 : If theres strictly 3 alive cells, then the current cell comes alive
    */
  checkRules(cellState, number) {
    if (cellState) {
      //rule 1 and 3
      if (number < 2 || number > 3) {
        return false;
      }
      return true;
    }

    // rule 4
    if (number === 3) {
      return true;
    }
    return false;
  }

  isAlive(posi, posj) {
    let countAlive = 0;

    for (let i = posi - 1; i <= posi + 1; i++) {
      for (let j = posj - 1; j <= posj + 1; j++) {
        if (i >= 0 && i < this.height && j >= 0 && j < this.width) {
            if(this.board[i][j] && (i !== posi || j !== posj)){
                countAlive++;
            }
          
        }
      }
    }

    return this.checkRules(this.board[posi][posj], countAlive);
  }

  nextStep() {
    let newBoard = new Array(this.height);

    // 1. Cycle through the entire array

    for (let i = 0; i < this.height; i++) {
      newBoard[i] = new Array(this.width);
      for (let j = 0; j < this.width; j++) {
        // 2. Check the surrounding of each cell and check the rules
        newBoard[i][j] = this.isAlive(i, j) ? 1 : 0;
      }
    }
    // 3. Overide the current board

    this.board = newBoard;
  }
}

export { Grid };
