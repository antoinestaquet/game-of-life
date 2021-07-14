const { expect } = require("chai");
const { Grid } = require("../src/grid");

describe("Grid", () => {
  let testGrid;

  beforeEach(function () {
    testGrid = new Grid(3, 3);
  });

  describe("#constructor", () => {
    it("should initialise an empty grid", () => {
      testGrid.initBoard();
      const expectedGrid = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ];
      expect(testGrid.board).to.deep.equal(expectedGrid);
    });
  });

  describe("#nextState", () => {
    /*
        rule 1 : If the surrounding of the cell contains less (strictly) than 2 cells alive,
            it dies
        rule 2 : If there's 2 or 3 cells alive, then the current cell stays alive
        rule 3 : If there's more cells alive than 3, then it dies
        rule 4 : If theres strictly 3 alive cells, then the current cell comes alive
    */

    it("everything should remain the same", () => {
      const initialGrid = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ];
      const expectedGrid = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ];
      testGrid.board = initialGrid;
      testGrid.nextStep();
      expect(testGrid.board).to.deep.equal(expectedGrid);
    });

    it("everything should disappear", () => {
      const initialGrid = [
        [0, 0, 0],
        [1, 1, 0],
        [0, 0, 0],
      ];
      const expectedGrid = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ];
      testGrid.board = initialGrid;
      testGrid.nextStep();
      expect(testGrid.board).to.deep.equal(expectedGrid);
    });

    it("should act as a blinker", () => {
      const initialGrid = [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
      ];
      const expectedGrid = [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
      ];
      testGrid.board = initialGrid;
      testGrid.nextStep();
      expect(testGrid.board).to.deep.equal(expectedGrid);
    });

    it("should act as a block", () => {
      const initialGrid = [
        [1, 1, 0],
        [1, 1, 0],
        [0, 0, 0],
      ];
      const expectedGrid = [
        [1, 1, 0],
        [1, 1, 0],
        [0, 0, 0],
      ];
      testGrid.board = initialGrid;
      testGrid.nextStep();
      expect(testGrid.board).to.deep.equal(expectedGrid);
    });
  });
});
