/**
 *  Regex Experiments
 *  use RegEx.test(str) to get a boolean
 *  use String.match(RegEx) to extrach matches
 */

const l = s => console.log(s);

// The sample string
const str =
  'Pack my box with five dozen liquor jugs.\n' +
  'Amazingly few discotheques provide jukeboxes.\n' +
  'The quick onyx goblin jumps over the lazy dwarf.\n' +
  'The quick brown fox jumps over the lazy dog.\n' +
  'January 28 is the day she was born.\n' +
  `I don\'t have any dogs! Said the man.\n` +
  `The ox shall\'t cross the field!`;

// Flag i: ignore casing
l(/fox/.test(str)); // -> true
l(/Fox/.test(str)); // -> false
l(/Fox/i.test(str)); // -> true

// Find a match and safely log it
l(str.match(/quick/)[0]); // -> 'quick'
// Remember to safely log it since it can return null
// str.match(/quick/) ? l(str.match(/quick/)[0]) : null; // -> quick

// Flag g: global (Find multiple matches)
l(str.match(/quick/g)); // -> ['quick', 'quick]

// In regex a period is a wildcard character
l(str.match(/.ox/gi)); // -> ['box', 'box', 'fox', 'ox']

// Backets: match the characters between the brackets
l(str.match(/[bf]ox/gi)); // -> ['box', 'box', 'fox']

// a-z: match all letters
// l(str.match(/[a-z]/gi)); // -> ['P', 'a', 'c', 'k'.............]

// 0-9: match numbers
l(str.match(/[0-9]/g)); // -> ['2', '8']

// Negation: ^ (the bellow regex excludes all letters, whitespace with \s and periods)
l(str.match(/[^a-z\s.]/gi)); // -> ['2', '8']

// Match characters that occur one or more times
l(str.match(/y+/gi)); // -> [ 'y', 'y', 'y', 'y', 'y', 'y', 'y' ]

// Match characters that occur zero or more times
l(str.match(/dogs*/gi)); // -> ['dog', 'dogs']

// Lazy vs Greedy matches
l('<h1>Hello world!</h1>'.match(/<.*>/g)); // -> ["<h1>Hello world!</h1>"]
l('<h1>Hello world!</h1>'.match(/<.*?>/g)); // -> ["<h1>", "</h1>"]
l('<h1>Hello world!</h1>'.match(/<.*?>/)[0]); // -> "<h1>"

// Alphanumerics \w matches letters, numbers and underscore
l(str.match(/\w/g).length); // -> 199

// NOT Alphanumerics \W matches everything that is not a letter, number or underscore
l(str.match(/\W/g).length); // -> 54

// Digits
l(str.match(/\d/g)); // -> ['2', '8'];

// NOT Digits
l(str.match(/\D/g).length); // -> 251

// Number of possible matches {min,max} or {exact}
l(/\d{2,}/.test(str)); // -> true (min of 2 digits)
l(/\d{3,}/.test(str)); // -> false (min of 3 digits)
l(/\d{1,2}/.test(str)); // -> true (min of 1 and max of 2 digits)
l(/\s+\d{1,1}\s+/.test(str)); // -> false (min of 1 and max of 1 digits, must be surrounded by whitespace)
l(/\s+\d{2,}\s+/.test(str)); // -> true (min of 1 digits, must be surrounded by whitespace)

// Optional character
l(str.match(/.?ox/gi)); // -> [ 'box', 'box', 'fox', ' ox' ]
l(/favou?rite/.test('favorite')); // -> true
l(/favou?rite/.test('favourite')); // -> true

// Example: removing whitespace from begging and end, like trim()
l('    Hello world!     '.replace(/^\s+|\s+$/g, '') + '<< result');

/**
 * g: global
 * i: case insensitive
 * *: zero or more
 * +: one or more
 * .: anything
 * ?: lazy match, smallest possible
 * ?: optional character
 * (?=): look ahead
 * (?!): look ahead with negation
 * ^: match at the beggining of a string
 * [^]: inside a character set, negation
 * ^: match at the end of a string
 * {}: restrict number of matches
 */
