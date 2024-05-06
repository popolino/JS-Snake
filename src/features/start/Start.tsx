import React from "react";
import classes from "./Start.module.scss";
import jsLogo from "../../assets/img/1174949.webp";
import { useNavigate } from "react-router-dom";

const Arrow = () => {
  return (
    <svg viewBox="0 0 678.68 1080">
      <polygon points="194.21 1080 -.17 1080 -.17 883.86 97.01 883.86 97.01 784.9 194.21 784.9 194.21 685.94 291.39 685.94 291.39 587.87 387.11 587.87 387.11 490.68 291.39 490.68 291.39 392.61 194.21 392.61 194.21 293.65 97.01 293.65 97.01 194.69 -.17 194.69 -.17 -1.45 194.21 -1.45 194.21 97.51 291.39 97.51 291.39 195.58 388.59 195.58 388.59 292.76 387.11 292.76 387.11 294.11 484.3 294.11 484.3 391.72 581.49 391.72 581.49 490.68 678.68 490.68 678.68 587.87 581.49 587.87 581.49 686.83 484.3 686.83 484.3 785.79 388.59 785.79 388.59 882.97 291.39 882.97 291.39 981.04 194.21 981.04 194.21 1080" />
    </svg>
  );
};
const Start: React.FC = () => {
  const navigate = useNavigate();
  const onCLick = (event: any) => {
    navigate("/game");
  };
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <img src={jsLogo} alt="" />
        <p>SNAKE GAME</p>
      </div>
      <div className={classes.button}>
        <Arrow />
        <button onClick={onCLick}>START</button>
        <Arrow />
      </div>
    </div>
  );
};

export default Start;
