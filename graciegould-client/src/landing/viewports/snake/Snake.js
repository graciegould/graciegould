import React, { useState, useEffect, useRef, useContext } from "react";
import emojis from "../../../utils/emojis";

const GRID_ROW_AMOUNT = 20;
const GRID_COL_AMOUNT = 20;

function generateSnake() {
  const snakeHead = getRandomRowAndColumn();
  return Array.from({ length: 1 }, (_, index) => {
    return { row: snakeHead.row + index, col: snakeHead.col };
  });
}

function getRandomRowAndColumn(excludedCoordinates = []) {
  let row, col;
  let isExcluded;
  do {
    row = Math.floor(Math.random() * GRID_ROW_AMOUNT);
    col = Math.floor(Math.random() * GRID_COL_AMOUNT);

    isExcluded = excludedCoordinates.some(
      (coord) => coord.row === row && coord.col === col
    );
  } while (isExcluded);
  return { row, col };
}
function Snake() {
  let _snake = [getRandomRowAndColumn()];
  const [gameData, setGameData] = useState({
    snake: _snake,
    target: getRandomRowAndColumn(_snake),
    direction: "RIGHT",
    score: 0,
    started: false,
    highScore: 0,
    speed: 100,
  });

  return (
    <div className="xp-padded-container snake-container">
      <Topbar gameData={gameData} setGameData={setGameData} />
      <Grid gameData={gameData} setGameData={setGameData} />
    </div>
  );
}

function Topbar({ gameData, setGameData }) {
  return (
    <div className="xp-box snake-topbar">
      <div className="xp-box snake-score">
        <div className="snake-score-label">SCORE: {gameData.score}</div>
      </div>
      <div className="xp-box snake-high-score">
        <div className="snake-score-label">
          HIGH SCORE: {gameData.highScore}
        </div>
      </div>
      <button
        className="xp-btn start-game-button"
        onClick={() =>
          setGameData((prev) => ({ ...prev, started: !prev.started }))
        }
      >
        {gameData.started ? "Restart" : "Start"} Game
      </button>
    </div>
  );
}

function Grid({ gameData, setGameData }) {
  const [grid, setGrid] = useState(
    Array.from({ length: GRID_ROW_AMOUNT }, (_, row) => {
      return Array.from({ length: GRID_COL_AMOUNT }, (_, col) => ({
        row,
        col,
        target: false,
      }));
    })
  );

  useEffect(() => {
    const handleArrowKeys = (e) => {
      let dir = null;
      switch (e.key) {
        case "ArrowUp":
          dir = "UP";
          break;
        case "ArrowRight":
          dir = "RIGHT";
          break;
        case "ArrowDown":
          dir = "DOWN";
          break;
        case "ArrowLeft":
          dir = "LEFT";
          break;
        default:
          break;
      }
      setGameData((prev) => ({ ...prev, direction: dir }));
    };
    document.addEventListener("keydown", handleArrowKeys);
    return () => document.removeEventListener("keydown", handleArrowKeys);
  }, []);

  useEffect(() => {
    let interval;
    function moveSnake() {
      setGameData((prev) => {
        const moveDirection = {
          RIGHT: { row: 1, col: 0 },
          LEFT: { row: -1, col: 0 },
          DOWN: { row: 0, col: 1 },
          UP: { row: 0, col: -1 },
        };
        const directionDelta = moveDirection[prev.direction];
        let snake = prev.snake;
        let head = snake[prev.snake.length - 1];
        const newHead = {
          row: head.row + directionDelta.row,
          col: head.col + directionDelta.col,
        };
        let newSnake = [...prev.snake];
        let highScore = prev.highScore;
        let score = prev.score;
        let target = prev.target;

        const tests = {
          wallCollision: () => {
            if (
              head.row < 0 ||
              head.row >= GRID_ROW_AMOUNT ||
              head.col < 0 ||
              head.col >= GRID_COL_AMOUNT
            ) {
              return true;
            }
          },
          selfCollision: () => {
            if (
              prev.snake.some(
                (cell) => cell.row === newHead.row && cell.col === newHead.col
              )
            ) {
              return true;
            }
          },
          targetCollision: () => {
            if (head.row == prev.target.row && head.col == prev.target.col) {
              return true;
            }
          },
        };

        if (tests.wallCollision() || tests.selfCollision()) {
          clearInterval(interval);
          return {
            ...gameData,
            snake: generateSnake(),
            target: getRandomRowAndColumn(),
            score: 0,
            started: false,
            highScore: Math.max(score, highScore),
          };
        }
        if (tests.targetCollision()) {
          score = score + 1;
          newSnake.unshift({ ...target });
          target = getRandomRowAndColumn();
        }
        newSnake.push(newHead);
        newSnake.shift();
        return {
          ...prev,
          score: score,
          target: target,
          highScore: highScore,
          snake: newSnake,
        };
      });
    }
    if (gameData.started) {
      interval = setInterval(() => {
        moveSnake();
      }, gameData.speed);
    }
    return () => clearInterval(interval);
  }, [gameData]);
  return (
    <div className="xp-box snake-grid">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="grid-row">
          {row.map((cell, colIndex) => (
            <Cell
              key={"snake-grid-cell-" + colIndex}
              cell={cell}
              target={gameData.target}
              snake={gameData.snake}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function Cell({ target, snake, cell }) {
  const [emoji, setEmoji] = useState(null);
  function getRandomFruitEmoji() {
    const fruitKeys = Object.keys(emojis.fruit);
    const randomIndex = Math.floor(Math.random() * fruitKeys.length);
    const randomKey = fruitKeys[randomIndex];
    return emojis.fruit[randomKey];
  }
  const snakeSkin = ["🟥", "🟧", "🟨", "🟩", "🟦", "🟪"];
  const isSnake = snake.some(
    (snakeCell) => snakeCell.row === cell.row && snakeCell.col === cell.col
  );
  const isTarget = target.row === cell.row && target.col === cell.col;
  const isGround = !isSnake && !isTarget;
  useEffect(() => {
    if (isSnake) {
      const snakeIndex = snake.findIndex(
        (snakeCell) => snakeCell.row === cell.row && snakeCell.col === cell.col
      );
      setEmoji(snakeSkin[snakeIndex % snakeSkin.length]);
      return;
    } else if (isGround) {
      setEmoji(null);
    }
  }, [snake]);
  useEffect(() => {
    if (isTarget) {
      setEmoji(getRandomFruitEmoji());
    } else if (isGround) {
      setEmoji(null);
    }
  }, [target]);
  return (
    <div className="xp-box snake-grid-cell">
      <div className="snake-game-emoji">{emoji}</div>
    </div>
  );
}

export default Snake;
