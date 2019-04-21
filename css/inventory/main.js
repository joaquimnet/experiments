//import Chance from '../../scripts/lib/chance.min.js';
const chance = new Chance(new Date());

class _p {
  static sel(query) {
    return document.querySelector(query);
  }
  static selAll(query) {
    return document.querySelector(query);
  }
  static create(e) {
    return document.createElement(e);
  }
  static node(t) {
    return document.createTextNode(t);
  }
  static eleText(e, t) {
    const ele = document.createElement(e);
    const node = document.createTextNode(t);
    ele.appendChild(node);
    return ele;
  }
}

class Item {
  constructor(name, type, value, rarity) {
    this.name = name;
    this.type = type;
    this.value = value;
    this.rarity = rarity;
  }
}

const inventory = [];
const bank = [];
let gold = 5000;

/* Populate Menu */
_p.sel(".menu ul").appendChild(_p.eleText("LI", "Bank"));
// _p.sel(".menu ul").appendChild(_p.eleText("LI", "Shop"));

const render = () => {
  _p.sel(".inventory ul").innerHTML = '';
  inventory.forEach((item, i) => {
    const element = _p.eleText("LI", (i+1) + ". " + item.name);
    element.addEventListener('click', (e) => moveToBank(e));
    _p.sel(".inventory ul").appendChild(element);
  });
  _p.sel(".bank ul").innerHTML = '';
  bank.forEach((item, i) => {
    const element = _p.eleText("LI", (i+1) + ". " + item.name);
    element.addEventListener('click', (e) => moveToInventory(e));
    _p.sel(".bank ul").appendChild(element);
  });
}

const moveToBank = (e) => {
  const itemIndex = Number(e.target.innerHTML.charAt(0))-1;
  const movingItem = inventory[itemIndex];
  bank.push(movingItem);
  inventory.splice(itemIndex, 1);
  render();
}

const moveToInventory = (e) => {
  const itemIndex = Number(e.target.innerHTML.charAt(0))-1;
  const movingItem = bank[itemIndex];
  inventory.push(movingItem);
  bank.splice(itemIndex, 1);
  render();
}

/* Populate Inventory */
for(let i=0;i<chance.integer({min:10,max:25});i++) {
  let name = chance.word({length: 6});
  name = name.charAt(0).toUpperCase() + name.split('').splice(1).join('');
  const type = chance.pickone(['Sword', 'Shield', 'Armor', 'Spear', 'Bow', 'Staff', 'Axe', 'Greatsword', 'Dagger', 'Robe']);
  const value = chance.integer({min: 20, max: 2000});
  const rarity = chance.weighted(['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Unique'], [1000,800,500,100,10,1]);
  inventory.push(new Item(name, type, value, rarity));
}

render();