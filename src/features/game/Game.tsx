import React, { useState } from "react";
import classes from "./Game.module.scss";
import snake from "../../assets/img/snake-unscreen.gif";
import GameOver from "../gameOver/GameOver";

const Game = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <div className={classes.title}>
        <p>SNAKE GAME</p>
        <img src={snake} alt="" />
      </div>
      <div className={classes.container}>
        <div className={classes.header}>SCORE:12</div>
      </div>
      <button onClick={() => (open ? setOpen(false) : setOpen(true))}>
        CLICK
      </button>
      {open && <GameOver open={open} setOpen={setOpen} />}
    </>
  );
};

export default Game;
