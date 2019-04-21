class Game {
  constructor() {
    this.genCon = HELP.qS(".field__container");
    this.active = false;
    this.clicked = false;
    this.seconds = 0;

    // Gameplay values
    this.fortune = 0;
    this.generatorLevel = 1; // Scale value with these 2
    this.collectorLevel = 0;
    this.generatorCost = 5;
    this.collectorCost = 5;

    // Start game
    this.updateDisplay();
    HELP.qS(".generator__upgrade__btn").addEventListener(
      "click",
      (e) => this.upgradeGenerator(e)
    );
    HELP.qS(".collector__upgrade__btn").addEventListener(
      "click",
      (e) => this.upgradeCollector(e)
    );
    this.genCon.addEventListener("click", () => {
      this.clicked = true;
      this.startGame();
    });
    HELP.qS(".message__end").addEventListener("click", () => {
      this.clicked = true;
      this.startGame();
    });
  }

  updateDisplay() {
    let fortune = this.fortune;
    let generatorLevel = this.generatorLevel;
    let collectorLevel = this.collectorLevel;
    let generatorCost = this.generatorCost;
    let collectorCost = this.collectorCost;
    HELP.qS(".fortune").innerHTML = fortune.toFixed(2).toMoney();
    HELP.qS(".generator__level").innerHTML = generatorLevel;
    HELP.qS(".collector__level").innerHTML = collectorLevel;
    if (generatorLevel > 49) {
      HELP.qS(".generator__upgrading").style.display = "none";
      HELP.qS(".generator__completed").style.display = "block";
    } else {
      HELP.qS(".generator__cost").innerHTML = generatorCost
        .toFixed(2)
        .toMoney();
    }
    if (collectorLevel > 49) {
      HELP.qS(".collector__upgrading").style.display = "none";
      HELP.qS(".collector__completed").style.display = "block";
    } else {
      HELP.qS(".collector__cost").innerHTML = collectorCost
        .toFixed(2)
        .toMoney();
    }
  }

  upgradeGenerator() {
    let fortune = this.fortune;
    let generatorLevel = this.generatorLevel;
    let collectorLevel = this.collectorLevel;
    let generatorCost = this.generatorCost;
    if (fortune >= generatorCost && generatorLevel < 50) {
      // upgrade
      this.fortune -= generatorCost;
      this.generatorLevel += 1;
      // after
      this.generatorCost = Math.floor(
        generatorCost * (1.5 + generatorLevel / 100)
      );
    }
    this.updateDisplay();
    if (this.generatorLevel >= 50 && this.collectorLevel >= 50) {
      this.endGame();
    }
  }

  upgradeCollector() {
    let fortune = this.fortune;
    let generatorLevel = this.generatorLevel;
    let collectorLevel = this.collectorLevel;
    let collectorCost = this.collectorCost;
    if (fortune >= collectorCost && collectorLevel < 50) {
      // upgrade
      this.fortune -= collectorCost;
      this.collectorLevel += 1;
      // after
      this.collectorCost = Math.floor(collectorCost * 1.5);
    }
    this.updateDisplay();
    if (this.generatorLevel >= 50 && this.collectorLevel >= 50) {
      this.endGame();
    }
  }

  collect(event) {
    let genCon = this.genCon;
    this.fortune += 2 * Number(event.target.alt);
    event.target.classList = "";
    event.target.classList.add("animated");
    event.target.classList.add("bounceOutUp");
    event.target.classList.add("faster");
    setTimeout(() => {
      genCon.removeChild(event.target);
    }, 200);
    this.updateDisplay();
  }

  startGame() {
    if (this.active) {
      return;
    }
    this.fortune = 0;
    this.generatorLevel = 1; // Scale value with these 2
    this.collectorLevel = 0;
    this.generatorCost = 5;
    this.collectorCost = 5;
    this.active = true;
    HELP.qS(".message__end").style.display = "none";
    HELP.qS(".message__start").style.display = "none";
    this.updateDisplay();
    this.spawnCoins();
    this.seconds = 0;
    setInterval(() => {
      if (!this.active) {
        return;
      }
      this.seconds++;
    }, 1000);
  }

  endGame() {
    this.active = false;
    HELP.qS(".time").innerHTML = `${this.seconds}`.toHHMMSS();
    HELP.qS(".message__end").style.display = "block";
  }

  spawnCoins() {
    if (!this.active) {
      return;
    }

    const genCon = this.genCon;

    let newCircle = document.createElement("IMG");
    let size = 3 + Math.floor(Math.random() * 15);
    let left = 3 + Math.floor(Math.random() * 97);
    let top = 3 + Math.floor(Math.random() * 97);
    let hueShift = Math.floor(
      Math.random() * (360 * (this.generatorLevel / 100))
    );

    // Size and Position
    newCircle.style.width = size + "%";
    newCircle.style.left = left + size <= 90 ? left + "%" : left - size + "%";
    newCircle.style.top = top + size <= 90 ? top + "%" : top - (size + 5) + "%";
    // Color
    newCircle.style.filter = `hue-rotate(${hueShift}deg)`;
    // Coin Value
    let value = Math.floor((Math.random() * 100 * hueShift) / size);
    newCircle.alt = value;

    // Base values
    newCircle.src = "coin.png";
    newCircle.draggable = false;
    newCircle.style.position = "absolute";
    newCircle.addEventListener("click", (e) => this.collect(e));
    newCircle.addEventListener("drag", (e) => this.collect(e));
    newCircle.classList.add("animated");
    newCircle.classList.add("bounceIn");
    newCircle.classList.add("fast");

    // Diamond
    if (this.generatorLevel >= 20) {
      if (Math.floor(Math.random() * 100 + (this.generatorLevel - 20)) > 65) {
        newCircle.src = "diamond.png";
        value =
          value *
          this.generatorLevel *
          ((hueShift ^ 6) + ((hueShift * this.generatorLevel) ^ 6));
        newCircle.alt = value;
        if (
          this.generatorLevel >= 30 &&
          Math.floor(Math.random() * 100 + (this.generatorLevel - 30)) > 50
        ) {
          newCircle.src = "gum.png";
          value = value * 1.5 + this.generatorCost / 10;
          newCircle.alt = value;
        }
        if (this.generatorLevel >= 40 && Math.floor(Math.random() * 100) > 90) {
          newCircle.src = "star.png";
          value = Math.floor(this.generatorCost / 3);
          newCircle.alt = value;
        }
      }
    }

    genCon.appendChild(newCircle);

    // Garbage Collection
    setTimeout(() => {
      newCircle.classList = "";
      newCircle.classList.add("animated");
      newCircle.classList.add("fadeOut");
      newCircle.classList.add("faster");
      setTimeout(() => {
        try {
          genCon.removeChild(newCircle);
        } catch (e) {
          //
        }
      }, 200);
    }, 10000);

    // Auto Collection
    setTimeout(() => {
      if (this.collectorLevel > 0) {
        if (this.active) {
          this.fortune += Number(newCircle.alt);
        }
        newCircle.classList = "";
        newCircle.classList.add("animated");
        newCircle.classList.add("bounceOut");
        newCircle.classList.add("faster");
        setTimeout(() => {
          try {
            genCon.removeChild(newCircle);
          } catch (e) {
            //
          }
        }, 200);
        this.updateDisplay();
      }
    }, 1 + 5000 * (1 - this.collectorLevel / 100));

    // Recursion
    setTimeout(() => {
      this.spawnCoins();
    }, 1 + 500 * (1 - this.generatorLevel / 100));
  }
}

const game = new Game();