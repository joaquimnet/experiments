/* DOM */
const leaf = document.querySelector('img[src*="leaf"]');
const bg = document.querySelector('body').style;

/* Randomize view */
switch (Math.floor(Math.random() * 4)) {
  case 1:
    leaf.src = 'leaf-1.svg';
    bg.backgroundImage =
      'linear-gradient(to right, #e4afcb 0%, #b8cbb8 0%, #b8cbb8 0%, #e2c58b 30%, #c2ce9c 64%, #7edbdc 100%)';
    break;
  case 2:
    leaf.src = 'leaf-2.svg';
    bg.backgroundImage =
      'linear-gradient(to top, #4fb576 0%, #44c489 30%, #28a9ae 46%, #28a2b7 59%, #4c7788 71%, #6c4f63 86%, #432c39 100%)';
    break;
  case 3:
    leaf.src = 'leaf-3.svg';
    bg.backgroundImage = 'linear-gradient(to top, #0ba360 0%, #3cba92 100%)';
    break;
  case 4:
    leaf.src = 'leaf-4.svg';
    leaf.style.filter = 'hue-rotate(40deg)';
    bg.backgroundImage = 'linear-gradient(to top, #b224ef 0%, #7579ff 100%)';
    break;
  default:
    leaf.src = 'leaf-1.svg';
    bg.backgroundImage =
      'linear-gradient(to right, #e4afcb 0%, #b8cbb8 0%, #b8cbb8 0%, #e2c58b 30%, #c2ce9c 64%, #7edbdc 100%)';
    break;
}

/* Rotate the leaf */
let deg = 0;
setInterval(() => {
  leaf.style.transform = `rotateY(${deg}deg)`;
  deg++;
}, 1000 / 30);
