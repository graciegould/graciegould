import React, { useState, useEffect, useRef, useContext } from "react";
const GRID_ROW_AMOUNT = 20;
const GRID_COL_AMOUNT = 20;

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
      let dir = gameData.direction;
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

        function wallCollision() {
          if (
            head.row < 0 ||
            head.row >= GRID_ROW_AMOUNT ||
            head.col < 0 ||
            head.col >= GRID_COL_AMOUNT
          ) {
            return true;
          }
        }

        function selfCollision() {
          if (
            prev.snake.some(
              (cell) => cell.row === newHead.row && cell.col === newHead.col
            )
          ) {
            return true;
          }
        }

        function targetCollision() {
          if (head.row == prev.target.row && head.col == prev.target.col) {
            return true;
          }
        }

        if (wallCollision() || selfCollision()) {
          clearInterval(interval);
          let newSnake = [getRandomRowAndColumn()];
          return {
            ...gameData,
            snake: [getRandomRowAndColumn()],
            target: getRandomRowAndColumn(newSnake),
            score: 0,
            started: false,
            highScore: Math.max(score, highScore),
          };
        }
        if (targetCollision()) {
          score = score + 1;
          newSnake.unshift({ ...target });
          target = getRandomRowAndColumn(newSnake);
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
  const [fruit, setFruit] = useState(null);
  const [skinColor, setSkinColor] = useState(null);
  const snakeSkin = [
    // 10 shades of pastel pink to primary red as a gradient
    '#F8C8DC', '#F4A2BB', '#F07A9B', '#EB537B', '#E62C5A', '#E01542', '#D8102E', '#D00A1A', '#C60508', '#BD0000',

    // 10 shades of primary red to orange to pastel orange
    '#BD0000', '#C62A00', '#CF5500', '#D87F00', '#E2AA00', '#EBCE00', '#F3F100', '#F5D171', '#F8B282', '#FAB494',

    // 10 shades of pastel orange to primary yellow to pastel yellow
    '#FAB494', '#F9C18A', '#F9CE7F', '#F8DB75', '#F8E76A', '#F7F35F', '#F1EF53', '#EBEC48', '#E5E83C', '#DDE433',

    // 10 shades of pastel yellow to primary green to pastel green
    '#DDE433', '#D5DF29', '#CCE81F', '#C3D415', '#BACC0B', '#A3C400', '#8EBB00', '#7AB200', '#64A900', '#4FA100',

    // 10 shades of pastel green to primary blue to pastel blue
    '#4FA100', '#529CAD', '#5587BA', '#5A72C8', '#5F5DD6', '#6448E4', '#6A33F2', '#7330FF', '#7C4DFF', '#856AFF',

    // 10 shades of pastel blue to primary purple to pastel purple
    '#856AFF', '#8C7EFF', '#9382FF', '#9A86FF', '#A08AFF', '#A78EFF', '#AE91FF', '#B594FF', '#BC97FF', '#C39AFF',

    // 10 shades of pastel purple to primary pink to pastel pink
    '#C39AFF', '#C69ADD', '#CA96BB', '#CE928A', '#D18E69', '#D58A48', '#D98627', '#DC8410', '#E18100', '#E48000',
  ];

  const fruitIcons = [
    "banana",
    "coconut",
    "dragon-fruit",
    "kiwi",
    "peach",
    "pineapple",
    "strawberry",
    "watermelon",
  ];

  const getRandomFruit = () => {
    const randomIndex = Math.floor(Math.random() * fruitIcons.length);
    return fruitIcons[randomIndex]
  }

  const cellType = () => {
    let isSnake = snake.some(
      (snakeCell) => snakeCell.row === cell.row && snakeCell.col === cell.col
    );
    const isTarget = target.row === cell.row && target.col === cell.col;
    return isSnake ? "snake" : isTarget ? "target" : "ground";
  }
  useEffect(() => {
    const _cellType = cellType();
    console.log(_cellType);
    if (cellType() === "snake") {
      const snakeIndex = snake.findIndex(
        (snakeCell) => snakeCell.row === cell.row && snakeCell.col === cell.col
      );
      setSkinColor(snakeSkin[snakeIndex % snakeSkin.length]);
      return;
    }
    if (cellType() === "ground") {
      setSkinColor(null);
      setFruit(null);
      return;
    }
  }, [snake, target]);

  useEffect(() => {
    if (cellType() === "target" && !fruit) {
      setFruit(getRandomFruit());
      setSkinColor(snakeSkin[snake.length % snakeSkin.length]);
      return;
    } else {
      setFruit(null);
    }
  }, [target]);

  return (
    <div className="xp-box snake-grid-cell"
      style={{
        backgroundColor: skinColor ? skinColor : "black"
      }}
    >
      <div className="snake-game-fruit-icon">
        {fruit ? <img src={`images/snake-game/${fruit}.png`} /> : null}
      </div>
    </div>
  );
}

export default Snake;
