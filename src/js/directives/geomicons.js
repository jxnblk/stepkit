
var Geomicons = require('geomicons-open');

module.exports = function() {
  return {
    scope: true,
    link: function(scope, element, attributes) {
      Geomicons.inject(element[0]);
    }
  }
};
