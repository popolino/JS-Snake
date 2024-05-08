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
  const nextDirectionRef = useRef(direction);
  const [count, setCount] = useState<number>(-1);
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

    switch (directionRef.current) {
      case "UP":
        head.y -= 1;
        if (head.y < 0) {
          head.y = fieldSize - 1;
        }
        break;
      case "DOWN":
        head.y += 1;
        if (head.y >= fieldSize) {
          head.y = 0;
        }
        break;
      case "LEFT":
        head.x -= 1;
        if (head.x < 0) {
          head.x = fieldSize - 1;
        }
        break;
      case "RIGHT":
        head.x += 1;
        if (head.x >= fieldSize) {
          head.x = 0;
        }
        break;
      default:
        break;
    }
    newSnake.unshift(head);
    newSnake.pop();
    directionRef.current = nextDirectionRef.current;
    setSnake(newSnake);
    pushSnake(newSnake);
    updateSquare(newSnake);
  }

  const pushSnake = (newSnake: SnakeSegment[]) => {
    let newPart = { x: -1, y: -1 };
    if (apple && apple.y === newSnake[0].y && apple.x === newSnake[0].x) {
      newPart = newSnake[newSnake.length - 1];
      newSnake.push(newPart);
      setSnake(newSnake);
      const temp = getRandomPosition(20, newSnake);
      setApple(temp);
    }
  };

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
  const restartGame = () => {
    setDirection("RIGHT");
    directionRef.current = "RIGHT";
    nextDirectionRef.current = "RIGHT";
    setSnake([
      { x: 1, y: 0 },
      { x: 0, y: 0 },
      { x: -1, y: 0 },
    ]);
    setApple(getRandomPosition(20, snake));
    setSquare(createInitialField(fieldSize));
    setCount(-1);
    setOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          if (directionRef.current !== "DOWN") nextDirectionRef.current = "UP";
          break;
        case "ArrowDown":
          if (directionRef.current !== "UP") nextDirectionRef.current = "DOWN";
          break;
        case "ArrowRight":
          if (directionRef.current !== "LEFT")
            nextDirectionRef.current = "RIGHT";
          break;
        case "ArrowLeft":
          if (directionRef.current !== "RIGHT")
            nextDirectionRef.current = "LEFT";
          break;
        default:
          break;
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const snakeBody = [...snake];
    snakeBody.shift();

    const snakePositions = new Set(snakeBody.map((seg) => `${seg.x},${seg.y}`));
    if (snakePositions.has(`${snake[0].x},${snake[0].y}`)) {
      setOpen(true);
    }
  }, [snake]);

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
    if (apple && apple.y === snake[0].y && apple.x === snake[0].x) {
      const temp = getRandomPosition(20, snake);
      setApple(temp);
    }
  }, [apple, snake]);

  useEffect(() => {
    apple && setCount(count + 1);
  }, [apple]);

  useEffect(() => {
    if (!open) {
      const handle = setInterval(moveSnake, 130);
      return () => clearInterval(handle);
    }
  }, [snake, direction]);
  return (
    <>
      <div className={classes.title}>
        <p>SNAKE GAME</p>
        <img src={Snake} alt="" />
      </div>
      <div className={classes.container}>
        <div className={classes.header}>SCORE:{count}</div>
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
      <GameOver
        setOpen={setOpen}
        onRestart={restartGame}
        className={open ? "open" : "close"}
      />
    </>
  );
};

export default Game;
