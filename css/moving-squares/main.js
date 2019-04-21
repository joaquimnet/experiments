import {_p} from '../../scripts/pon-dom.js';

const hue = _p.randomInt(0,255);
_p.sel('body').style.backgroundColor = `hsl(${hue}, 50%, 60%)`;

for (let i = 1; i <= 10; i++) {
  const div = _p.create('DIV');
  div.style.backgroundColor = `hsl(${hue},100%,${i*10}%)`
  div.style.position = 'fixed';
  div.style.height = '10vh';
  div.style.width = '10vh';
  div.style.top = `${(i-1) * 10}vh`;
  div.style.boxShadow = '0 3px 3px white';
  _p.sel('body').appendChild(div);
  setTimeout(() => setInterval(() => div.classList.toggle('move'), 3000), i*500);
}