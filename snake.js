class Snake {
  constructor(x, y, size) {
    this.pos = createVector(x, y);
    this.size = size;
    this.path = [];
    this.path.push(createVector(this.pos.x, this.pos.y));
    this.dir = createVector(1, 0);
    this.score = 0;
    this.temp = createVector(1, 0);
  }
  
  setDir(x, y) {
    if (abs(this.dir.x - x) == 2 || abs(this.dir.y - y) == 2) {
      return;
    }
    this.temp.x = x;
    this.temp.y = y;
  }
  
  update(food) {
    this.dir.x = this.temp.x;
    this.dir.y = this.temp.y;
    let rem = true;
    // FLOOR TO AVOID JS ACCURACY ERROR, I.E. 2.00000001
    if (floor(food.x) == floor(this.pos.x) && floor(food.y) == floor(this.pos.y)) {
      rem = false;
      this.score = this.score + 1;
    }
    this.pos.x = this.pos.x + (this.dir.x * this.size);
    this.pos.y = this.pos.y + (this.dir.y * this.size);
    this.path.push(createVector(this.pos.x, this.pos.y));
    if (rem) {
      this.path.shift();
      return false;
    } else {
      return true;
    }
  }
  
  show() {
    for (let point of this.path) {
      stroke(0);
      strokeWeight(1);
      fill(0, 0, 255);
      rect(point.x, point.y, this.size, this.size, this.size / 4);
      if (this.path[this.path.length - 1] == point) {
        fill(255, 100);
        noStroke();
        ellipse(
          point.x + (this.size / 2), point.y + (this.size / 2),
          this.size / 2, this.size / 2
        );
      }
    }
  }
}
