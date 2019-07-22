for (let x=0;x<25;x++) {
  for (let y=0;y<25;y++) {
    const div = document.createElement('div');
    div.style.width = '4vw';
    div.style.height = '4vh';
    div.style.position = 'absolute';
    div.style.left = x * 4 + 'vw';
    div.style.top = y * 4 + 'vh';
    div.style.backgroundColor = 'black';
    document.querySelector('body').appendChild(div);
  }
}
const body = document.querySelector('body');
const hide = (event) => {
  // event.target.style.display = 'none'
  body.removeChild(event.target);
  if (document.querySelectorAll('div').length < 350) {
    reveal();
  }
};
const reveal = () => {
  remainder = document.querySelectorAll('div');
  if (remainder === null) {
    return;
  }
  setTimeout(()=>{body.removeChild(remainder[Math.floor(Math.random()*remainder.length)]); reveal();},50);
}
divs = document.querySelectorAll('div');
divs.forEach(item => item.addEventListener('mouseover', hide));
divs.forEach(item => item.addEventListener('drag', hide));
