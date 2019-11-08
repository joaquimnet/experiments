const n = (min = 0, max = 10) => Math.floor(Math.random() * (max - min + 1)) + min;
const $ = q => document.querySelector(q);
const $A = q => document.querySelectorAll(q);
const $c = q => document.createElement(q);

setInterval(() => {
  $('.square:first-of-type').classList.toggle('move-first');
  $('.square:nth-of-type(2)').classList.toggle('move-last');
}, n(3000, 5000));

const addSquareEvents = square => {
  square.addEventListener('click', event => {
    console.log(
      'Element:',
      event.target,
      'Animation:',
      event.target.style.animation,
      'Color:',
      event.target.style.backgroundColor,
    );
  });

  square.addEventListener('dblclick', event => {
    event.stopPropagation();
    event.target.parentNode.removeChild(event.target);
  });
};

const createSquare = () => {
  const square = $c('div');
  square.style.backgroundColor = `rgb(${n(1, 255)},${n(1, 255)},${n(1, 255)})`;
  square.style.animation = `rotate${n() > 5 ? 'B' : ''} ${n(
    800,
    5000,
  )}ms cubic-bezier(${Math.random()},${Math.random()},${Math.random()},${Math.random()}) infinite`;
  square.style.width = '10vh';
  square.style.height = '10vh';
  square.style.position = 'fixed';
  square.style.top = `${n(0, 90)}vh`;
  square.style.left = `${n(0, 90)}vw`;
  square.style.boxShadow = '0 0 3px 3px white';
  addSquareEvents(square);
  return square;
};

$('body').addEventListener('dblclick', event => {
  const square = createSquare();
  square.style.top = 'calc(' + event.clientY + 'px - 5vh)';
  square.style.left = 'calc(' + event.clientX + 'px - 5vw)';
  $('body').appendChild(square);
});

for (let i = 0; i < n(20, 80); i++) {
  const square = createSquare();
  $('body').appendChild(square);
}
