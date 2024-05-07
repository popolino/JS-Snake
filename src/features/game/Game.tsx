import React, { useEffect, useRef, useState } from "react";
import classes from "./Game.module.scss";
import Snake from "../../assets/img/snake-unscreen.gif";
import GameOver from "../gameOver/GameOver";
import clsx from "clsx";

interface SnakeSegment {
  x: number;
  y: number;
}
const Game: React.FC = () => {
  const [direction, setDirection] = useState<string>("RIGHT");
  const directionRef = useRef(direction);
  const [open, setOpen] = useState<boolean>(false);
  const fieldSize = 20;
  const [square, setSquare] = useState(createInitialField(fieldSize));
  const [apple, setApple] = useState<SnakeSegment | null>(null);
  const [snake, setSnake] = useState<SnakeSegment[]>([
    { x: 1, y: 0 },
    { x: 0, y: 0 },
    { x: -1, y: 0 },
  ]);
  function getRandomPosition(
    max: number,
    snake: SnakeSegment[]
  ): { x: number; y: number } {
    let x: number = -1;
    let y: number = -1;
    let validPosition = false;
    const snakePositions = new Set(snake.map((seg) => `${seg.x},${seg.y}`));
    while (!validPosition) {
      x = Math.floor(Math.random() * max);
      y = Math.floor(Math.random() * max);
      if (!snakePositions.has(`${x},${y}`)) {
        validPosition = true;
      }
    }
    return { x, y };
  }
  function createInitialField(size: number): number[][] {
    const initialSquare: number[][] = [];
    for (let i = 0; i < size; i++) {
      initialSquare[i] = [];
      for (let j = 0; j < size; j++) {
        initialSquare[i][j] = 0;
      }
    }
    return initialSquare;
  }
  function moveSnake() {
    let newSnake = [...snake];
    let head = { ...newSnake[0] };
    switch (direction) {
      case "UP":
        head.y -= 1;
        if (head.y < 0) {
          head.y = fieldSize - 1; // Змейка появится с другой стороны по вертикали
        }
        break;
      case "DOWN":
        head.y += 1;
        if (head.y >= fieldSize) {
          head.y = 0; // Змейка появится с другой стороны по вертикали
        }
        break;
      case "LEFT":
        head.x -= 1;
        if (head.x < 0) {
          head.x = fieldSize - 1; // Змейка появится с другой стороны по горизонтали
        }
        break;
      case "RIGHT":
        head.x += 1;
        if (head.x >= fieldSize) {
          head.x = 0; // Змейка появится с другой стороны по горизонтали
        }
        break;
      default:
        break;
    }
    newSnake.unshift(head);
    newSnake.pop();
    setSnake(newSnake);
    updateSquare(newSnake);
  }
  function updateSquare(newSnake: SnakeSegment[]) {
    const newSquare = createInitialField(fieldSize);
    newSnake.forEach((segment) => {
      if (
        segment.x >= 0 &&
        segment.x < fieldSize &&
        segment.y >= 0 &&
        segment.y < fieldSize
      ) {
        newSquare[segment.y][segment.x] = segment === newSnake[0] ? 2 : 1;
      }
    });

    if (apple) {
      newSquare[apple.y][apple.x] = 3;
    }
    setSquare(newSquare);
  }
  useEffect(() => {
    directionRef.current = direction;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp" && directionRef.current !== "DOWN") {
        setDirection("UP");
      } else if (event.key === "ArrowDown" && directionRef.current !== "UP") {
        setDirection("DOWN");
      } else if (
        event.key === "ArrowRight" &&
        directionRef.current !== "LEFT"
      ) {
        setDirection("RIGHT");
      } else if (
        event.key === "ArrowLeft" &&
        directionRef.current !== "RIGHT"
      ) {
        setDirection("LEFT");
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [direction]); // Обновляем useEffect при изменении direction

  useEffect(() => {
    const handle = setInterval(moveSnake, 500);
    return () => clearInterval(handle); // Очистка интервала
  }, [snake, direction]);

  useEffect(() => {
    if (!apple) {
      const temp = getRandomPosition(20, snake);
      setApple({ x: temp.x, y: temp.y });
    }
  }, []);
  useEffect(() => {
    if (apple) {
      updateSquare(snake);
    }
  }, [apple, snake]);
  return (
    <>
      <div className={classes.title}>
        <p>SNAKE GAME</p>
        <img src={Snake} alt="" />
      </div>
      <div className={classes.container}>
        <div className={classes.header}>SCORE:12</div>
        {square.map((row, rowIndex) => (
          <div key={rowIndex} className={classes.field}>
            {row.map((column, columnIndex) => (
              <div
                key={columnIndex}
                className={clsx(
                  classes.square,
                  column === 2 && classes.head,
                  column === 1 && classes.body,
                  column === 3 && classes.apple
                )}
              ></div>
            ))}
          </div>
        ))}
        <div></div>
      </div>
      {open && <GameOver open={open} setOpen={setOpen} />}
    </>
  );
};

export default Game;
