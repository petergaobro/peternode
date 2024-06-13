// node runs on a server - not in a browser (backend not fronted)
// the console is the terminal window
console.log('peter and jason');
// global object instead of window object
// console.log(global);
// has common core modules that we will explore
// commonjs modules instead of es6 modules
// missing some js apis like fetch

const os = require('os');
const path = require('path')
const { add } = require('./math')

console.log(add(2, 3));

// console.log(os.type());
// console.log(os.version());
// console.log(os.homedir());

// console.log(__dirname);
// console.log(__filename);

// console.log(path.dirname(__filename));
// console.log(path.basename(__filename));
// console.log(path.extname(__filename));

// console.log(path.parse(__filename));