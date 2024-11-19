let snake, food;
let size;
let grid;
let rez = 20;
let rate = (20 / rez) * 7;

function setup() {
  let w = floor(windowHeight / rez) * rez;
  let h = floor(windowHeight / rez) * rez;
  createCanvas(w, h);
  grid = createGraphics(width, height);
  size = floor(width / rez)
  snake = new Snake(size, size, size);
  getFood();
  createGrid();
  stroke(0);
}

function createGrid() {
  grid.background(0, 0, 0, 0);
  grid.strokeWeight(1);
  grid.stroke(255, 100);
  for (let i = 0; i < width; i += size) {
    grid.line(i, 0, i, height);
  }
  for (let j = 0; j < height; j += size) {
    grid.line(0, j, width, j);
  }
  grid.noLoop();
}

function draw() {
  if (frameCount % rate == 0) {
    let eat;
    background(128);
    image(grid, 0, 0);
    eat = snake.update(food);
    if (eat) {
      getFood();
    }
    fill(255, 0, 0);
    stroke(0);
    strokeWeight(1);
    rect(food.x, food.y, size, size, size / 2);
    snake.show();
    let a = check();
    if (a) {
      noLoop();
    }
  }
}

function getFood() {
  food = createVector(
    floor(random(width / size)) * size,
    floor(random(height / size)) * size
  );
  for (let point1 of snake.path) {
    if (point1.x == food.x || point1.y == food.y) {
      getFood();
    }
  }
}

function keyPressed() {
  if (keyCode == UP_ARROW) {
    snake.setDir(0, -1);
  } else if (keyCode == RIGHT_ARROW) {
    snake.setDir(1, 0);
  } else if (keyCode == DOWN_ARROW) {
    snake.setDir(0, 1);
  } else if (keyCode == LEFT_ARROW) {
    snake.setDir(-1, 0);
  }
}

function check() {
  let p = snake.path[snake.path.length - 1];
  if (p.x >= width || p.x < 0 || p.y >= height || p.y < 0) {
    return true;
  }
  if (snake.path.length <= 4) {
    return false;
  }
  for (let i = 0; i < snake.path.length; i++) {
    let point1 = snake.path[i];
    for (let j = 0; j < snake.path.length; j++) {
      let point12 = snake.path[j];
      if (i == j) {
        continue;
      }
      if (point1.x == point12.x && point1.y == point12.y) {
        return true;
      }
    }
  }
  return false;
}
