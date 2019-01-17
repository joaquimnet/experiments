/* Game Data */
const GAME = {
  map: {
    verticalSize: 20,
    horizontalSize: Math.floor(window.innerWidth / (window.innerHeight / 20))
  },
  player: { x: 0, y: 0, color: "dodgerblue" },
  items: [],
  POSITION: {
    randomX: () => Math.floor(Math.random() * GAME.map.horizontalSize),
    randomY: () => Math.floor(Math.random() * GAME.map.verticalSize),
    randomXY: function() {
      return { x: this.randomX(), y: this.randomY() };
    },
    getDomElementAt: (x, y) => document.querySelector(HELP.query(x, y)),
    getPlayerElement: () => HELP.qS(HELP.query(GAME.player.x, GAME.player.y)),
    isSame: (pos1, pos2) => pos1.x === pos2.x && pos1.y === pos2.y
  }
};

/**
 * Move the player x and y squares
 * @param {Int} x X offset
 * @param {Int} y Y offset
 */
const movePlayer = (x, y) => {
  // current player position
  pX = GAME.player.x;
  pY = GAME.player.y;

  // get current and next squares
  const oldPos = GAME.POSITION.getDomElementAt(pX, pY);
  const newPos = GAME.POSITION.getDomElementAt(pX + x, pY + y);

  // update the dom
  oldPos.removeAttribute("style");
  newPos.style.backgroundColor = GAME.player.color;
  newPos.style.zIndex = 100;

  // save new position
  GAME.player = { ...GAME.player, x: pX + x, y: pY + y };

  GAME.items.forEach((item, index) => {
    if (GAME.POSITION.isSame(GAME.player, item)) {
      GAME.items[index] = { ...item, ...GAME.POSITION.randomXY() };
      GAME.items[index].getDomElement().style.backgroundColor = item.color;
    }
  });
};

// Start game -------------------------------------------------
(() => {
  // Populate the dom
  const container = document.querySelector(".container");

  for (let y = 0; y < 20; y++) {
    for (let x = 0; x < GAME.map.horizontalSize; x++) {
      const div = document.createElement("div");
      div.className = "square";
      div.setAttribute("x", x.toString());
      div.setAttribute("y", y.toString());
      container.appendChild(div);
    }
  }

  // Initialize player
  GAME.player = { ...GAME.POSITION.randomXY(), color: "dodgerblue" };

  // place player
  const initial = GAME.POSITION.getPlayerElement();
  initial.style.backgroundColor = GAME.player.color;
  initial.style.zIndex = 100;

  for (let i = 0; i < 2; i++) {
    const color = HELP.randomColor();
    const pos = GAME.POSITION.randomXY();
    GAME.items.push({
      ...pos,
      color,
      getDomElement: function() {
        return GAME.POSITION.getDomElementAt(this.x, this.y);
      }
    });
    GAME.POSITION.getDomElementAt(pos.x, pos.y).style.backgroundColor = color;
  }

  // input handler
  document.body.addEventListener("keydown", e => {
    const key = e.code;
    const x = GAME.player.x;
    const y = GAME.player.y;
    if ((key === "KeyW" || key === "ArrowUp") && y !== 0) movePlayer(0, -1);
    if (
      (key === "KeyD" || key === "ArrowRight") &&
      x !== GAME.map.horizontalSize - 1
    )
      movePlayer(1, 0);
    if (
      (key === "KeyS" || key === "ArrowDown") &&
      y !== GAME.map.verticalSize - 1
    )
      movePlayer(0, 1);
    if ((key === "KeyA" || key === "ArrowLeft") && x !== 0) movePlayer(-1, 0);
  });

  // window resize handler
  window.onresize = () => {
    horizontalSize = Math.floor(window.innerWidth / (window.innerHeight / 20));
    if (GAME.map.horizontalSize === horizontalSize) {
      console.log("same");
      return;
    } else {
      console.log("diff");
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      for (let y = 0; y < 20; y++) {
        for (let x = 0; x < horizontalSize; x++) {
          const div = document.createElement("div");
          div.className = "square";
          div.setAttribute("x", x.toString());
          div.setAttribute("y", y.toString());
          container.appendChild(div);
        }
      }
      GAME.map.horizontalSize = horizontalSize;
    }
  };
})();
