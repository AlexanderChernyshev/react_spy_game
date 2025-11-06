import { useState } from "react";
import "./App.css";
import type { ReactNode } from "react";

const initialGrid = [
  [false, false, false],
  [false, false, false],
  [false, false, false],
];

function App() {
  const [grid, setGrid] = useState(initialGrid);

  const generatedGridCells: ReactNode[] = [];

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j]) {
        generatedGridCells.push(<img key={`${i}${j}`} src="/wrong_tile.svg" />);
      } else {
        generatedGridCells.push(
          <img
            key={`${i}${j}`}
            src="/tile.svg"
            onClick={() => {
              flipTile(i, j);
            }}
          />
        );
      }
    }
  }

  function flipTile(i: number, j: number) {
    const newGrid = [...grid];
    newGrid[i][j] = !newGrid[i][j];
    setGrid(newGrid);
  }

  return (
    <>
      <h1>Where in the world is...</h1>
      <div className="grid">{generatedGridCells}</div>
    </>
  );
}

export default App;
