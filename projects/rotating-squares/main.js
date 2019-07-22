function randomInt(min, max) {
  return min + Math.floor(Math.random() * max);
}

setInterval(() => {
  document
    .querySelector('.square:first-of-type')
    .classList.toggle('move-first');
  document
    .querySelector('.square:nth-of-type(2)')
    .classList.toggle('move-last');
}, 4000);

for (let i = 0; i < randomInt(20, 80); i++) {
  const div = document.createElement('div');
  div.style.backgroundColor = `rgb(${randomInt(1, 255)},${randomInt(
    1,
    255
  )},${randomInt(1, 255)})`;
  div.style.animation = `rotate ${randomInt(
    800,
    5000
  )}ms cubic-bezier(${Math.random()},${Math.random()},${Math.random()},${Math.random()}) infinite`;
  div.style.width = '10vh';
  div.style.height = '10vh';
  div.style.position = 'fixed';
  div.style.top = `${randomInt(0, 90)}vh`;
  div.style.left = `${randomInt(0, 90)}vw`;
  div.style.zIndex = '-1';
  div.style.boxShadow = '0 0 3px 3px white';
  document.querySelector('body').appendChild(div);
}
