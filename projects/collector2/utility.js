export function randomColor() {
  const hex = () => Math.floor(Math.random() * 255).toString(16);
  return '#' + hex() + hex() + hex();
}

export function preventDefault(e) {
  e.preventDefault();
}

String.prototype.toHHMMSS = function () {
  let sec_num = parseInt(this, 10); // don't forget the second param
  let hours = Math.floor(sec_num / 3600);
  let minutes = Math.floor((sec_num - hours * 3600) / 60);
  let seconds = sec_num - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = '0' + hours;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  return hours + ':' + minutes + ':' + seconds;
};

Number.prototype.toMoney = function () {
  return ('$' + this).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};
