const genCon = document.querySelector('.field__container');
let active = false;
let clicked = false;
let seconds = 0;

// Gameplay values
let fortune = 0;
let generatorLevel = 1; // Scale value with these 2
let collectorLevel = 0;
let generatorCost = 5;
let collectorCost = 5;

const upgradeGenerator = () => {
  if (fortune >= generatorCost && generatorLevel < 50) {
    // upgrade
    fortune -= generatorCost;
    generatorLevel += 1;
    // after
    generatorCost = Math.floor(generatorCost * (1.5 + ((generatorLevel)/100)));
  }
  updateDisplay();
  if (generatorLevel >= 50 && collectorLevel >= 50) {
    endGame();
  }
}

const upgradeCollector = () => {
  if (fortune >= collectorCost && collectorLevel < 50) {
    // upgrade
    fortune -= collectorCost;
    collectorLevel += 1;
    // after
    collectorCost = Math.floor(collectorCost * 1.5);
  }
  updateDisplay();
  if (generatorLevel >= 50 && collectorLevel >= 50) {
    endGame();
  }
}

const updateDisplay = () => {
  document.querySelector('.fortune').innerHTML = '$'+(fortune).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  document.querySelector('.generator__level').innerHTML = generatorLevel;
  document.querySelector('.collector__level').innerHTML = collectorLevel;
  if (generatorLevel > 49) {
    document.querySelector('.generator__upgrading').style.display = 'none';
    document.querySelector('.generator__completed').style.display = 'block';
  } else {
    document.querySelector('.generator__cost').innerHTML = (generatorCost).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }
  if (collectorLevel > 49) {
    document.querySelector('.collector__upgrading').style.display = 'none';
    document.querySelector('.collector__completed').style.display = 'block';
  } else {
    document.querySelector('.collector__cost').innerHTML = (collectorCost).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }
}

const collect = (event) => {
  fortune += 2*(Number(event.target.alt));
  event.target.classList = '';
  event.target.classList.add('animated');
  event.target.classList.add('bounceOutUp');
  event.target.classList.add('faster');
  setTimeout(()=>genCon.removeChild(event.target), 200);
  updateDisplay();
}

const startGame = () => {
  if (active) {
    return;
  }
  fortune = 0;
  generatorLevel = 1; // Scale value with these 2
  collectorLevel = 0;
  generatorCost = 5;
  collectorCost = 5;
  active = true;
  document.querySelector('.message__end').style.display = 'none';
  document.querySelector('.message__start').style.display = 'none';
  updateDisplay();
  spawnCoins(false);
  seconds = 0;
  count();
}

const count = () => {
  if (!active) {
    return;
  }
  setTimeout(() => {
    seconds++;
    count();
  }, 1000)
}

const spawnCoins = (loop) => {
  if (!active) {
    return;
  }
  let newCircle = document.createElement('IMG');
  let size = 3 + Math.floor(Math.random() * 15);
  let left = 3 + Math.floor(Math.random() * 97);
  let top = 3 + Math.floor(Math.random() * 97);
  let hueShift = Math.floor(Math.random()*(360*(generatorLevel/100)));

  // Size and Position
  newCircle.style.width = size + "%";
  newCircle.style.left = (left+size) <= 90 ? left + "%" : (left-size) + "%";
  newCircle.style.top = (top+size) <= 90 ? top + "%" : (top-(size + 5)) + "%";
  // Color
  newCircle.style.filter = `hue-rotate(${hueShift}deg)`
  // Coin Value
  let value = Math.floor((Math.random() * 100 * hueShift)/size);
  newCircle.alt = value;

  // Base values
  newCircle.src = "coin.png";
  newCircle.draggable = false;
  newCircle.style.position = "absolute";
  newCircle.addEventListener('click', collect);
  newCircle.addEventListener('drag', collect);
  newCircle.classList.add('animated');
  newCircle.classList.add('bounceIn');
  newCircle.classList.add('fast');
  // Diamond
  if (generatorLevel >= 20) {
    if (Math.floor(Math.random()*100 + (generatorLevel-20)) > 65) {
      newCircle.src = "diamond.png";
      value = value * generatorLevel * ((hueShift^6) + (hueShift * generatorLevel^6));
      newCircle.alt = value;
      if (generatorLevel >= 30 && Math.floor(Math.random()*100 + (generatorLevel-30)) > 50) {
        newCircle.src = "gum.png";
        value = value*1.5 + (generatorCost/10);
        newCircle.alt = value;
      }
      if (generatorLevel >= 40 && Math.floor(Math.random()*100) > 90) {
        newCircle.src = "star.png";
        value = Math.floor(generatorCost/3);
        newCircle.alt = value;
      }
    }
  }

  genCon.appendChild(newCircle);

  // Garbage Collection
  setTimeout(()=>{
        newCircle.classList = '';
        newCircle.classList.add('animated');
        newCircle.classList.add('fadeOut');
        newCircle.classList.add('faster');
        setTimeout(()=>genCon.removeChild(newCircle), 200);
      },10000);
  // Auto Collection
  setTimeout(() => {
    if (collectorLevel > 0) {
      if (active) {
        fortune += Number(newCircle.alt);
      }
      newCircle.classList = '';
      newCircle.classList.add('animated');
      newCircle.classList.add('bounceOut');
      newCircle.classList.add('faster');
      setTimeout(()=>genCon.removeChild(newCircle), 200);
      updateDisplay();
    }
  }, 1+(5000 * (1-(collectorLevel/100))));


  // Recursion
  setTimeout(() => {spawnCoins(true)}, 1 + (500 * (1-(generatorLevel/100))));
}

const endGame = () => {
  active = false;
  document.querySelector('.time').innerHTML = (''+seconds).toHHMMSS();
  document.querySelector('.message__end').style.display = 'block';
}

String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours + ':' + minutes + ':' + seconds;
}

updateDisplay();
document.querySelector('.generator__upgrade__btn').addEventListener('click', upgradeGenerator);
document.querySelector('.collector__upgrade__btn').addEventListener('click', upgradeCollector);
genCon.addEventListener('click', () => {clicked=true;startGame()});
document.querySelector('.message__end').addEventListener('click', () => {clicked=true;startGame()});
