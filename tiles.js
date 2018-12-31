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

/* Game Data */
const gameData = {
  position: {}
};

/**
 * Move the player x and y squares
 * @param {Int} x X offset
 * @param {Int} y Y offset
 */
const renderPlayer = (x, y) => {
  // current player position
  pX = gameData.position.x;
  pY = gameData.position.y;

  // get current and next squares
  const oldPos = document.querySelector(`[x="${pX}"][y="${pY}"]`);
  const newPos = document.querySelector(`[x="${pX + x}"][y="${pY + y}"]`);

  // update the dom
  oldPos.removeAttribute("style");
  newPos.style.backgroundColor = "dodgerblue";
  newPos.style.zIndex = 100;

  // save new position
  gameData.position = { x: pX + x, y: pY + y };
};

// Start game
(() => {
  // random start position
  const pos = {
    x: Math.floor(Math.random() * 20),
    y: Math.floor(Math.random() * 20)
  };

  // place player there
  const init = document.querySelector(`[x="${pos.x}"][y="${pos.y}"]`);
  init.style.backgroundColor = "dodgerblue";
  init.style.zIndex = 100;

  // save starter position
  gameData.position = { ...pos };

  // input handler
  document.body.addEventListener("keydown", e => {
    switch (e.code) {
      case "ArrowUp":
        if (gameData.position.y === 0) break;
        renderPlayer(0, -1);
        break;
      case "ArrowRight":
        if (gameData.position.x === 19) break;
        renderPlayer(1, 0);
        break;
      case "ArrowDown":
        if (gameData.position.y === 19) break;
        renderPlayer(0, 1);
        break;
      case "ArrowLeft":
        if (gameData.position.x === 0) break;
        renderPlayer(-1, 0);
        break;
    }
  });
})();
