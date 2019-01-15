import { _p } from "../../scripts/pon-dom.js";

setInterval(() => {
  _p.sel(".square:first-of-type").classList.toggle("move-first");
  _p.sel(".square:nth-of-type(2)").classList.toggle("move-last");
}, 4000);

for (let i = 0; i < _p.randomInt(20, 80); i++) {
  const div = _p.create('div');
  div.style.backgroundColor = _p.color();
  div.style.animation = `rotate ${_p.randomInt(800,5000)}ms cubic-bezier(${Math.random()},${Math.random()},${Math.random()},${Math.random()}) infinite`;
  div.style.width = '10vh';
  div.style.height = '10vh';
  div.style.position = 'fixed';
  div.style.top = `${_p.randomInt(0,90)}vh`;
  div.style.left = `${_p.randomInt(0,90)}vw`;
  div.style.zIndex = '-1';
  div.style.boxShadow = "0 0 3px 3px white"
  _p.sel('body').appendChild(div);
}