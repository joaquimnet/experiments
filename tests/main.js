class Hello {
  constructor () {
    this.world = new World();
    this.x = "Heck";
  }
}

class World {
  constructor () {
    this.y = "Mark";
  }
  explode () {
    console.log(this.y, "says boom!");
  }
}

const hello = new Hello();
hello.world.explode();