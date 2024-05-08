import React from "react";
import classes from "./GameOver.module.scss";
import scull from "../../assets/img/scull.gif";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

type TGameOver = {
  setOpen: (open: boolean) => void;
  onRestart: () => void;
  className: string;
};
const GameOver: React.FC<TGameOver> = ({ setOpen, onRestart, className }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div
        className={clsx(
          classes.dark,
          className === "open" ? classes.openDark : classes.closeDark
        )}
      ></div>
      <div
        className={clsx(
          classes.container,
          className === "open" ? classes.open : classes.close
        )}
      >
        <div className={classes.title}>
          <img src={scull} alt="" />
          <p>GAME OVER</p>
          <img src={scull} alt="" />
        </div>
        <p>RESTART?</p>
        <div className={classes.buttons}>
          <button
            onClick={() => {
              setOpen(false);
              onRestart();
            }}
          >
            YES
          </button>
          <button onClick={() => navigate("/")}>NO</button>
        </div>
      </div>
    </div>
  );
};

export default GameOver;
