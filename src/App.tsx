import { useState } from "react";
import "./App.css";
import type { ReactNode } from "react";

const initialGrid = [
  [false, false, false],
  [false, false, false],
  [false, false, false],
];

function App() {
  const [gameOver, setGameOver] = useState(false);

  const [grid, setGrid] = useState(initialGrid);

  const [spy, setSpyCoords] = useState([
    Math.floor(Math.random() * grid.length),
    Math.floor(Math.random() * grid[0].length),
  ]);

  const generatedGridCells: ReactNode[] = [];

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] && i === spy[0] && j === spy[1]) {
        generatedGridCells.push(<img key={`${i}${j}`} src="/spy_tile.svg" />);
      } else if (grid[i][j]) {
        generatedGridCells.push(<img key={`${i}${j}`} src="/wrong_tile.svg" />);
      } else {
        generatedGridCells.push(
          <img
            key={`${i}${j}`}
            src="/tile.svg"
            onClick={() => {
              if (!gameOver) {
                flipTile(i, j);
              }
            }}
          />
        );
      }
    }
  }

  function spyCheckValidMoves(clickX: number, clickY: number): number[][] {
    const validMoves = [];
    const maxX = grid.length - 1;
    const maxY = grid[0].length - 1;
    const above = [spy[0], spy[1] - 1];
    const left = [spy[0] - 1, spy[1]];
    const right = [spy[0] + 1, spy[1]];
    const below = [spy[0], spy[1] + 1];

    if (
      !(above[0] === clickX && above[1] === clickY) &&
      above[1] >= 0 &&
      above[1] <= maxY &&
      !grid[above[0]][above[1]]
    ) {
      validMoves.push(above);
    }

    if (
      !(left[0] === clickX && left[1] === clickY) &&
      left[0] >= 0 &&
      left[0] <= maxX &&
      !grid[left[0]][left[1]]
    ) {
      validMoves.push(left);
    }

    if (
      !(right[0] === clickX && right[1] === clickY) &&
      right[0] >= 0 &&
      right[0] <= maxX &&
      !grid[right[0]][right[1]]
    ) {
      validMoves.push(right);
    }

    if (
      !(below[0] === clickX && below[1] === clickY) &&
      below[1] >= 0 &&
      below[1] <= maxX &&
      !grid[below[0]][below[1]]
    ) {
      validMoves.push(below);
    }

    return validMoves;
  }

  function spyConfirmMove(validMoves: number[][]) {
    if (validMoves.length === 0) {
      return spy;
    }
    return validMoves[Math.floor(Math.random() * validMoves.length)];
  }

  function flipTile(i: number, j: number) {
    if (i === spy[0] && j === spy[1]) {
      setGameOver(true);
    } else {
      setSpyCoords(spyConfirmMove(spyCheckValidMoves(i, j)));
    }

    const newGrid = structuredClone(grid);
    newGrid[i][j] = !newGrid[i][j];
    setGrid(newGrid);
  }

  function restartGame() {
    setGameOver(false);
    setGrid(initialGrid);
    setSpyCoords([
      Math.floor(Math.random() * grid.length),
      Math.floor(Math.random() * grid[0].length),
    ]);
  }

  return (
    <>
      <h1>Where in the world is...</h1>
      <div className="grid">{generatedGridCells}</div>
      {gameOver ? <h2>You found the Spy!</h2> : null}
      {/* This prints the spy's coords for debugging pruposes
       <h2>
        {spy[0]} : {spy[1]}
      </h2> */}
      {gameOver ? <button onClick={restartGame}>Restart Game</button> : null}
    </>
  );
}

export default App;
