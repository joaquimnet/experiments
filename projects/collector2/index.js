import { randomColor, preventDefault } from './utility.js';
import { constants, createState, reducer } from './state.js';
import { $, render } from './render.js';

export const [state, dispatch] = createState(render, reducer);
window.dispatch = dispatch;

function Cube() {
  const CUBE = document.createElement('IMG');
  const CUBE_CONTAINER = document.createElement('DIV');
  CUBE.src = './assets/base-cube.svg';
  CUBE.draggable = false;
  CUBE.className = 'cube';
  CUBE_CONTAINER.appendChild(CUBE);
  CUBE_CONTAINER.className = 'cube-container spawning';

  CUBE_CONTAINER.addEventListener('dragstart', preventDefault);
  CUBE_CONTAINER.addEventListener('mouseup', cubeClicked);
  CUBE_CONTAINER.addEventListener('animationend', cubeAnimationEnded);

  const size = state.createCubeSize();
  const hue = state.createCubeHue();
  CUBE.style.width = constants.CUBE_WIDTHS[size] + '%';
  CUBE.style.filter = `drop-shadow(0 3px 3px ${randomColor()}) hue-rotate(${hue}deg)`;
  CUBE_CONTAINER.dataset.size = size + 1;
  CUBE_CONTAINER.dataset.hue = hue;

  dispatch({
    action: 'CUBE_CREATED',
  });

  return CUBE_CONTAINER;
}

function cubeClicked({ target: cubeContainer }) {
  if (cubeContainer.classList.contains('cube')) {
    cubeContainer = cubeContainer.parentNode;
  }
  if (cubeContainer.classList.contains('clicked') || cubeContainer.classList.contains('spawning')) {
    return;
  }
  setTimeout(() => {
    const size = cubeContainer.dataset.size;
    cubeContainer.classList.add('clicked');
    cubeContainer.style.zIndex = 20;
    dispatch({
      action: 'MONEY_ADD',
      payload: state.createCubeReward(size),
    });
  }, constants.TRANSITION_TIME);
}

function cubeAnimationEnded({ target: cubeContainer }) {
  if (cubeContainer.classList.contains('spawning')) {
    cubeContainer.classList.remove('spawning');
    return;
  }
  cubeContainer.remove();
  dispatch({ action: 'CUBE_COLLECTED' });
}

function generateCube() {
  if (!state.playing || state.cubeCount >= constants.MAX_CUBE_COUNT) {
    return;
  }
  document.querySelector('.board').appendChild(Cube());
}

function collectCube() {
  if (!state.playing || state.cubeCount <= 0 || !state.collector) {
    return;
  }

  for (let size = 1; size <= state.maxCollectableSize; size++) {
    const cubeContainer = $(`div[data-size="${size}"]:not(.clicked)`);

    if (
      !cubeContainer ||
      cubeContainer.classList.contains('clicked') ||
      cubeContainer.classList.contains('spawning')
    ) {
      continue;
    }
    setTimeout(() => {
      const size = cubeContainer.dataset.size;
      cubeContainer.classList.add('clicked');
      cubeContainer.style.zIndex = 20;
      dispatch({
        action: 'MONEY_ADD',
        payload: state.createCubeReward(size),
      });
    }, constants.TRANSITION_TIME);
  }
}

variableInterval([
  {
    cb: generateCube,
    getIntervalTime: () => state.generatorTick,
  },
  {
    cb: collectCube,
    getIntervalTime: () => state.collectorTick,
  },
]);

function variableInterval(intervals) {
  if (!Array.isArray(intervals)) {
    throw new TypeError('Bruh. The variableInterval only accepts arrays.');
  }
  intervals.forEach(({ cb, getIntervalTime }) => {
    let intervalId = setInterval(interval, getIntervalTime());
    function interval() {
      cb();
      clearInterval(intervalId);
      intervalId = setInterval(interval, getIntervalTime());
    }
  });
}

// This triggers the initial render
dispatch({ action: 'LOAD_IN' });
