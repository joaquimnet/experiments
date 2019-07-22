// Template for entities
class Entity {
  constructor(x = 0, y = 0) {
    this.position = { x, y };
    this.isVisible = true;
  }
  getDomElement() {
    const element = document.querySelector(
      HELP.query(this.position.x, this.position.y)
    );
    if (element === null) {
      console.warn('Entity is out of bounds.');
      return;
    }
    return element;
  }
  onCollision() {
    if (this.isVisible === false) {
      return;
    }
  }
}

// The player class
class Player extends Entity {
  constructor(x, y) {
    super(x, y, 'dodgerblue');
  }
}

// The item class
class Item extends Entity {
  constructor(x, y, color) {
    super(x, y, color);
  }
  onCollision() {
    super.onCollision();
    console.log('B');
    this.position = {
      x: Math.floor(
        Math.random() *
          Math.floor(window.innerWidth / (window.innerHeight / 20))
      ),
      y: Math.floor(Math.random() * 20),
    };
  }
}

// Game map controller
class GameMap {
  constructor(player) {
    this.verticalSize = 20;
    this.horizontalSize = Math.floor(
      window.innerWidth / (window.innerHeight / 20)
    );
    this.player = player;
    this.Topo = new Map();
  }
  ParseTopo(json) {
    const entries = JSON.parse(json);
    entries.forEach(coordinate => {
      this.Topo.set(
        JSON.stringify({ x: coordinate.x, y: coordinate.y }),
        coordinate.type
      );
    });
  }
  randomX() {
    return Math.floor(Math.random() * this.horizontalSize);
  }
  randomY() {
    return Math.floor(Math.random() * this.verticalSize);
  }
  randomXY() {
    return { x: this.randomX(), y: this.randomY() };
  }
  getDomElementAt(x, y) {
    return document.querySelector(HELP.query(x, y));
  }
  getPlayerElement() {
    return HELP.qS(HELP.query(this.player.position.x, this.player.position.y));
  }
  isSamePosition(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y;
  }
  BuildGrid() {
    const container = document.querySelector('.container');
    for (let y = 0; y < 20; y++) {
      for (let x = 0; x < this.horizontalSize; x++) {
        const div = document.createElement('div');
        div.className = 'square';
        div.setAttribute('x', x.toString());
        div.setAttribute('y', y.toString());
        container.appendChild(div);
      }
    }
  }
}

// The renderer for displaying graphics on the map
class Renderer {
  constructor(map, player, items) {
    this.Map = map;
    this.Player = player;
    this.items = items;
  }

  // Render the player
  RenderPlayer() {
    HELP.qSA('.player').forEach(square => {
      square.classList.remove('player');
    });
    try {
      this.Player.getDomElement().classList.add('player');
    } catch (e) {
      console.log('Player is out of bounds of the map.');
    }
  }

  // Render all items
  RenderItems() {
    HELP.qSA('.item').forEach(square => {
      square.classList.remove('item');
    });
    this.items.forEach(item => {
      if (!item.isVisible) {
        return;
      }
      try {
        item.getDomElement().classList.add('item');
      } catch (e) {
        console.log('The item out of bounds of the map.');
      }
    });
  }

  // Renders map data
  RenderTopo() {
    HELP.qSA('.wall').forEach(square => {
      square.classList.remove('wall');
    });
    this.Map.Topo.forEach((type, coords) => {
      let coordinates = JSON.parse(coords);
      this.Map.getDomElementAt(coordinates.x, coordinates.y).classList.add(
        type
      );
    });
  }

  // Main render method
  Render() {
    this.RenderTopo();
    this.RenderPlayer();
    this.RenderItems();
  }
}

/* The Main Game Class */
class Game {
  constructor() {
    this.Player = new Player(0, 0);
    this.Map = new GameMap(this.Player);
    this.Items = [];
    this.Renderer = new Renderer(this.Map, this.Player, this.Items);

    // Initialize Game -------------------------------

    // Build grid for the first time
    this.Map.BuildGrid();

    // Initialize player
    this.Player.position = { ...this.Map.randomXY() };

    // spawn items
    for (let i = 0; i < 2; i++) {
      const color = HELP.randomColor();
      const pos = this.Map.randomXY();
      const newItem = new Item(pos.x, pos.y, color);
      if (i === 1) {
        newItem.onCollision = () => {
          console.log('C');
          newItem.isVisible = false;
        };
      }
      this.Items.push(newItem);
    }

    fetch('./maps/map0.json')
      .then(res => res.text())
      .then(res => {
        // Load map
        this.Map.ParseTopo(res);
        // First render
        this.Renderer.Render();
      });

    // Events
    document.body.addEventListener('keydown', e => this.onInput(e));
    window.addEventListener('resize', () => this.onResizeWindow());
  }

  onResizeWindow() {
    const container = document.querySelector('.container');
    let horizontalSize = Math.floor(
      window.innerWidth / (window.innerHeight / 20)
    );
    // checking if it has space for a new column
    if (this.Map.horizontalSize !== horizontalSize) {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      for (let y = 0; y < 20; y++) {
        for (let x = 0; x < horizontalSize; x++) {
          const div = document.createElement('div');
          div.className = 'square';
          div.setAttribute('x', x.toString());
          div.setAttribute('y', y.toString());
          container.appendChild(div);
        }
      }
      this.Map.horizontalSize = horizontalSize;
      this.Renderer.RenderPlayer();
      this.Renderer.RenderItems();
    }
  }

  MovePlayer(x, y) {
    // current player position
    const pX = this.Player.position.x;
    const pY = this.Player.position.y;

    // check for obstacles
    if (this.Map.Topo.has(JSON.stringify({ x: pX + x, y: pY + y }))) {
      return;
    }

    // save new position
    this.Player.position = { x: pX + x, y: pY + y };

    this.Items.forEach((item, index) => {
      if (this.Map.isSamePosition(this.Player.position, item.position)) {
        if (item.isVisible) {
          this.Items[index].onCollision();
        }
      }
    });

    this.Renderer.Render();
  }

  onInput(e) {
    const key = e.code;
    const x = this.Player.position.x;
    const y = this.Player.position.y;
    if ((key === 'KeyW' || key === 'ArrowUp') && y !== 0) {
      this.MovePlayer(0, -1);
    }
    if (
      (key === 'KeyD' || key === 'ArrowRight') &&
      x !== this.Map.horizontalSize - 1
    ) {
      this.MovePlayer(1, 0);
    }
    if (
      (key === 'KeyS' || key === 'ArrowDown') &&
      y !== this.Map.verticalSize - 1
    ) {
      this.MovePlayer(0, 1);
    }
    if ((key === 'KeyA' || key === 'ArrowLeft') && x !== 0) {
      this.MovePlayer(-1, 0);
    }
  }
}

// Start the game
const GAME = new Game();
