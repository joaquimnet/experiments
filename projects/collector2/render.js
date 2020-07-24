import { constants } from './state.js';
import { state, dispatch } from './index.js';

export const $ = (q) => document.querySelector(q);
export const $a = (q) => document.querySelectorAll(q);

export function render(state) {
  $('.money').textContent = state.money.toMoney();
  $('.generator .level').textContent = state.generator || 0;
  $('.collector .level').textContent = state.collector || 0;

  ['generator', 'collector'].forEach((type) => {
    if (state[type] >= constants[`MAX_${type.toUpperCase()}_LEVEL`]) {
      $(`.${type} .progress`).style.width = '100%';
      $(`.${type} .upgrade`).innerHTML = 'Done ';
      $(`.${type} .upgrade`).classList.add('done');
    } else {
      $(`.${type} .progress`).style.width =
        (state[`${type}Upgrades`] && state[`${type}Upgrades`] % 10 === 0
          ? '10'
          : ('' + state[`${type}Upgrades`]).slice(-1)) + '0%';
      $(`.${type} .upgrade-cost`).textContent = state[`${type}UpgradeCost`].toMoney();
    }
  });

  $('.run-time').textContent = (''+state.runTime).toHHMMSS();
}

function generatorUpgradeBtn() {
  dispatch({ action: 'UPGRADE_GENERATOR' });
  if (state.generator === 20 && state.collector === 20) {
    dispatch({ action: 'GAME_END' });
  }
}

function collectorUpgradeBtn() {
  dispatch({ action: 'UPGRADE_COLLECTOR' });
  if (state.generator === 20 && state.collector === 20) {
    dispatch({ action: 'GAME_END' });
  }
}

$('.generator button').addEventListener('click', generatorUpgradeBtn);
$('.collector button').addEventListener('click', collectorUpgradeBtn);

$a('.screen').forEach((el) => {
  el.addEventListener('animationend', ({ target: screen }) => {
    if (screen.classList.contains('hide')) {
      screen.classList.add('display-none');
      screen.classList.remove('hide');
      $('.backdrop').classList.add('display-none');
    } else if (screen.classList.contains('reveal')) {
      screen.classList.remove('reveal');
      $('.backdrop').classList.remove('display-none');
    }
  });
});
$a('.screen').forEach((el) => {
  el.addEventListener('animationstart', ({ target: screen }) => {
    if (screen.classList.contains('reveal')) {
      screen.classList.remove('display-none');
      $('.backdrop').classList.remove('display-none');
    }
  });
});

$('.welcome .screen-button').addEventListener('click', () => {
  $('.welcome.screen').classList.add('hide');
  setTimeout(() => {
    dispatch({ action: 'GAME_START' });
  }, 500);
});

$('.game-end .screen-button').addEventListener('click', () => {
  $('.game-end.screen').classList.add('hide');
  setTimeout(() => {
    dispatch({ action: 'GAME_START' });
  }, 500);
});
