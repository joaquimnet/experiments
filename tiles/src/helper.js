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