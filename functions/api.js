// dependency injected using CommonJS
const implementation = require('./firebase-api');
const logging = require('./logging');

// abstraction
module.exports = logging(implementation);