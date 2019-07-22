/** Examples of String methods
 *  https://beta.developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
 */

const l = s => console.log(s);

// https://beta.developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#Description
const foo = 'Extremely unstable! ✋'; // -> 'Extremely unstable!'

// https://beta.developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt
l(foo.charAt(0)); // -> 'E'

// https://beta.developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt
l(foo.charCodeAt(0)); // -> 69

// https://beta.developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt
l(foo.codePointAt(foo.length - 1)); // -> 9995

// https://beta.developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/concat
l(foo.concat(' Amazing!')); // -> Extremely unstable! ✋ Amazing!

// https://beta.developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
l(foo.includes('mel')); // -> true

// https://beta.developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
l(foo.endsWith('mel')); // -> false
l(foo.endsWith('✋')); // -> true

// https://beta.developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf
l(foo.indexOf('x')); // -> 1

// https://beta.developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/lastIndexOf
l(foo.lastIndexOf('e')); // -> 17

// https://beta.developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
l(foo.localeCompare('oh')); // -> -1
l(foo.localeCompare('ah')); // -> 1

// https://beta.developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match
l(foo.match(/e/gi)); // -> [ 'E', 'e', 'e', 'e' ]

// https://beta.developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll
// l(foo.matchAll(/e/g));

// https://beta.developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
l(foo.normalize()); // -> Extremely unstable! ✋

// https://beta.developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd
l(foo.padEnd(foo.length + 10, '!')); // -> Extremely unstable! ✋!!!!!!!!!!

// https://beta.developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
l(foo.padStart(foo.length + 10, '>')); // -> >>>>>>>>>>Extremely unstable! ✋

// https://beta.developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat
l(foo.repeat(3)); // -> Extremely unstable! ✋Extremely unstable! ✋Extremely unstable! ✋

// https://beta.developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
l(foo.replace('r', 'w')); // -> Extwemely unstable! ✋
l(foo.replace(/(r|x)/g, m => (m === 'r' ? 'w' : 'xxx'))); // -> Exxxtwemely unstable! ✋


