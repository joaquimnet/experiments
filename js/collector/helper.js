HELP = {
  query: (x, y) => `[x="${x}"][y="${y}"]`,
  qS: q => document.querySelector(q),
  qSA: q => document.querySelectorAll(q),
  randomColor: () => {
    const values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];
    let color = ["#"];
    for (let i = 0; i < 6; i++) {
      color.push(values[Math.floor(Math.random() * values.length)]);
    }
    return color.join("");
  }
};

String.prototype.toHHMMSS = function () {
  let sec_num = parseInt(this, 10); // don't forget the second param
  let hours   = Math.floor(sec_num / 3600);
  let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  let seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  return hours + ':' + minutes + ':' + seconds;
}

String.prototype.toMoney = function () {
  return '$'+ this.replace(/\d(?=(\d{3})+\.)/g, '$&,');
}