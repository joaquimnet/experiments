let pAction = 'bet';
let pScore = 0;
let disabled = false;

let cAction = 'bet';
let cScore = 0;

let chance = 0;
let lastChance = 0; // RESET THIS IF WON BY LIFE
let result;

let state = 'start'; // can be: start, won, lost, playing
let round = 0;

// Player action button events
function playerAction (button) {
  if (disabled) {
    return;
  }
  pAction = button;
  disableButtons(true);
}

// Calculate result
function calcResult () {
  // TODO: Make new way to calculate chance
  lastChance = chance;
  chance = (Math.random() * 100) + (lastChance / 10);
  return (Math.random() * 100) > chance ? true : false;
}

// Calculate computer action
function computerAction () {
  let decision = (Math.random() * 80) + (lastChance / 5);
  if (decision < 20) {
    return 'pass';
  }
  else if (decision > 80) {
    return 'life';
  }
  else {
    return 'bet';
  }
}

function disableButtons (disable) {
  let buttons = document.querySelectorAll('.btn');
  if (disable) {
    for (let i = 0;i < buttons.length; i++) {
      buttons[i].style.cursor = 'not-allowed';
      disabled = true;
    }
  } else {
    for (let i = 0;i < buttons.length; i++) {
      buttons[i].style.cursor = 'pointer';
      disabled = false;
    }
  }
}

function prepareForPlay () {
  // set state, disable buttons, reset scores
  state = 'playing';
  round = 0;
  pScore = 0;
  cScore = 0;
  document.querySelector('.player-score').innerHTML = pScore;
  document.querySelector('.computer-score').innerHTML = cScore;
  document.querySelector('.info-container').style.display = 'none';
  document.querySelector('.image img').src = './bomb.png';
  document.querySelector('.image').style.display = 'block';
}

function endGame () {
  disableButtons(false);
  if (pScore >= cScore) {
    state = 'won';
  } else {
    state = 'lost';
  }
  document.querySelector('.image').style.display = 'none';
  document.querySelector('.info-container').style.display = 'block';
  message();
}

function message () {
  const container = document.querySelector('.info-container');
  const infoHowToPlay = document.querySelector('.info-howToPlay');
  const infoWin = document.querySelector('.info-win');
  const infoLost = document.querySelector('.info-lost');
  const startButton = document.querySelector('.start');
  switch (state) {
    case 'playing':
      infoHowToPlay.style.display = 'none';
      infoWin.style.display = 'none';
      infoLost.style.display = 'none';
      startButton.style.display = 'none';
    break;
    case 'start':
      infoHowToPlay.style.display = 'block';
      infoWin.style.display = 'none';
      infoLost.style.display = 'none';
      startButton.innerHTML = 'START';
    break;
    case 'won':
      infoHowToPlay.style.display = 'none';
      infoWin.style.display = 'block';
      infoLost.style.display = 'none';
      startButton.innerHTML = 'PLAY AGAIN';
    break;
    case 'lost':
      infoHowToPlay.style.display = 'none';
      infoWin.style.display = 'none';
      infoLost.style.display = 'block';
      startButton.innerHTML = 'PLAY AGAIN';
    break;
    default:
      infoHowToPlay.style.display = 'block';
      infoWin.style.display = 'none';
      infoLost.style.display = 'none';
      startButton.innerHTML = 'START';
    break;
  }
}

function executeRound () {
  // start countdown
  disableButtons(false);
  result = calcResult();
  cAction = computerAction();

  if (result === true) {
    switch (pAction) {
      case 'bet':
        pScore += 50;
        break;
      case 'pass':
        pScore -= 25;
        break;
      case 'life':
        if (pScore < 0) {
          pScore = 0;
          break;
        }
        pScore *= 2;
        break;
      default:
        pScore += 50;
        break;
    }
    switch (cAction) {
      case 'bet':
        cScore += 50;
        break;
      case 'pass':
        cScore -= 25;
        break;
      case 'life':
        if (cScore < 0) {
          cScore = 0;
          break;
        }
        cScore *= 2;
        break;
      default:
        cScore += 50;
        break;
    }
  } else {
    switch (pAction) {
      case 'bet':
        pScore -= 50;
        break;
      case 'pass':
        pScore += 25;
        break;
      case 'life':
        pScore = 0;
        break;
      default:
        pScore -= 50;
        break;
    }
    switch (cAction) {
      case 'bet':
        cScore -= 50;
        break;
      case 'pass':
        cScore += 25;
        break;
      case 'life':
        cScore = 0;
        break;
      default:
        cScore -= 50;
        break;
    }
  }
}

// Execute game
function startGame () {
  // set state to playing and reset score
  prepareForPlay();

  // Execute round calculations
  const heck = () => {
    setTimeout (() => {
      executeRound();
      round++;

      // display results to the screen
      document.querySelector('.player-score').innerHTML = pScore;
      document.querySelector('.computer-score').innerHTML = cScore;
      if (result === true) {
        document.querySelector('.image img').src = './safe.png';
        alert('SAFE!');
      } else {
        document.querySelector('.image img').src = './boom.png';
        alert('BOOM!');
      }
      disableButtons(false);
      pAction = '';
      cAction = '';
      document.querySelector('.image img').src = './bomb.png';

      if (round === 5) {
        // end round
        endGame();
        return;
      }
      heck();
    }, 3000);}
  heck();
}
