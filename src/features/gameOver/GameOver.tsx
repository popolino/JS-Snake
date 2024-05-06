import React from "react";
import classes from "./GameOver.module.scss";
import scull from "../../assets/img/scull.gif";
import { useNavigate } from "react-router-dom";

type TGameOver = {
  open: boolean;
  setOpen: (open: boolean) => void;
};
const GameOver: React.FC<TGameOver> = ({ open, setOpen }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className={classes.dark}></div>
      <div className={classes.container}>
        <div className={classes.title}>
          <img src={scull} alt="" />
          <p>GAME OVER</p>
          <img src={scull} alt="" />
        </div>
        <p>RESTART?</p>
        <div className={classes.buttons}>
          <button onClick={() => setOpen(false)}>YES</button>
          <button onClick={() => navigate("/")}>NO</button>
        </div>
      </div>
    </>
  );
};

export default GameOver;
