export const query = (x, y) => `[x="${x}"][y="${y}"]`;

export const $ = q => document.querySelector(q);
export const $A = q => document.querySelectorAll(q);

export const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1));

export const randomColor = () => {
  const rndHex = () =>
    randomNumber(0, 255)
      .toString(16)
      .padStart(2, '0');
  return '#' + rndHex() + rndHex() + rndHex();
};
