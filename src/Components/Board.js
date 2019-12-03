import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.scss";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function createBoard(ncols, nrows, chanceLightStartsOn) {
  let board = [];
  // TODO: create array-of-arrays of true/false values
  for (let y = 0; y < nrows; y++) {
    let row = [];
    for (let x = 0; x < ncols; x++) {
      row.push(Math.random() < chanceLightStartsOn);
    }
    board.push(row);
  }
  return board;
}

  function MakeTable({board, hasWon, flipCellsAround}) {
      // if the game is won, just show a winning msg & render nothing else
    if(hasWon) {
      return (
        <div className='Board-title'>
          <div className="winner">
          <span className='neon-orange'>You</span>
          <span className='neon-blue'>Win!</span>
          </div>
        </div>
      )
    }
    const nrows = board.length;
    let tableBoard = [];
    for (let y = 0; y < nrows; y++) {
      let row = [];
      const ncols = board[y].length;
      for (let x = 0; x < ncols; x++) {
        let coord = `${y}-${x}`;
        row.push(
          <Cell
            key={coord}
            isLit={board[y][x]}
            flipCellsAround={() => flipCellsAround(coord)}
          />
        );
      }
      tableBoard.push(<tr key={y}>{row}</tr>);
    }

    return (
      <div>
        <div className='Board-title'>
          <div className='neon-orange'>Lights</div>
          <div className='neon-blue'>Out</div>
        </div>
        <table className="Board">
          <tbody>{tableBoard}</tbody>
        </table>
      </div>
    );
  }

function Board({ ncols = 5, nrows = 5, chanceLightStartsOn = 0.25 }) {
  const [board, setBoard] = useState(
    createBoard(ncols, nrows, chanceLightStartsOn)
  );
  const [hasWon, setHasWon] = useState(false);

  const flipCellsAround = coord => {
    let newBoard = JSON.parse(JSON.stringify(board));
    let [y, x] = coord.split("-").map(Number);

    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        newBoard[y][x] = !board[y][x];
      }
    }

    flipCell(y, x);     // flip cell selected.
    flipCell(y, x - 1); // flip cell to left.
    flipCell(y, x + 1); // flip cell to right.
    flipCell(y - 1, x); // flip cell above.
    flipCell(y + 1, x); // flip cell below.

    setBoard(newBoard);
    
    // win when every cell is turned off
    const wonGame = newBoard.every(row => row.every(cell => cell));
    setHasWon(wonGame);
  };

  return <MakeTable board={board} flipCellsAround={flipCellsAround} hasWon={hasWon} />;
}

export default Board;
