let bigArray = [];

for (let i = 0; i < 10000000; i++) {
  bigArray.push(i);
}

const start = Date.now();

bigArray.unshift(-1);

// let another = [-1];
// for (let num of bigArray) {
//   another.push(num);
// }

// bigArray = [-1, ...bigArray];


console.log(Date.now() - start);