import React from "react";
import Board from "./Board";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Board ncols={5} nrows={5} />
    </div>
  );
}

export default App;
