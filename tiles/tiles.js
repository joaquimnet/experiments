// Populate the dom
const container = document.querySelector(".container");
for (let y = 0; y < 20; y++) {
  for (let x = 0; x < 20; x++) {
    const div = document.createElement("div");
    div.className = "square";
    div.setAttribute("x", x.toString());
    div.setAttribute("y", y.toString());
    container.appendChild(div);
  }
}

HELP = {
  query: (x, y) => `[x="${x}"][y="${y}"]`,
  qS: q => document.querySelector(q),
  qSA: q => document.querySelectorAll(q)
};

/* Game Data */
const GAME = {
  mapSize: 20,
  player: { x: 0, y: 0 },
  item: { x: 0, y: 0 },
  POSITION: {
    randomX: () => Math.floor(Math.random() * GAME.mapSize),
    randomY: () => Math.floor(Math.random() * GAME.mapSize),
    randomXY: function() {
      return { x: this.randomX(), y: this.randomY() };
    },
    getDomElementAt: (x, y) => document.querySelector(HELP.query(x, y)),
    getPlayerElement: () => HELP.qS(HELP.query(GAME.player.x, GAME.player.y)),
    getItemElement: () => HELP.qS(HELP.query(GAME.item.x, GAME.item.y)),
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
  newPos.style.backgroundColor = "dodgerblue";
  newPos.style.zIndex = 100;

  // save new position
  GAME.player = { x: pX + x, y: pY + y };

  if (GAME.POSITION.isSame(GAME.player, GAME.item)) {
    GAME.item = { ...GAME.POSITION.randomXY() };
    GAME.POSITION.getItemElement().style.backgroundColor = "goldenrod";
  }
};

// Start game -------------------------------------------------
(() => {
  // save starter position
  GAME.player = { ...GAME.POSITION.randomXY() };

  // place player there
  const initial = GAME.POSITION.getPlayerElement();
  initial.style.backgroundColor = "dodgerblue";
  initial.style.zIndex = 100;

  GAME.item = { ...GAME.POSITION.randomXY() };
  GAME.POSITION.getItemElement().style.backgroundColor = "goldenrod";

  // input handler
  document.body.addEventListener("keydown", e => {
    const key = e.code;
    const x = GAME.player.x;
    const y = GAME.player.y;
    if ((key === "KeyW" || key === "ArrowUp") && y !== 0) movePlayer(0, -1);
    if ((key === "KeyD" || key === "ArrowRight") && x !== GAME.mapSize - 1)
      movePlayer(1, 0);
    if ((key === "KeyS" || key === "ArrowDown") && y !== GAME.mapSize - 1)
      movePlayer(0, 1);
    if ((key === "KeyA" || key === "ArrowLeft") && x !== 0) movePlayer(-1, 0);
  });
})();
