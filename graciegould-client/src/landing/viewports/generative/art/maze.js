const Maze = () => {
    const canvasElement = p5.canvas;
    let lastDirection = { dx: 0, dy: 0 };
    let draw = false;
    let mazeGrid = [];
    let currentCell = { x: 0, y: 0 };
    const cellSize = 5;
    const positions = [];
    const stack = [];
    let p5 = null;
    const start = () => {
      const cols = Math.floor(canvasElement.width / cellSize);
      const rows = Math.floor(canvasElement.height / cellSize);
      mazeGrid = Array(cols).fill().map(() => Array(rows).fill(false));
      currentCell = { x: 0, y: 0 };
      draw = true;
      animateArt();
    };

    const stop = () => {
        window.cancelAnimationFrame(animateArt);
        draw = false;
        mazeGrid = [];
        currentCell = { x: 0, y: 0 };
        lastDirection = { dx: 0, dy: 0 };
        positions.length = 0;
        stack.length = 0;
        p5.clear();
        p5.draw = null;
        p5.noLoop();
    }
  
    const restart = () => {
        const context = canvasElement.getContext('2d');
        context.clearRect(0, 0, canvasElement.width, canvasElement.height);
        start();
    }
    const drawLine = (from, to, color = 'black') => {
      const context = canvasElement.getContext('2d');
      mazeGrid[to.x][to.y] = true;
      const x = from.x * cellSize + cellSize / 2;
      const y = from.y * cellSize + cellSize / 2;
      const dx = to.x * cellSize + cellSize / 2;
      const dy = to.y * cellSize + cellSize / 2;
      positions.push({ x, y, dx, dy });
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(dx, dy);
      context.strokeStyle = color;
      context.stroke();
    };
  
    const shuffleArray = (array, lastDirection) => {
      array.sort((a, b) => {
        if (a.dx === lastDirection.dx && a.dy === lastDirection.dy) {
          return -1;
        } else if (b.dx === lastDirection.dx && b.dy === lastDirection.dy) {
          return 1;
        } else {
          return 0;
        }
      });
  
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };
  
    const getUnvisitedNeighbor = (cell) => {
      const { x, y } = cell;
      let neighbors = [];
      if (x > 0 && !mazeGrid[x - 1][y]) neighbors.push({ x: x - 1, y });
      if (y > 0 && !mazeGrid[x][y - 1]) neighbors.push({ x, y: y - 1 });
      if (x < Math.floor(canvasElement.width / cellSize) - 1 && !mazeGrid[x + 1][y])
        neighbors.push({ x: x + 1, y });
      if (y < Math.floor(canvasElement.height / cellSize) - 1 && !mazeGrid[x][y + 1])
        neighbors.push({ x, y: y + 1 });
      return shuffleArray(neighbors, lastDirection)[0] || null;
    };
  
    const animateArt = () => {
      const nextCell = getUnvisitedNeighbor(currentCell);
      if (nextCell) {
        drawLine(currentCell, nextCell);
        mazeGrid[currentCell.x][currentCell.y] = true;
        stack.push(currentCell);
        lastDirection = { dx: nextCell.x - currentCell.x, dy: nextCell.y - currentCell.y };
        currentCell = nextCell;
      } else if (stack.length > 0) {
        currentCell = stack.pop();
      }
      if (currentCell.x === 0 && currentCell.y === 0) {
        draw = false;
      }
      if (stack.length > 0 || getUnvisitedNeighbor(currentCell)) {
        window.requestAnimationFrame(animateArt);
      } else {
        restart();
      }
    };

    return {
        start,
        stop
    }
  };

  export default Maze;