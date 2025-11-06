import { useState } from "react";
import "./App.css";
import type { ReactNode } from "react";

const grid = [
  [false, false, false],
  [false, false, false],
  [false, false, false],
];

const generatedGridCells: ReactNode[] = [];

for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    generatedGridCells.push(<img src="/tile.svg" />);
  }
}

function App() {
  return (
    <>
      <h1>Where in the world is...</h1>
      <div className="grid">{generatedGridCells}</div>
    </>
  );
}

export default App;
