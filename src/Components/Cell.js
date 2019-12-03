import React from "react";
import "./Cell.scss";

function Cell({ isLit, flipCellsAround }) {
  let classes = `Cell${isLit ? " lit" : ""}`;

  const handleClick = () => {
    flipCellsAround();
  };

  return <td className={classes} onClick={handleClick} />;
}

export default Cell;
