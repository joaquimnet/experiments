const hue = Math.floor(Math.random() * 255);
document.querySelector('body').style.backgroundColor = `hsl(${hue}, 50%, 60%)`;

for (let i = 1; i <= 10; i++) {
  const div = document.createElement('DIV');
  div.style.backgroundColor = `hsl(${hue},100%,${i * 10}%)`;
  div.style.position = 'fixed';
  div.style.height = '10vh';
  div.style.width = '10vh';
  div.style.top = `${(i - 1) * 10}vh`;
  div.style.boxShadow = '0 3px 3px white';
  document.querySelector('body').appendChild(div);
  setTimeout(
    () => setInterval(() => div.classList.toggle('move'), 3000),
    i * 500
  );
}
