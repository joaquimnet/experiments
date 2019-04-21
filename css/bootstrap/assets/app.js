const bg = Math.floor(Math.random() * 120);

document.querySelector(
  '.backgroundA'
).style.background = `url(assets/images/background/${bg}.jpg) center/cover`;

document.querySelector(
  '.backgroundB'
).style.background = `url(assets/images/background/${bg}.png) center/cover`;
