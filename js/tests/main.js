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

const mapi = new Map();

mapi.set(JSON.stringify({x: 1, y: 2}), "wall");
mapi.set(JSON.stringify({x: 1, y: 3}), "maa");

//mapi.forEach(i => console.log(i));

//console.log(mapi.entries());

console.log(JSON.parse('[{"x": 1}, {"x": 2}]'));
