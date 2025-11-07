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

  const [spy, spyMove] = useState([
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

  function flipTile(i: number, j: number) {
    if (i === spy[0] && j === spy[1]) {
      setGameOver(true);
    }

    const newGrid = [...grid];
    newGrid[i][j] = !newGrid[i][j];
    setGrid(newGrid);
  }

  return (
    <>
      <h1>Where in the world is...</h1>
      <div className="grid">{generatedGridCells}</div>
      {gameOver ? <h2>You found the Spy!</h2> : null}
    </>
  );
}

export default App;
