import { $ } from './render.js';

const initialState = {
  playing: false,
  money: 0,
  generatorUpgrades: 0,
  collectorUpgrades: 0,
  cubeCount: 0,
  startTime: 0,
  createCubeSize() {
    return Math.min(Math.floor(Math.random() * (Math.floor(this.generator / 5) + 1)), 2);
  },

  createCubeHue() {
    return Math.round(Math.random() * 360);
  },

  createCubeReward(size) {
    return Math.floor(100 * (size * 2) + Math.random() * size * 50);
  },
  computed: {
    generator() {
      return Math.ceil(this.generatorUpgrades / 10);
    },
    collector() {
      return Math.ceil(this.collectorUpgrades / 10);
    },
    generatorUpgradeCost() {
      return Math.floor(Math.max(100, this.generator * 1.2 * 100));
    },
    collectorUpgradeCost() {
      return Math.floor(Math.max(100, this.collector * 1.2 * (this.collector / 2) * 100));
    },
    maxCollectableSize() {
      return Math.min(Math.floor(this.collector / 5) + 1, 3);
    },
    generatorTick() {
      return 1000 - Math.min(950, this.generator * 50);
    },
    collectorTick() {
      return 1000 - Math.min(850, this.collector * 50);
    },
    runTime() {
      return Math.floor((Date.now() - this.startTime) / 1000);
    }
  },
};

export const constants = {
  MAX_GENERATOR_LEVEL: 20,
  MAX_COLLECTOR_LEVEL: 20,
  MAX_CUBE_COUNT: 70,
  CUBE_WIDTHS: [20, 35, 100],
  TRANSITION_TIME: 50,
};

export function reducer(state, action, payload) {
  switch (action) {
    case 'LOAD_IN':
      // TODO: localStorage logic goes here
      break;
    case 'GAME_START':
      state.playing = true;
      state.startTime = Date.now();
      break;
    case 'GAME_END':
      state.playing = false;
      $('.game-end.screen').classList.remove('display-none');
      $('.game-end.screen').classList.add('reveal');
      break;
    case 'MONEY_ADD':
      if (!state.playing) break;
      state.money += payload;
      break;
    case 'MONEY_REMOVE':
      if (!state.playing) break;
      state.money -= Math.abs(payload);
      break;
    case 'UPGRADE_GENERATOR':
      if (
        !state.playing ||
        state.money < state.generatorUpgradeCost ||
        state.generator >= constants.MAX_GENERATOR_LEVEL
      ) {
        break;
      }
      state.money -= Math.floor(state.generatorUpgradeCost);
      state.generatorUpgrades += 1;
      break;
    case 'UPGRADE_COLLECTOR':
      if (
        !state.playing ||
        state.money < state.collectorUpgradeCost ||
        state.collector >= constants.MAX_COLLECTOR_LEVEL
      ) {
        break;
      }
      state.money -= Math.floor(state.collectorUpgradeCost);
      state.collectorUpgrades += 1;
      break;
    // Not checking state.playing on these two because that might affect rendering
    case 'CUBE_CREATED':
      state.cubeCount += 1;
      break;
    case 'CUBE_COLLECTED':
      state.cubeCount -= 1;
      break;
  }
  return state;
}

export function createState(render, reducer) {
  const state = _createStateObject(initialState);
  return [
    state,
    function dispatch({ action, payload = null }) {
      render(reducer(state, action, payload));
    },
  ];
}

// TODO: Add support for nested objects
function _createStateObject(input) {
  if (!input || typeof input !== 'object') {
    return {};
  }

  const output = Object.create(null);

  for (let [key, value] of Object.entries(input)) {
    if (key !== 'computed') {
      Object.defineProperty(output, key, {
        value,
        writable: true,
      });
      continue;
    }
    for (let [key, value] of Object.entries(input.computed)) {
      Object.defineProperty(output, key, {
        get: value,
      });
    }
  }

  return output;
}
