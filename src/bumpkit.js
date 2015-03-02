// Bumpkit instance

var Bumpkit = require('bumpkit');

try {
  var bumpkit = new Bumpkit();
} catch(e) {
  //console.log('static site render');
  var bumpkit = false;
}

module.exports = bumpkit;

